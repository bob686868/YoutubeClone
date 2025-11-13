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
        className={`fixed top-0 left-0 h-full bg-neutral-800 text-neutral-100 border-r z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:w-64 w-60`}
      >
        {/* YouTube logo area */}
        <div className="flex items-center p-[18px] lg:p-[13.5px] border-b">
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden mr-2 cursor-pointer text-neutral-100"
          >
            ✕
          </button>
          <h1 className="text-xl font-semibold text-neutral-100">YouTube</h1>
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

          <hr className="my-2" />

          <Link
            href="/history"
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
            href={`/watchLater`}
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
