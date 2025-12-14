// app/(withSidebar)/Sidebar.jsx
"use client";

import { Home, Compass, PlaySquare, Clock, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { MdOutlineWatchLater } from "react-icons/md";

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-neutral-950 text-neutral-100 border-r border-neutral-600 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:w-64 w-60`}
      >
        {/* YouTube logo area */}
        <div className="flex items-center p-[18px] lg:p-[13.5px] border-b border-neutral-600">
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden mr-2 hover:bg-neutral-700 rounded-full p-2 px-3 cursor-pointer text-neutral-100"
          >
            ✕
          </button>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={30}
      height={30}
      className="mr-1"
    >
      {/* Red rounded rectangle */}
      <path
        d="M23.498 6.186a2.997 2.997 0 0 0-2.116-2.118C19.673 3.5 12 3.5 12 3.5s-7.674 0-9.382.568A2.997 2.997 0 0 0 .502 6.186C0 7.894 0 12 0 12s0 4.106.502 5.814a2.997 2.997 0 0 0 2.116 2.118C4.327 20.5 12 20.5 12 20.5s7.674 0 9.382-.568a2.997 2.997 0 0 0 2.116-2.118C24 16.106 24 12 24 12s0-4.106-.502-5.814z"
        fill="#FF0000"
      />

      {/* White play triangle */}
      <path
        d="M9.75 15.02V8.98l6.5 3.02-6.5 3.02z"
        fill="#FFFFFF"
      />
    </svg>
          <h1 className="text-xl font-semibold tracking-tighter  text-neutral-100">YouTube</h1>
        </div>

        {/* Sidebar links */}
        <nav className="flex flex-col mt-2 text-sm">
          <Link
            href="/"
            className="flex items-center px-6 py-3 hover:bg-neutral-700"
          >
            <Home className="mr-5" size={22} />
            <span>Home</span>
          </Link>


          <Link
            href="/subscriptions"
            className="flex items-center px-6 py-3 hover:bg-neutral-700"
          >
            <PlaySquare className="mr-5" size={22} />
            <span>Subscriptions</span>
          </Link>

          <Link
            href="/"
            className="flex items-center px-6 py-3 hover:bg-neutral-700"
          >
            <Compass className="mr-5" size={22} />
            <span>Explore</span>
          </Link>

          <hr className="my-2 text-neutral-600" />

          <Link
            href="/watchHistory"
            className="flex items-center px-6 py-3 hover:bg-neutral-700"
          >
            <Clock className="mr-5" size={22} />
            <span>History</span>
          </Link>

          <Link
            href="/likedVideos"
            className="flex items-center px-6 py-3 hover:bg-neutral-700"
          >
            <ThumbsUp className="mr-5" size={22} />
            <span>Liked videos</span>
          </Link>

          <Link
            href='/watchLater'
            className="flex items-center px-6 py-3 hover:bg-neutral-700"
          >
            <MdOutlineWatchLater className="mr-5" size={22} />
            <span>Watch Later</span>
          </Link>
        </nav>
      </aside>
    </>
  );
}
