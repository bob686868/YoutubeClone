"use client";
import React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import Image from "next/image";
import { IoMdMenu } from "react-icons/io";
import { IoMdMic } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { searchVideosFrontEnd } from "./actions";
import UserMenu from "../components/UserMenu";

const HeaderWithSidebar =  ({userId,profilePhoto,username,logout}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(username,profilePhoto)


  return (
    <div>
      {/* <header className="fixed top-0 left-0 w-full bg-white flex items-center p-3 border-b z-50">
        <button
          className="p-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} className="text-white" />
        </button>
      </header> */}

      {/*old Header*/}
      <header className="fixed top-0 left-0 right-0 h-14 bg-neutral-950 border-b border-neutral-600 z-40 text-neutral-100">
        <div className="flex justify-between items-center h-full px-4">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-neutral-700 cursor-pointer rounded-full group relative"
              onClick={() => {
                console.log("opened");
                setIsOpen((prev) => !prev);
              }}
            >
              <IoMdMenu size={24} />
              <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-2 z-50">
                <div className="bg-[#606060] text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-lg ">
                  Menu
                  <div className="absolute w-2 h-2 bg-[#606060] transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            </button>

            <div className="flex items-center -ml-5 gap-1">
              <Image
                src="/youtube.png"
                alt="YouTube"
                width={60}
                height={60}
                className="inline-block "
                priority
              />

              <span className="text-xl font-semibold -ml-3 tracking-tighter">YouTube</span>
            </div>
          </div>

          {/* Center section */}
<div className="flex-1 flex items-center justify-center mx-4 whitespace-nowrap">
  <div className="flex">
    <form action={searchVideosFrontEnd} className="flex">
      <input
        type="text"
        name="searchText"
        placeholder="Search"
        className="px-4 py-2 border flex-grow min-w-0 border-neutral-600 rounded-l-full focus:outline-none focus:border-neutral-400 text-sm"
      />
      <button
        type="submit"
        className="px-6 py-[6px] bg-neutral-800 border border-l-0 border-neutral-600 cursor-pointer hover:bg-neutral-700 rounded-r-full group relative"
      >
        <IoMdSearch size={20} className="inline" />
      </button>
    </form>
  </div>

  <button className="ml-4 p-2 hover:bg-neutral-700 cursor-pointer rounded-full group relative">
    <IoMdMic size={24} />
    <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-2 z-50">
      <div className="bg-[#606060] text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-lg">
        Search with your voice
        <div className="absolute w-2 h-2 bg-[#606060] transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  </button>
</div>


          {/* Right section */}
          <div className="flex items-center gap-2">
            <Link href="/createVideo">
              <button className="p-2 hover:bg-neutral-700 cursor-pointer rounded-full group relative">
                <FaPlus size={20} />
                <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-2 z-50">
                  <div className="bg-[#606060] text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-lg">
                    Create
                    <div className="absolute w-2 h-2 bg-[#606060] transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
                  </div>
                </div>
              </button>
            </Link>
            <button className="p-2 hover:bg-neutral-700 rounded-full cursor-pointer group relative">
              <IoMdNotifications size={24} />
              <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-2 z-50">
                <div className="bg-[#606060] text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-lg">
                  Notifications
                  <div className="absolute w-2 h-2 bg-[#606060] transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
          </button>
            <UserMenu username={username.username} userId={userId} profilePhoto={profilePhoto} logout={logout}/>
          {/* <div className="w-8 h-8 rounded-full bg-gray-200 ml-2"></div> */}
            <button className="p-2 hover:bg-neutral-700 rounded-full cursor-pointer group relative">
              <BsThreeDotsVertical size={20} />
              <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-2 z-50">
                <div className="bg-[#606060] text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-lg">
                  Settings
                  <div className="absolute w-2 h-2 bg-[#606060] transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default HeaderWithSidebar;
