import { toast } from "@/hooks/use-toast";
import { connectDB } from "@/lib/db/dbconnection";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text " },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDB();
        try {
          const user = await User.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.email },
            ],
          });
          if (!user) {
            throw new Error("User not found with this email");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your email first");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Password is incorrect");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}){
        if(user){
            token._id = user._id?.toString()
            token.isVerified = user.isVerified
            token.isAcceptingMessages = user.isAcceptingMessages
            token.username = user.username
        }
        return token
    },
    async session({session, token}){
        if(token){
            session.user._id = token._id
            session.user.isVerified = token.isVerified
            session.user.isAcceptingMessages = token.isAcceptingMessages
            session.user.username = token.username
        }
        return session
    }
  },
  pages: {
    signIn: '/log-in'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXT_AUTH_SECRET
};
