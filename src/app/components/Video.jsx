import React, { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  MdOutlineWatchLater,
  MdOutlinePlaylistAdd,
  MdOutlineNotInterested,
  MdFlag,
} from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import Image from "next/image";
import Option from "./Option";

const options = [
  { label: "Save to Watch later", icon: <MdOutlineWatchLater size={20} /> },
  { label: "Save to playlist", icon: <MdOutlinePlaylistAdd size={20} /> },
  { label: "Share", icon: <RiShareForwardLine size={20} /> },
  { label: "Not interested", icon: <MdOutlineNotInterested size={20} /> },
  { label: "Report", icon: <MdFlag size={20} /> },
];

const Video = ({
  imgUrl,
  title,
  name,
  profilePhoto,
  views,
  duration,
  date,
}) => {
  let [isVisible, setIsVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState("bottom"); // 'bottom' or 'top'
  const dotsRef = useRef(null);
  const menuRef = useRef(null);

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
    <div className="w-100 h-83 flex flex-col mx-auto">
      <Image
        alt="profilePhoto"
        width={200}
        height={120}
        src="/profilePhoto.jpg"
        className="w-full h-[75%] mb-3 rounded-md"
      ></Image>

      <div className="flex">
        <Image
          alt="profilePhoto"
          src="/profilePhoto.jpg"
          width={20}
          height={20}
          className="size-5 mt-[2px] rounded-full mr-2"
        ></Image>

        <div className="flex flex-col">
          <div className="font-bold mb-3">
            “Stealth Mode Activated: Ninja Skills You Won't Believe!”
          </div>
          <div className="text-gray-500 mb-1">{/* {name} */}Ninja</div>
          <div className="text-sm text-gray-500">
            {/* {views}  •  {date} ago */}
            127k views • 5 days ago
          </div>
        </div>
        <div className="justify-self-end">
          <div className="relative">
            <BsThreeDotsVertical
              ref={dotsRef}
              size={20}
              className="w-6 h-6 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(true);
              }}
            />
            {isVisible && (
              <Option
                options={options}
                menuRef={menuRef}
                position={menuPosition}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
