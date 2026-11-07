import React from "react";
import Image from "next/image";
import { MdOutlineFileDownload } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import { CiShuffle } from "react-icons/ci";
const WatchLater = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5  p-5">
      {/* Control Panel */}
      <div className="bg-gradient-to-b lg:col-span-2 from-gray-400 to-gray-600 p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-6">
          {/* Thumbnail */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/profilePhoto.jpg"
              width={360}
              height={202}
              className="rounded-md object-cover w-full max-w-[360px] aspect-video"
              alt="Playlist Thumbnail"
            />
          </div>

          {/* Info + Controls */}
          <div className="flex flex-col justify-between">
            {/* Title & Meta */}
            <div>
              <h1 className="text-white text-2xl font-bold">Watch later</h1>
              <p className="text-gray-300 text-sm mt-1">
                67 videos • No views • Updated today
              </p>
            </div>

            {/* Buttons & Actions */}
            <div className="flex items-center mt-6 gap-3">
              {/* Play All */}
              <button className="flex items-center px-5 py-2.5 rounded-full bg-white hover:bg-gray-200 transition shadow-sm">
                <svg className="w-5 h-5 mr-2 fill-black" viewBox="0 0 16 16">
                  <polygon points="0,0 16,8 0,16"></polygon>
                </svg>
                <span className="text-sm font-medium text-black">Play all</span>
              </button>

              {/* Shuffle */}
              <button className="flex items-center px-5 py-2.5 rounded-full bg-gray-300 hover:bg-gray-400 transition shadow-sm">
                <CiShuffle className="w-5 h-5 mr-2 text-black" />
                <span className="text-sm font-medium text-black">Shuffle</span>
              </button>

              {/* Right-side icons */}
              <div className="flex gap-2 ml-auto">
                <button className="p-2.5 bg-gray-600 hover:bg-gray-500 rounded-full transition">
                  <MdOutlineFileDownload className="w-5 h-5 text-white" />
                </button>
                <button className="p-2.5 bg-gray-600 hover:bg-gray-500 rounded-full transition">
                  <TbDotsVertical className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=""></div>
    </div>
  );
};

export default WatchLater;
