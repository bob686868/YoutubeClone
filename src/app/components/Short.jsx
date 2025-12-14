import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { IoMdVolumeHigh, IoMdPlay, IoMdExpand } from "react-icons/io5";

const actions = [
  { label: "Like", icon: <AiOutlineLike /> },
  { label: "Dislike", icon: <AiOutlineDislike /> },
  { label: "Download", icon: <MdDownload /> },
  { label: "Comment", icon: <FaRegCommentDots />, count: 796 },
  { label: "Share", icon: <RiShareForwardLine /> },
];

export default function Short() {
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(70);

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f9f9f9]">
      {/* Shorts container */}
      <div className="relative flex justify-center items-center w-[370px] h-[660px] bg-black rounded-2xl mt-8 shadow-lg">
        {/* Video/Image */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="/short.jpg"
            alt="Short"
            fill
            className="object-cover"
            priority
          />
          {/* Top overlay: controls and title */}
          <div className="absolute top-0 left-0 w-full flex flex-col items-center z-10">
            <div className="flex justify-between w-full px-4 pt-3 items-center">
              <div className="flex gap-2 items-center">
                <IoMdPlay size={24} color="#fff" className="opacity-80" />
                {/* Speaker with animated pill container and volume bar on hover */}
                <div
                  className={`relative flex items-center bg-black/90 rounded-full shadow-lg transition-all duration-300 overflow-hidden ${showVolume ? 'w-[220px] px-4 py-2' : 'w-10 p-2'}`}
                  onMouseEnter={() => setShowVolume(true)}
                  onMouseLeave={() => setShowVolume(false)}
                  style={{ minHeight: '40px', minWidth: '40px' }}
                >
                  <IoMdVolumeHigh size={24} color="#fff" className="opacity-80 cursor-pointer flex-shrink-0" />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={e => setVolume(Number(e.target.value))}
                    className={`accent-white h-1 w-32 ml-3 cursor-pointer transition-opacity duration-300 ${showVolume ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    style={{ accentColor: '#fff' }}
                  />
                </div>
              </div>
              <IoMdExpand size={24} color="#fff" className="opacity-80" />
            </div>
            <div className="mt-8 px-4 text-center">
              <span className="text-white font-bold text-lg drop-shadow">
                2025 Human Torch Touched <br />
                Silver Surfer&apos;s Surfboard <span>🤡</span>
              </span>
            </div>
          </div>
          {/* Bottom overlay: channel and description */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 z-10">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="/profilePhoto.jpg"
                alt="Channel"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-white font-semibold">@upgradebengali</span>
              <button className="ml-2 px-3 py-1 bg-white text-black rounded-full text-xs font-semibold hover:bg-gray-200 transition">
                Subscribe
              </button>
            </div>
            <div className="text-white text-sm font-medium leading-tight">
              2025 Human Torch Touched Surfboard vs 2007 Human Torch Touched Silver Surfer&apos;s Surfboard💀
            </div>
            <div className="text-gray-300 text-xs mt-1">
              🎵 Tourner Dans Le Vide · Indila
            </div>
          </div>
        </div>
        {/* Right action bar */}
        <div className="absolute right-[-60px] top-0 h-full flex flex-col justify-center items-center gap-4 z-20">
          <button className="bg-gray-200 rounded-full p-2 mb-2 flex items-center justify-center">
            <BsThreeDots size={20} color="#000" />
          </button>
          {actions.map((action, idx) => (
            <div key={action.label} className="flex flex-col items-center mb-2">
              <button className="bg-gray-200 rounded-full p-2 flex items-center justify-center">
                {React.cloneElement(action.icon, { size: 24, color: '#000' })}
              </button>
              <span className="text-xs text-gray-800 mt-1">
                {action.count !== undefined ? action.count : action.label}
              </span>
            </div>
          ))}
          {/* Channel avatar at the bottom */}
          <div className="mt-4">
            <Image
              src="/profilePhoto.jpg"
              alt="Channel"
              width={32}
              height={32}
              className="rounded-full border-2 border-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}