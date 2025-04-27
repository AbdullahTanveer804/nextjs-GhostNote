import { connectDB } from "@/lib/db/dbconnection";
import User from "@/models/userModel";
import { usernameValidation } from "@/Schemas/signUpSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UsernameQuerySchema = z.object({ username: usernameValidation });

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const querySchema = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse(querySchema);
    console.log(result); //Remove
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }
    const {username} = result.data
    const existingVerifiedUser = await User.findOne({
        username, 
        isVerified: true
    })
    if(existingVerifiedUser){
        return NextResponse.json(
            { success: false, message: "Username is already taken" },
            { status: 400 }
          )
    }
    return NextResponse.json(
        { success: true, message: "Username is unique" },
        { status: 200 }
      )
  } catch (error) {
    console.log("Error checking username", error);
    return NextResponse.json(
      { success: false, message: "Error checking username" },
      { status: 500 }
    );
  }
}
