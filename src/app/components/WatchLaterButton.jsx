"use client";
import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { addToWatchLater } from "../(withSidebar)/user/[id]/home/actions";
import { MdOutlineWatchLater } from "react-icons/md";

export default function WatchLaterButton({ videoId }) {
  const [showButton, setShowButton] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const menuRef = useRef(null);

  const handleMenuOpen = (e) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const popupWidth = 200;
    const popupHeight = 50; // Height for one button

    let left = buttonRect.right + 8;
    if (left + popupWidth > window.innerWidth) {
      left = buttonRect.left - popupWidth + 100;
    }

    let top = buttonRect.bottom + 8;
    if (top + popupHeight > window.innerHeight) {
      top = buttonRect.top - popupHeight - 8;
    }

    setPopupStyle({ top, left });
    setShowButton(true);
  };

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowButton(false);
      }
    }

    if (showButton) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showButton]);

  return (
    <div
      ref={menuRef}
      className="relative  hover:bg-neutral-700 cursor-pointer rounded-full p-2 -mr-2"
    >
      <BsThreeDotsVertical
        onClick={handleMenuOpen}
        className=" text-neutral-400 hover:text-neutral-300"
        size={20}
      />

      {showButton && (
        <div
          className="bg-neutral-700 border border-gray-600 rounded-md shadow-md z-10"
          style={{ position: "fixed", ...popupStyle }}
        >
          <form
            action={async (formData) => {
              await addToWatchLater(formData);
              setShowButton(false);
            }}
          >
            <input type="hidden" value={videoId} name="videoId" />
            <button className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-700 rounded-md">
              <MdOutlineWatchLater size={18} />
              Watch later
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
