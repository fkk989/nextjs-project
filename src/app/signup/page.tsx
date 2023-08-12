"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const inputStypeClasses =
  "p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-5 w-[30vw]";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  // signup function
  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log("Signup successfully", res.data);
      if (res.data.success === true) {
        router.push("/login");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center">
      <div>
        <h1 className=" text-center mb-3 text-[30px]">Sign up</h1>
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
        <div className="input-div">
          <input
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            className={inputStypeClasses}
            type="text"
            id="username"
            placeholder="username"
            name="username"
          />
        </div>
      </div>
      <button
        onClick={onSignup}
        className=" items-center bg-indigo-600 w-[100px] h-[45px] rounded-md"
      >
        {loading ? "Loading..." : "sign up"}
      </button>
      <div>
        already a user? <button className=" text-indigo-400"> Log in</button>
      </div>
    </div>
  );
}
