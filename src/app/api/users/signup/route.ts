import { connect_to_db } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect_to_db();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password, username } = reqBody;

    // chech if all details are provided
    if (!email || !password || !username) {
      return NextResponse.json({
        success: false,
        message: "please provide all details",
      });
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      savedUser: savedUser,
    });
  } catch (e: any) {
    // check if user already exits
    if (e.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "user already exits",
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: e.message,
      },
      {
        status: 500,
      }
    );
  }
}
