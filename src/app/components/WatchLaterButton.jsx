"use client";
import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { addToWatchLater } from "../(withSidebar)/user/[id]/home/actions";
import { MdOutlineWatchLater } from "react-icons/md";
import toast from "react-hot-toast";

export default function WatchLaterButton({ videoId }) {
  const [showButton, setShowButton] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const menuRef = useRef(null);

  const handleMenuOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const popupWidth = 180;
    const popupHeight = 44;

    let left = buttonRect.right - popupWidth;
    if (left < 10) left = 10;

    let top = buttonRect.bottom + 6;
    if (top + popupHeight > window.innerHeight) {
      top = buttonRect.top - popupHeight - 6;
    }

    setPopupStyle({ top, left });
    setShowButton((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowButton(false);
      }
    }

    if (showButton) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showButton]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={handleMenuOpen}
        aria-label="Action menu"
        className="p-1.5 hover:bg-white/10 active:bg-white/20 rounded-full cursor-pointer pressable text-neutral-400 hover:text-white transition-colors"
      >
        <BsThreeDotsVertical size={18} />
      </button>

      {showButton && (
        <div
          className="bg-[#282828] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden w-44 py-1 animate-in fade-in zoom-in-95 duration-100"
          style={{ position: "fixed", ...popupStyle }}
          onClick={(e) => e.stopPropagation()}
        >
          <form
            action={async (formData) => {
              await addToWatchLater(formData);
              setShowButton(false);
              toast.success("Saved to Watch Later");
            }}
          >
            <input type="hidden" value={videoId} name="videoId" />
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm cursor-pointer hover:bg-white/10 text-neutral-200 hover:text-white transition-colors text-left"
            >
              <MdOutlineWatchLater size={18} className="text-neutral-400" />
              <span>Watch later</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
