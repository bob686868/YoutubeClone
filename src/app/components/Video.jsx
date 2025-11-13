import React, { useState, useEffect, useRef } from "react";
import Option from "./Option";

import { BsThreeDotsVertical } from "react-icons/bs";
import {
  MdOutlineWatchLater,
  MdOutlinePlaylistAdd,
  MdOutlineNotInterested,
  MdFlag,
} from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";

import Image from "next/image";
import Link from "next/link";
import { formatDuration, timeAgo } from "../utils";
import WatchLater from "./WatchLater";
import WatchLaterButton from "./WatchLaterButton";

const options = [
  { label: "Save to Watch later", icon: <MdOutlineWatchLater size={20} /> },
  { label: "Save to playlist", icon: <MdOutlinePlaylistAdd size={20} /> },
  { label: "Share", icon: <RiShareForwardLine size={20} /> },
  { label: "Not interested", icon: <MdOutlineNotInterested size={20} /> },
  { label: "Report", icon: <MdFlag size={20} /> },
];

const Video = ({
video
}) => {
  const thumbnailUrl=(t)=>"/thumbnails/thumbnail"+String(t)+".jpg"
  
  let [isVisible, setIsVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState("bottom"); // 'bottom' or 'top'
  const dotsRef = useRef(null);
  const menuRef = useRef(null);
  console.log(video)
  console.log('========================')
  let {id,uploader,title,description,duration,createdAt,thumbnail}=video
  let {name,uploaderId}=uploader
  let imgUrl=thumbnailUrl(thumbnail)
  useEffect(() => {
    if (isVisible) {
      // Prevent screen shift when hiding scrollbar
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      const handleClick = (e) => {
        // If click is outside menu and dots, close
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target) &&
          dotsRef.current &&
          !dotsRef.current.contains(e.target)
        ) {
          setIsVisible(false);
        }
      };
      document.addEventListener("click", handleClick);

      // Dynamic menu positioning
      setTimeout(() => {
        if (dotsRef.current && menuRef.current) {
          const dotsRect = dotsRef.current.getBoundingClientRect();
          const menuHeight = menuRef.current.offsetHeight;
          const spaceBelow = window.innerHeight - dotsRect.bottom;
          if (spaceBelow < menuHeight && dotsRect.top > menuHeight) {
            setMenuPosition("top");
          } else {
            setMenuPosition("bottom");
          }
        }
      }, 0);

      // Cleanup
      return () => {
        document.body.style.overflow = "scroll";
        document.body.style.paddingRight = "";
        document.removeEventListener("click", handleClick);
      };
    } else {
      document.body.style.overflow = "scroll";
      document.body.style.paddingRight = "";
    }
  }, [isVisible]);

  return (
    <div className=" flex flex-col mx-4 h-65">
      <Link href={`/videos/${id}`}>
        <Image
          alt="video thumbnail"
          width={150}
          height={150}
          src={imgUrl}
          className="w-full h-40 object-cover mb-3 rounded-md cursor-pointer"
          ></Image>
        </Link>

      <div className="flex">
        <Link href={`/user/${uploaderId}/home`}>
          <Image
            alt="profilePhoto"
            src="/profilePhoto.jpg"
            width={150}
            height={150}
            className="size-5 mt-[2px]  rounded-full mr-3 "
            ></Image>
          </Link>

        <div className="flex flex-col w-full">
          <div className="font-bold text-[15px] mb-3">{title}</div>
          <div className="text-gray-500 mb-1">
            {/* {name} */}
            {name}
          </div>
          <div className="text-sm text-gray-500">
            {/* {views}  •  {date} ago */}
            {video._count.views} views • {timeAgo(createdAt)}
          </div>
        </div>
        <div className="justify-self-end">
          <div className="relative">
            {/* <BsThreeDotsVertical
              ref={dotsRef}
              size={20}
              className="w-6 h-6 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(!isVisible);
              }}
            /> */}
              <WatchLaterButton videoId={video.id}></WatchLaterButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
