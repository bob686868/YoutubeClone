"use client";
import { timeAgo } from "@/app/utils";
import { useState } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaRegClock,
  FaEllipsisH,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { toggleLikeVideo, toggleSubsribe } from "./actions";

const VideoSection = ({ videoParam }) => {
  let { video, isSubsribed,hasLiked } = videoParam;
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  let [isSubscribedState, setIsSubscribedState] = useState(isSubsribed);
  let [subscribedCount, setSubscribedCount] = useState(video.uploader._count.subscribers);
  let [hasLikedState,setHasLikedState]=useState(hasLiked)
  let [likesCount,setLikesCount]=useState(video._count.likes)


  function formatImageUrl(n) {
    return `/thumbnails/thumbnail${n}.jpg`;
  }
  function subsribeHandler() {
    setSubscribedCount((prev)=>prev+(isSubscribedState ? -1 : 1))
    setIsSubscribedState((prev)=>!prev)
  }
  function likeHandler(){
        setLikesCount((prev)=>prev+(hasLikedState ? -1 : 1 ))
        setHasLikedState((prev)=>!prev)
  }
  const toggleMoreMenu = () => setIsMoreMenuOpen(!isMoreMenuOpen);

  return (
    <section className="w-full flex flex-col pt-4 gap-6 px-4 md:px-8 lg:px-16 relative">
      {/* Video Player */}
      <div className="relative w-full aspect-video bg-black">
        <Image
          src={formatImageUrl(video.thumbnail)}
          width={500}
          height={500}
          className="w-full aspect-video bg-black"
        />
      </div>

      {/* Video Info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-xl md:text-2xl font-semibold">{video.title}</h1>

        {/* Views & Date */}
        <div className="text-gray-600 text-sm flex gap-2">
          <span>{video._count.views} views</span>
          <span>•</span>
          <span>{timeAgo(video.createdAt)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 relative">
          <form action={toggleLikeVideo}>
            <input type="hidden" name="hasLiked" value={hasLikedState} />
            <input type="hidden" name="videoId" value={video.id} />
              <button 
                className={`${!hasLikedState ? 'text-black' : "text-blue-500"} flex items-center gap-2 cursor-pointer  hover:bg-gray-200 bg-gray-100 px-3 py-1 rounded`}
                onClick={likeHandler}>
                <FaThumbsUp /> <span>{likesCount}</span>
              </button>

          </form>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded cursor-pointer">
            <FaThumbsDown />
          </button>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded cursor-pointer">
            <FaShare /> <span>Share</span>
          </button>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded cursor-pointer">
            <FaRegClock /> <span>Save</span>
          </button>

          {/* More Menu */}
          <div className="relative">
            <button
              onClick={toggleMoreMenu}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
            >
              <FaEllipsisH />
            </button>

            {isMoreMenuOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded border border-gray-200 z-10">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Report
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Clip
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Open transcript
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Add to playlist
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Channel Info + Subscribe */}
        <div className="flex items-center justify-between mt-4 border-t border-gray-200 pt-4">
          <div className="flex items-center gap-3">
            <Link href={`/user/${video.uploader.id}/home`}>
              <Image
                src="https://i.pravatar.cc/40?img=1"
                width={200}
                height={200}
                alt="Channel Logo"
                className="w-12 h-12 rounded-full cursor-pointer"
                />
              </Link>
            <div className="flex flex-col">
              <span className="font-semibold text-sm md:text-base">
                {video.username}
              </span>
              <span className="text-gray-500 text-xs md:text-sm">
                {subscribedCount} subscribers
              </span>
            </div>
          </div>
          <form action={toggleSubsribe}>
            <input type="hidden" value={video.uploader.id} name="uploaderId" />
            <input
              type="hidden"
              name="isSubscribed"
              value={isSubscribedState}
            />
            <button
              className={`
                ${isSubscribedState ? "bg-gray-400 hover:bg-gray-500" : "bg-red-500 hover:bg-red-400 "}
                text-white px-4 py-2 rounded font-semibold cursor-pointer
              `}
              onClick={subsribeHandler}
            >
              {isSubscribedState ? "Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Collapsible Description */}
        <div className="text-gray-700 text-sm mt-4">
          <button
            className="font-medium underline"
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          >
            {isDescriptionOpen ? "Hide Description" : "Show Description"}
          </button>
          {isDescriptionOpen && <p className="mt-2">{video.description}</p>}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
