import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession, User as authUser } from "next-auth";
import { connectDB } from "@/lib/db/dbconnection";
import mongoose from "mongoose";
import User from "@/models/userModel";

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
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await User.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);
    if (!user || user.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        messages: user[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error getting messages", error);

    return NextResponse.json(
      {
        success: true,
        messages: "Error getting messages",
      },
      { status: 200 }
    );
  }
}
