import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { connectDB } from "@/lib/db/dbconnection";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody
    console.log('New Sign up data: ', reqBody)

    const existingUserVerifiedByUsername = await User.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return NextResponse.json(
        {
          success: false,
          message: "Username already exist",
        },
        {
          status: 400,
        }
      );
    }

    const existingUserByEmail = await User.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "Email already exists",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);

        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
      console.log('Newly saved user: ', newUser )
    }

    //Send Verification Email
    const emailResponse = await sendVerificationEmail(email, verifyCode);
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    console.log('Verification email sended successfully');
    
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully, please verify your email",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error registering user", error);
    return NextResponse.json(
      {
        message: "Error registering user",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
