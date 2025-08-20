'use client';
import { useState } from 'react';
import Image from 'next/image';
import { IoMdMenu } from "react-icons/io";
import { IoMdMic } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import MobileSidebar from './MobileSidebar';

const Header = () => {
 

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b z-40">
        <div className="flex justify-between items-center h-full px-4">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full group relative"
            >
              <IoMdMenu size={24} />
              <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-2 z-50">
                <div className="bg-[#606060] text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-lg">
                  Menu
                  <div className="absolute w-2 h-2 bg-[#606060] transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            </button>
  
            <div className="flex items-center gap-1">
              <Image 
                src="/youtube.jpg"
                alt="YouTube"
                width={90}
                height={20}
                className="h-5 w-auto"
                priority
              />
       
              <span className="text-xl font-semibold">YouTube</span>
            </div>
          </div>

          {/* Center section */}
          <div className="flex-1 flex items-center justify-center max-w-2xl mx-4">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 text-sm"
              />
              <button className="px-6 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-100 group relative">
                <IoMdSearch size={20} />
                <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-2 z-50">
                  <div className="bg-[#606060] text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-lg">
                    Search
                    <div className="absolute w-2 h-2 bg-[#606060] transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
                  </div>
                </div>
              </button>
            </div>
            
            <button className="ml-4 p-2 hover:bg-gray-100 rounded-full group relative">
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
            <button className="p-2 hover:bg-gray-100 rounded-full group relative">
              <FaPlus size={20} />
              <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-2 z-50">
                <div className="bg-[#606060] text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-lg">
                  Create
                  <div className="absolute w-2 h-2 bg-[#606060] transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full group relative">
              <IoMdNotifications size={24} />
              <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-2 z-50">
                <div className="bg-[#606060] text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-lg">
                  Notifications
                  <div className="absolute w-2 h-2 bg-[#606060] transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 ml-2"></div>
            <button className="p-2 hover:bg-gray-100 rounded-full group relative">
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

     
    </>
  );
};

export default Header;
