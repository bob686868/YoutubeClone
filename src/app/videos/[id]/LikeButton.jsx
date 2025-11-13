"use client";
import React, { useRef, useState } from "react";
import { toggleLikeFrontEnd } from "./actions";
import { FaThumbsUp } from "react-icons/fa";
// import CustomLikeButton from "./CustomLikeButton";

const LikeButton = ({ likesCount, isLikedByMe,commentId }) => {
  function updateLikeButtonState(){
    console.log('triggger update buttpn state')
    if(likedByMe)setLikesCountState((prevState)=>prevState-1)
    else setLikesCountState((prevState)=>prevState+1)
    setLikedByMe((prevState)=>!prevState)
    formRef.current.requestSubmit()
  }
  let [likedByMe, setLikedByMe] = useState(isLikedByMe);
  let [likesCountState,setLikesCountState]=useState(likesCount)
  let formRef=useRef()
  return (
    <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-xs">
      <span>{likesCountState}</span>
      <form ref={formRef} action={toggleLikeFrontEnd}>

        <button type="button" onClick={updateLikeButtonState}>
          <FaThumbsUp className={likedByMe ? `text-blue-500 cursor-pointer` : "text-gray-300 cursor-pointer"} />
        </button>
        <input type="hidden" value={ likedByMe ? "1" : "0"} name="hasLiked"/>
        <input type="hidden" value={commentId} name="commentId"/>
      </form>
    </button>
  );
};

export default LikeButton;
