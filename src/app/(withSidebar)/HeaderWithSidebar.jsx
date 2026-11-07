"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { IoMenu, IoMic, IoNotifications, IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { searchVideosFrontEnd } from "./actions";
import UserMenu from "../components/UserMenu";

const HeaderWithSidebar = ({
  userId,
  profilePhoto,
  username,
  logout,
  children,
}) => {
  const pathname = usePathname();
  const isWatchPage = pathname.startsWith("/videos/");

  // On watch page, sidebar is always overlay drawer and starts closed
  // On feed pages, desktop starts expanded (isCollapsedDesktop: false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCollapsedDesktop, setIsCollapsedDesktop] = useState(false);

  const handleMenuClick = () => {
    if (isWatchPage) {
      setIsDrawerOpen((prev) => !prev);
    } else {
      // On mobile screens, open drawer; on desktop, toggle mini-sidebar
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        setIsDrawerOpen((prev) => !prev);
      } else {
        setIsCollapsedDesktop((prev) => !prev);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f1f1f1]">
      {/* Fixed Top Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/5 z-40 text-[#f1f1f1] px-4">
        <div className="flex justify-between items-center h-full gap-4">
          {/* Left section: Hamburger & Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              aria-label="Toggle navigation menu"
              onClick={handleMenuClick}
              className="p-2.5 hover:bg-white/10 active:bg-white/20 rounded-full cursor-pointer pressable text-neutral-200 transition-colors"
            >
              <IoMenu size={22} />
            </button>

            <Link href="/" className="flex items-center gap-1 group py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={28}
                height={28}
                className="transform group-hover:scale-105 transition-transform duration-200"
              >
                <path
                  d="M23.498 6.186a2.997 2.997 0 0 0-2.116-2.118C19.673 3.5 12 3.5 12 3.5s-7.674 0-9.382.568A2.997 2.997 0 0 0 .502 6.186C0 7.894 0 12 0 12s0 4.106.502 5.814a2.997 2.997 0 0 0 2.116 2.118C24 16.106 24 12 24 12s0-4.106-.502-5.814z"
                  fill="#FF0000"
                />
                <path d="M9.75 15.02V8.98l6.5 3.02-6.5 3.02z" fill="#FFFFFF" />
              </svg>
              <span className="text-xl font-bold tracking-tighter text-white">
                YouTube
              </span>
            </Link>
          </div>

          {/* Center section: Search Bar & Mic */}
          <div className="flex-1 max-w-2xl flex items-center justify-center">
            <form
              action={searchVideosFrontEnd}
              className="flex items-center w-full max-w-lg group"
            >
              <div className="flex-1 flex items-center bg-[#121212] border border-white/15 rounded-l-full px-4 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all duration-150">
                <input
                  type="text"
                  name="searchText"
                  placeholder="Search"
                  autoComplete="off"
                  className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                aria-label="Submit Search"
                className="px-6 py-2 bg-[#222222] hover:bg-[#272727] border border-l-0 border-white/15 rounded-r-full pressable text-neutral-300 hover:text-white transition-colors flex items-center justify-center"
              >
                <IoSearch size={19} />
              </button>
            </form>

            <button
              aria-label="Voice search"
              className="hidden sm:flex ml-3 p-2.5 bg-[#1f1f1f] hover:bg-[#272727] active:bg-[#333333] rounded-full cursor-pointer pressable text-neutral-200 transition-colors shrink-0"
            >
              <IoMic size={20} />
            </button>
          </div>

          {/* Right section: Create, Notifications, Profile */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Link
              href="/createVideo"
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 active:bg-white/20 rounded-full text-sm font-medium text-white transition-colors pressable"
            >
              <FaPlus size={14} />
              <span className="hidden sm:inline">Create</span>
            </Link>

            <button
              aria-label="Notifications"
              className="p-2.5 hover:bg-white/10 active:bg-white/20 rounded-full cursor-pointer pressable text-neutral-200 transition-colors"
            >
              <IoNotifications size={20} />
            </button>

            <UserMenu
              username={username?.username || "User"}
              userId={userId}
              profilePhoto={profilePhoto}
              logout={logout}
            />
          </div>
        </div>
      </header>

      {/* Sidebar Component */}
      <Sidebar
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        isWatchPage={isWatchPage}
        isCollapsedDesktop={isCollapsedDesktop}
      />

      {/* Main Content Area */}
      <main
        className={`min-h-screen pt-14 bg-[#0f0f0f] transition-[padding] duration-200 ease-out ${
          isWatchPage
            ? "w-full"
            : isCollapsedDesktop
            ? "lg:pl-[72px]"
            : "lg:pl-60"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default HeaderWithSidebar;
