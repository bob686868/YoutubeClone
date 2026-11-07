"use client";
import React from "react";
import Link from "next/link";

const AuthForm = ({ type, state, formAction, isPending }) => {
  const isLogin = type === "login";

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4 sm:p-6 text-[#f1f1f1]">
      {/* Main Container */}
      <div className="bg-[#181818] border border-white/10 w-full max-w-[440px] md:max-w-4xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        {/* LEFT SIDE: YouTube Brand Canvas (Desktop only) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#800000] via-[#3a0808] to-[#120404] p-10 flex-col justify-between relative overflow-hidden">
          {/* Subtle glow circle */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={36}
                height={36}
              >
                <path
                  d="M23.498 6.186a2.997 2.997 0 0 0-2.116-2.118C19.673 3.5 12 3.5 12 3.5s-7.674 0-9.382.568A2.997 2.997 0 0 0 .502 6.186C0 7.894 0 12 0 12s0 4.106.502 5.814a2.997 2.997 0 0 0 2.116 2.118C4.327 20.5 12 20.5 12 20.5s7.674 0 9.382-.568a2.997 2.997 0 0 0 2.116-2.118C24 16.106 24 12 24 12s0-4.106-.502-5.814z"
                  fill="#FF0000"
                />
                <path d="M9.75 15.02V8.98l6.5 3.02-6.5 3.02z" fill="#FFFFFF" />
              </svg>
              <span className="text-2xl font-bold tracking-tighter text-white">
                YouTube
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
              Watch what you love. <br />
              Share what you make.
            </h2>
            <p className="text-neutral-300 mt-4 text-sm leading-relaxed">
              Explore trending videos, subscribe to your favorite creators, and join a global community.
            </p>
          </div>

          <div className="relative z-10 text-neutral-400 text-xs">
            © 2026 YouTube Clone LLC
          </div>
        </div>

        {/* RIGHT SIDE: Authentication Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center bg-[#181818]">
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center justify-center gap-2 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={32}
              height={32}
            >
              <path
                d="M23.498 6.186a2.997 2.997 0 0 0-2.116-2.118C19.673 3.5 12 3.5 12 3.5s-7.674 0-9.382.568A2.997 2.997 0 0 0 .502 6.186C0 7.894 0 12 0 12s0 4.106.502 5.814a2.997 2.997 0 0 0 2.116 2.118C4.327 20.5 12 20.5 12 20.5s7.674 0 9.382-.568a2.997 2.997 0 0 0 2.116-2.118C24 16.106 24 12 24 12s0-4.106-.502-5.814z"
                fill="#FF0000"
              />
              <path d="M9.75 15.02V8.98l6.5 3.02-6.5 3.02z" fill="#FFFFFF" />
            </svg>
            <span className="text-xl font-bold tracking-tighter text-white">
              YouTube
            </span>
          </div>

          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isLogin ? "Sign in" : "Create Account"}
          </h1>
          <p className="text-neutral-400 text-sm mt-1 mb-6">
            to continue to YouTube
          </p>

          {/* Error Message Box */}
          {state?.error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm animate-in fade-in duration-150">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-50 text-white font-semibold py-3 rounded-xl pressable transition-all shadow-lg shadow-red-600/20 flex items-center justify-center cursor-pointer"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Please wait...</span>
                </div>
              ) : (
                <span>{isLogin ? "Sign In" : "Get Started"}</span>
              )}
            </button>
          </form>

          <p className="text-center text-xs sm:text-sm text-neutral-400 mt-6">
            {isLogin ? "New to YouTube? " : "Already have an account? "}
            <Link
              href={isLogin ? "/signup" : "/login"}
              className="text-white hover:underline font-semibold"
            >
              {isLogin ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
