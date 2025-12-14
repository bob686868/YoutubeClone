"use client";
import React from "react";

import Link from "next/link";

import { useActionState } from "react";
import { signUp } from "./signupActions";

// import Create from "../components/Create";
// import LoginForm from "./LoginForm";
export const runtime = "nodejs";
const page = () => {

  const [state, formAction,isPending] = useActionState(signUp, { error: null });
  const buttonClasses= isPending ? 'bg-neutral-500 text-neutral-200' : 'bg-neutral-100 hover:bg-neutral-200 cursor-pointer text-black'
  return (
    <div className="bg-neutral-950">
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
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
              className={`${buttonClasses} w-full   font-medium py-2 rounded-md  transition`}
              disabled={isPending}
            >
              {!isPending ? 'Sign up' : "Signing up..."}
            </button>
          </form>
          {/* ERROR MESSAGE */}
          {state.error && (
            <p className="mt-2 text-red-400 text-sm text-center">
              Credentials taken
            </p>
          )}

          <p className="text-center text-sm text-gray-500 mt-2">
            <span className="">Already have an account? </span>
            <Link
              href="/login"
              className="text-neutral-300 hover:text-neutral-100"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
