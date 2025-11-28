"use client";
import { formatProfileImageUrl, timeAgo } from "@/app/utils";
import { useEffect, useRef, useState } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaRegClock,
  FaEllipsisH,
} from "react-icons/fa";
import { addToWatchLater } from "../../user/[id]/home/actions";
import Link from "next/link";
import Image from "next/image";
import { toggleLikeVideo, toggleSubsribe } from "./actions";
import toast from "react-hot-toast";

const VideoSection = ({ videoParam }) => {
  let { video, isSubsribed, hasLiked } = videoParam;
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  let [isSubscribedState, setIsSubscribedState] = useState(isSubsribed);
  let [subscribedCount, setSubscribedCount] = useState(
    video.uploader._count.subscribers
  );
  let [hasLikedState, setHasLikedState] = useState(hasLiked);
  let [likesCount, setLikesCount] = useState(video._count.likes);
  const descRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);


  useEffect(() => {
    const el = descRef.current;
    if (!el) return;

    // Helper to measure whether content overflows the clamp (3 lines)
    const checkOverflow = () => {
      // Ensure the element exists
      if (!el) return;

      // Remove clamp to measure full height (force reflow), then restore clamp
      el.classList.remove("line-clamp-3");
      // allow browser to layout without the clamp
      requestAnimationFrame(() => {
        const fullHeight = el.scrollHeight;

        // restore clamp
        el.classList.add("line-clamp-3");
        // layout again
        requestAnimationFrame(() => {
          const clampedHeight = el.scrollHeight;
          setIsOverflowing(fullHeight > clampedHeight + 1); // +1 tolerance
        });
      });
    };

    checkOverflow();

    // Re-check on resize (responsive)
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [video.description]);
  useEffect(() => {
    if (isMoreMenuOpen) {
      document.addEventListener("mousedown", () => setIsMoreMenuOpen(false));
    } else {
      document.removeEventListener("mousedown", () => setIsMoreMenuOpen(false));
    }

    return () =>
      document.removeEventListener("mousedown", () => setIsMoreMenuOpen(false));
  });

  function formatImageUrl(n) {
    return `/thumbnails/thumbnail${n}.jpg`;
  }
  function subsribeHandler() {
    setSubscribedCount((prev) => prev + (isSubscribedState ? -1 : 1));
    setIsSubscribedState((prev) => !prev);
  }
  function likeHandler() {
    setLikesCount((prev) => prev + (hasLikedState ? -1 : 1));
    setHasLikedState((prev) => !prev);
  }
  const toggleMoreMenu = () => setIsMoreMenuOpen(!isMoreMenuOpen);

  return (
    <section className="w-full flex flex-col pt-4 gap-6  relative">
      {/* Video Player */}
      <div className="relative w-full aspect-video bg-black ">
        <Image
          src={formatImageUrl(video.thumbnail)}
          width={500}
          height={500}
          className="w-full aspect-video rounded-sm bg-black"
        />
      </div>

      {/* Video Info */}
      <div className="flex flex-col  gap-4 border-b border-neutral-100 pb-2">
        <h1 className="text-xl md:text-2xl font-semibold">{video.title}</h1>

        {/* Views & Date */}
        <div className="text-neutral-300 text-sm flex gap-2">
          <span>{video._count.views} views</span>
          <span>•</span>
          <span>{timeAgo(video.createdAt)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex  flex-wrap items-center gap-3 md:gap-4 relative">
          <form action={toggleLikeVideo}>
            <input type="hidden" name="hasLiked" value={hasLikedState} />
            <input type="hidden" name="videoId" value={video.id} />
            <button
              className={`${
                !hasLikedState ? "text-neutral-100" : " border border-white"
              } flex items-center gap-2 cursor-pointer  hover:bg-neutral-700 bg-neutral-800 px-3 py-1 rounded-full`}
              onClick={likeHandler}
            >
              <FaThumbsUp /> <span>{likesCount}</span>
            </button>
          </form>
          <button className="flex items-center gap-2 py-2 px-5 bg-neutral-800 hover:bg-neutral-700  rounded-full cursor-pointer">
            <FaThumbsDown />
          </button>
          <button className="flex items-center gap-2  bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded-full cursor-pointer">
            <FaShare /> <span>Share</span>
          </button>
          {/* <form action="">

          <button className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded-full cursor-pointer">
            <FaRegClock /> <span>Save</span>
          </button>
          <input type="hidden" name="id" value={/>
          </form> */}
                    <form
                      action={async (formData) => {
                        await addToWatchLater(formData);
                        toast.success("added video to watch later")
                      }}
                    >
                      <input type="hidden" value={video.id} name="videoId" />
                      <button className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded-full cursor-pointer">
                              <FaRegClock /> <span>Save</span>
                      </button>
                    </form>

          {/* More Menu */}
          <div className="relative">
            <button
              onClick={toggleMoreMenu}
              className="flex items-center gap-2 cursor-pointer bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded-full"
            >
              <FaEllipsisH />
            </button>

            {isMoreMenuOpen && (
              <ul className="absolute right-0 mt-2 w-40  shadow-lg rounded-sm border bg-neutral-700 border-neutral-500 z-10">
                <li className="px-4 py-2 hover:bg-neutral-600 cursor-pointer">
                  Report
                </li>
                <li className="px-4 py-2 hover:bg-neutral-600 cursor-pointer">
                  Clip
                </li>
                <li className="px-4 py-2 hover:bg-neutral-600 cursor-pointer">
                  Open transcript
                </li>
                <li className="px-4 py-2 hover:bg-neutral-600 cursor-pointer">
                  Add to playlist
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Channel Info + Subscribe */}
        <div className="flex flex-col">
          <div>
            <div className="flex items-center justify-between    pt-4">
              <div className="flex items-center gap-3">
                <Link href={`/user/${video.uploader.id}/home`}>
                  <Image
                    src={formatProfileImageUrl(video.profilePhoto)}
                    width={200}
                    height={200}
                    alt="Channel Logo"
                    className="w-12 h-12 rounded-full cursor-pointer"
                  />
                </Link>
                <div className="flex flex-col text-neutral-300">
                  <span className="font-semibold text-sm md:text-base">
                    {video.uploader.username}
                  </span>
                  <span className="text-neutral-300 text-xs md:text-sm">
                    {subscribedCount} subscribers
                  </span>
                </div>
              </div>
              <form action={toggleSubsribe}>
                <input
                  type="hidden"
                  value={video.uploader.id}
                  name="uploaderId"
                />
                <input
                  type="hidden"
                  name="isSubscribed"
                  value={isSubscribedState}
                />
                <button
                  className={`
                bg-white text-black hover:bg-neutral-200 
                px-4 py-2 rounded-full font-semibold cursor-pointer
                `}
                  onClick={subsribeHandler}
                >
                  {isSubscribedState ? "Subscribed" : "Subscribe"}
                </button>
              </form>
            </div>

            {/*description*/}
            <div className="text-neutral-200 text-sm mt-3">
              <div
                ref={descRef}
                className={`bg-neutral-800 rounded-xl p-3 whitespace-pre-line transition-all duration-200 overflow-hidden ${
                  isDescriptionOpen ? "" : "line-clamp-3"
                }`}
                // preserve whitespace/newlines
              >
                {video.description}
              </div>

              {/* show toggle button only if there's more content */}
              {isOverflowing && (
                <button
                  className="mt-2 text-neutral-400 font-semibold hover:text-neutral-200"
                  onClick={() => setIsDescriptionOpen((s) => !s)}
                  aria-expanded={isDescriptionOpen}
                >
                  {isDescriptionOpen ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
