import { connect_to_db } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect_to_db();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // ALL FIELDS ARE REQUIRED
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "all fields are required",
        },
        {
          status: 400,
        }
      );
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "user does not exist",
        },
        {
          status: 400,
        }
      );
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "invalid password",
        },
        {
          status: 400,
        }
      );
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const res = NextResponse.json(
      {
        success: true,
        message: "logged in",
        token: token,
        user: user.username,
      },
      { status: 200 }
    );
    res.cookies.set("token", token, {
      httpOnly: true,
    });
    return res;
    //
    //
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
