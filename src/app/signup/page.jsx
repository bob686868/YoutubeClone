"use client";
import React from "react";

import Link from "next/link";

import { useActionState } from "react";
import { signUp } from "./signupActions";

// import Create from "../components/Create";
// import LoginForm from "./LoginForm";
const page = () => {
  const [state, formAction] = useActionState(signUp, { error: null });
  return (
    <div className="bg-neutral-900">


    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="bg-neutral-800 text-neutral-100 w-full max-w-md p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign up</h1>


        <form action={formAction} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:border-0 focus:ring-neutral-200"
              required
              />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:border-0 focus:ring-neutral-200"
              required
              />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:border-0 focus:ring-neutral-200"
              required
              />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-neutral-100 text-black cursor-pointer font-medium py-2 rounded-md hover:bg-neutral-200 transition"
            >
            Sign up
          </button>
        </form>
            {/* ERROR MESSAGE */}
            {state.error && (
              <p className="mt-2 text-red-400 text-sm text-center">
                Credentials taken
              </p>
            )}

        <p className="text-center text-sm text-gray-500 mt-2">
          <span className="">Don't have an account? </span>
          <Link href="/login" className="text-neutral-300 hover:text-neutral-100">
            Login
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default page;
