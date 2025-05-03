import { connectDB } from "@/lib/db/dbconnection";
import { getServerSession, User as authUser } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  await connectDB();

  const session = await getServerSession(authOptions);
  const user: authUser = session?.user;

  if (!session || !user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }
  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update user status to accept messages",
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to update user status to accept messages");
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user status to accept messages",
      },
      { status: 500 }
    );
  }
}



export async function GET(request: NextRequest) {
  await connectDB();

  const session = await getServerSession(authOptions);
  const user: authUser = session?.user;

  if (!session || !user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const foundUser = await User.findById(userId);

  try {
    if (!foundUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in getting message acceptance message");

    return NextResponse.json(
      {
        success: false,
        message: "Error in getting message acceptance message",
      },
      { status: 500 }
    );
  }
}
