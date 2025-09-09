import React from "react";
import Image from "next/image";
import { MdOutlineFileDownload } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import { CiShuffle } from "react-icons/ci";
const WatchLater = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 bg-gray-400/50 p-5">
      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 mb-5 lg:col-span-1">
        <Image
          src="/profilePhoto.jpg"
          width={200}
          height={200}
          className="rounded-sm mx-auto"
        />
        <div className="flex-col h-full justify-center">
          <h1 className="text-white text-bold text-lg mb-5 ">Watch Later</h1>
          <div className="flex justify-between">
            <p className="flex gap-x-2 text-sm text-gray-400">
              <span>63 videos</span>
              <span>No views</span>
              <span>Updated today</span>
            </p>
            <div>
              <div className="">
                <MdOutlineFileDownload className="bg-gray-200 size-10 text-white rounded-full p-3 mr-2" />
                <TbDotsVertical className="bg-gray-200 text-white size-10 rounded-full p-3 " />
              </div>
            </div>
          </div>

      </div>
        <div className="grid grid-cols-2 gap-x-1.5 mt-2 ">
          <button className="px-3 py-2 rounded-full bg-white">
            <span className="border-l-8 border-l-black border-t-8 border-t-transparent border-b-8 border-b-transparent w-0 h-0"></span>
            <span>Play All</span>
          </button>
          <button className="px-auto   rounded-full bg-gray-200/90">
            <CiShuffle className="mr-2 size-4" />
            <span>Shuffle</span>
          </button>
        </div>
      </div>
      {/* Videos */}
      <div className=""></div>
    </div>
  );
};

export default WatchLater;
