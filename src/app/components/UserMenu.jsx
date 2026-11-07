"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { MdOutlineVideoLibrary, MdOutlineSettings } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

const UserMenu = ({ username = "User", profilePhoto, logout, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const displayPhoto = profilePhoto || "/profilePhoto.jpg";

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Trigger: Profile Picture */}
      <button
        onClick={toggleMenu}
        aria-label="User account menu"
        className="flex items-center focus:outline-none pressable rounded-full"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/15 hover:ring-2 hover:ring-white/30 transition-all">
          <Image
            alt="Profile"
            src={displayPhoto}
            fill
            className="object-cover cursor-pointer"
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-72 bg-[#282828] text-[#f1f1f1] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-2 z-50 border border-white/10 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          {/* Header Section */}
          <div className="flex gap-3.5 px-4 py-3.5 border-b border-white/10 items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10">
              <Image
                src={displayPhoto}
                fill
                className="object-cover bg-neutral-800"
                alt="Avatar"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm truncate text-white">
                {username}
              </span>
              <span className="text-neutral-400 text-xs truncate">
                @{username.toLowerCase()}
              </span>
              <Link
                href={userId ? `/user/${userId}/home` : "/changeAvatar"}
                onClick={() => setIsOpen(false)}
                className="text-blue-400 text-xs font-medium hover:text-blue-300 transition-colors mt-1.5"
              >
                View your channel
              </Link>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2 text-sm">
            <Link
              href="/changeAvatar"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-4 px-4 py-2.5 hover:bg-white/10 transition-colors text-left"
            >
              <FaUserCircle className="text-lg text-neutral-400" />
              <span>Change Avatar</span>
            </Link>

            <Link
              href={userId ? `/user/${userId}/videos` : "/"}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-4 px-4 py-2.5 hover:bg-white/10 transition-colors text-left"
            >
              <MdOutlineVideoLibrary className="text-lg text-neutral-400" />
              <span>Your videos</span>
            </Link>

            <div className="h-px bg-white/10 my-1" />

            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full cursor-pointer flex items-center gap-4 px-4 py-2.5 hover:bg-white/10 hover:text-red-400 transition-colors text-left text-neutral-200"
            >
              <FaSignOutAlt className="text-lg text-neutral-400" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
