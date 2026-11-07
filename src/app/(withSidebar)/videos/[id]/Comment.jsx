import React from "react";
import Image from "next/image";
import { timeAgo } from "@/app/utils";
import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";

const Comment = ({
  profilePhoto,
  username,
  time,
  text,
  likesCount,
  commentId,
  isLikedByMe,
}) => {
  const relativeTime = time ? timeAgo(time) : "";
  const avatar = profilePhoto || "/profilePhoto.jpg";

  return (
    <div className="flex gap-3.5 items-start group">
      {/* User Avatar */}
      <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10 mt-0.5">
        <Image
          src={avatar}
          fill
          alt={username || "User"}
          className="object-cover"
        />
      </div>

      {/* Comment Body */}
      <div className="flex flex-col gap-1 w-full min-w-0">
        {/* Username & Time */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-xs text-white">
            @{username || "user"}
          </span>
          <span className="text-neutral-400 text-xs">{relativeTime}</span>
        </div>

        {/* Comment Text */}
        <p className="text-neutral-200 text-sm leading-relaxed whitespace-pre-wrap break-words">
          {text}
        </p>

        {/* Actions Row */}
        <div className="flex items-center gap-3 mt-1.5">
          <LikeButton
            likesCount={likesCount}
            isLikedByMe={isLikedByMe}
            commentId={commentId}
          />
          <ReplyButton commentId={commentId} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
