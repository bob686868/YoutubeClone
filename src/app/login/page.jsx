"use client";
import React from "react";

import Link from "next/link";

import { useActionState } from "react";
import { login } from "./loginActions";

// import Create from "../components/Create";
// import LoginForm from "./LoginForm";
const page = () => {
  const [state, formAction,isPending] = useActionState(login, { error: null });
  const buttonClasses= isPending ? 'bg-neutral-500 text-neutral-200' : 'bg-neutral-100 hover:bg-neutral-200 cursor-pointer text-black'

  return (
    <div className="bg-neutral-950">
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="bg-neutral-800 text-neutral-100 w-full max-w-md p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

          <form action={formAction} className="space-y-4">
            

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

            >
              {!isPending ? "Log In" : "Logging in..."}
            </button>
          </form>
          {/* ERROR MESSAGE */}
          {state.error && (
            <p className="mt-2 text-red-400 text-sm text-center">
              wrong credentials
            </p>
          )}

          <p className="text-center text-sm text-gray-500 mt-2">
            <span className="">Don't have an account? </span>
            <Link
              href="/signup"
              className="text-neutral-300 hover:text-neutral-100"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
