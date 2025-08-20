'use client'

import React from 'react'
import { useState,useEffect } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineFire } from "react-icons/hi";
import { BsMusicNoteList } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { BsPlayBtn } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import MobileSidebar from './MobileSidebar';

const Sidebar = () => {
   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  return (
    <div className="fixed left-0 top-0 h-screen w-[72px] bg-white z-50">
      <div className="flex flex-col h-full">
        {/* Hamburger Menu */}
        <div className="flex justify-center py-3">
          <RxHamburgerMenu 
            className="w-6 h-6 p-1 rounded-full hover:bg-gray-100 cursor-pointer" 
             onClick={() =>{ setIsMobileSidebarOpen(true) ; console.log("pressed hamurger")}}
          />
        </div>

        {/* Main Navigation Items */}
        <div className="flex-1">
          <div className="flex flex-col items-center py-1.5 hover:bg-gray-100 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <IoMdHome className="w-6 h-6 text-[#0f0f0f]" />
            </div>
            <span className="text-[10px] text-[#0f0f0f] mt-1">Home</span>
          </div>

          <div className="flex flex-col items-center py-1.5 hover:bg-gray-100 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <SiYoutubeshorts className="w-6 h-6 text-[#0f0f0f]" />
            </div>
            <span className="text-[10px] text-[#0f0f0f] mt-1">Shorts</span>
          </div>

          <div className="flex flex-col items-center py-1.5 hover:bg-gray-100 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <MdOutlineSubscriptions className="w-6 h-6 text-[#0f0f0f]" />
            </div>
            <span className="text-[10px] text-[#0f0f0f] mt-1">Subscriptions</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Library Section */}
        <div>
          <div className="flex flex-col items-center py-1.5 hover:bg-gray-100 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <MdOutlineVideoLibrary className="w-6 h-6 text-[#0f0f0f]" />
            </div>
            <span className="text-[10px] text-[#0f0f0f] mt-1">Library</span>
          </div>

          <div className="flex flex-col items-center py-1.5 hover:bg-gray-100 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <BsClockHistory className="w-6 h-6 text-[#0f0f0f]" />
            </div>
            <span className="text-[10px] text-[#0f0f0f] mt-1">History</span>
          </div>

          <div className="flex flex-col items-center py-1.5 hover:bg-gray-100 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <BsPlayBtn className="w-6 h-6 text-[#0f0f0f]" />
            </div>
            <span className="text-[10px] text-[#0f0f0f] mt-1">Your videos</span>
          </div>

          <div className="flex flex-col items-center py-1.5 hover:bg-gray-100 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <BsClock className="w-6 h-6 text-[#0f0f0f]" />
            </div>
            <span className="text-[10px] text-[#0f0f0f] mt-1">Watch later</span>
          </div>

          <div className="flex flex-col items-center py-1.5 hover:bg-gray-100 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center">
              <BsChevronDown className="w-6 h-6 text-[#0f0f0f]" />
            </div>
            <span className="text-[10px] text-[#0f0f0f] mt-1">Show more</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Subscriptions Section */}
        <div className="px-2">
          <div className="text-[10px] text-gray-500 font-medium mb-2">Subscriptions</div>
          <div className="flex flex-col items-center py-1.5 hover:bg-gray-100 cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
            <span className="text-[10px] text-[#0f0f0f] mt-1">Channel 1</span>
          </div>
          <div className="flex flex-col items-center py-1.5 hover:bg-gray-100 cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
            <span className="text-[10px] text-[#0f0f0f] mt-1">Channel 2</span>
          </div>
        </div>
      </div>
       <MobileSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
      />
    </div>
  )
}

export default Sidebar