"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";
import { toast } from "react-hot-toast";

const inputStypeClasses =
  "p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-5 w-[30vw]";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  // login function
  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      console.log("Login successfully", res.data);
      if (res.data.success === true) {
        router.push(`/profile/${res.data.user}`);
      }
    } catch (error: any) {
      toast.error(error.message);
      return NextResponse.json({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center">
      <div>
        <h1 className=" text-center mb-3 text-[30px]">Log in</h1>
        <div className="input-div">
          <input
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            className={inputStypeClasses}
            type="text"
            id="email"
            placeholder="email"
            name="email"
          />
        </div>
        <div className="input-div">
          <input
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            className={inputStypeClasses}
            type="text"
            id="password"
            placeholder="password"
            name="password"
          />
        </div>
      </div>
      <button
        onClick={onLogin}
        className=" items-center bg-indigo-600 w-[100px] h-[45px] rounded-md"
      >
        {loading ? "Loading..." : "Log in"}
      </button>
      <div>
        not a user? <button className=" text-indigo-400"> Sign up</button>
      </div>
    </div>
  );
}
