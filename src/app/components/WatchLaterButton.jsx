"use client";
import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { addToWatchLater } from "../(withSidebar)/user/[id]/home/actions";
import { MdOutlineWatchLater } from "react-icons/md";
export default function WatchLaterButton({ videoId }) {
  const [showButton, setShowButton] = useState(false);
  const menuRef = useRef(null);
  console.log(menuRef.current)

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if(menuRef.current && !menuRef.current.contains(e.target))
        setShowButton(false);
    }

    if (showButton) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup when component unmounts or menu closes
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showButton]);

  return (
    <div ref={menuRef} className="relative">
      <BsThreeDotsVertical
        onClick={() => setShowButton((prev) => !prev)}
        className="cursor-pointer text-gray-400 hover:text-gray-500"
        size={20}
      />

      {showButton && (
        <div className="absolute left-10 top-2 cursor-pointer bg-neutral-800 border border-gray-700 rounded-md shadow-md z-10">
          <form 
          action={async (formData) => {
              await addToWatchLater(formData);
              setShowButton(false); 
            }}>
            <input type="hidden" value={videoId} name="videoId" />
            <button
              className="flex items-center gap-2 px-3 py-2 w-31 cursor-pointer text-sm text-gray-200 hover:bg-gray-700 rounded-md"
            >
              <MdOutlineWatchLater size={18} />
              Watch later
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
