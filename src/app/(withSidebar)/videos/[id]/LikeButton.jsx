"use client";
import React, { useRef, useState } from "react";
import { toggleLikeFrontEnd } from "./actions";
import { FaThumbsUp, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

const LikeButton = ({ likesCount = 0, isLikedByMe = false, commentId }) => {
  const [likedByMe, setLikedByMe] = useState(isLikedByMe);
  const [count, setCount] = useState(likesCount);
  const formRef = useRef(null);

  const updateLikeButtonState = () => {
    if (likedByMe) {
      setCount((prev) => Math.max(0, prev - 1));
    } else {
      setCount((prev) => prev + 1);
    }
    setLikedByMe((prev) => !prev);
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div className="flex items-center gap-1 text-xs text-neutral-400">
      <form ref={formRef} action={toggleLikeFrontEnd} className="flex items-center">
        <button
          type="button"
          onClick={updateLikeButtonState}
          aria-label="Like comment"
          className="p-1.5 hover:bg-white/10 rounded-full cursor-pointer pressable transition-colors text-neutral-300 hover:text-white"
        >
          {likedByMe ? (
            <FaThumbsUp className="text-blue-400" size={13} />
          ) : (
            <FaRegThumbsUp size={13} />
          )}
        </button>
        {count > 0 && <span className="ml-0.5 text-xs font-medium">{count}</span>}
        <input type="hidden" value={likedByMe ? "1" : "0"} name="hasLiked" />
        <input type="hidden" value={commentId} name="commentId" />
      </form>

      <button
        type="button"
        aria-label="Dislike comment"
        className="p-1.5 hover:bg-white/10 rounded-full cursor-pointer pressable transition-colors text-neutral-300 hover:text-white"
      >
        <FaRegThumbsDown size={13} />
      </button>
    </div>
  );
};

export default LikeButton;
