import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/dbconnection";
import User, { IMessage } from "@/models/userModel";

export async function POST(request: NextRequest) {
  await connectDB();

  const { username, content } = await request.json();

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    if(!user.isAcceptingMessages)
    return NextResponse.json(
      {
        success: false,
        messages: 'User is not accepting messages',
      },
      { status: 403 }
    );
    
    const newMessages = {content, createdAt: new Date()}
    user.messages.push(newMessages as IMessage)
    await user.save()
    
    return NextResponse.json(
      {
        success: true,
        messages: 'Message sent successfully',
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.log("Internal server error", error);

    return NextResponse.json(
      {
        success: false,
        messages: "Internal server error",
      },
      { status: 200 }
    );
  }
}
