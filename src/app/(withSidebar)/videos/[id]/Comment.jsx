import Image from "next/image";
import { timeAgo } from "@/app/utils";
import LikeButton from "./LikeButton";
import { addReply } from "./actions";
import ReplyButton from "./ReplyButton";
import { formatProfileImageUrl } from "@/app/utils";
const Comment = ({ profilePhoto, username, time, text, likesCount,commentId,isLikedByMe }) => {
  time=timeAgo(time)
  console.log(profilePhoto+ "-adfdfidafin")
  // console.log(profilePhoto,username,time,text,likesCount,commentId)
  return (
    <div className="flex gap-3">
      {/* Avatar */}
      {profilePhoto!=null && <Image
        src={formatProfileImageUrl(profilePhoto)}
        width={123}
        height={123}
        alt={username}
        className="w-10 h-10 rounded-full object-cover mr-1"
      />}

      {/* Comment Body */}
      <div className="flex flex-col gap-1 w-full">
        {/* User name and time */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{username}</span>
          <span className="text-neutral-300 text-xs">{time}</span>
        </div>

        {/* Comment text */}
        <p className="text-neutral-100 text-sm">{text}</p>

        {/* Actions: Like */}
        <div className="flex  gap-4 mt-1">
        <LikeButton likesCount={likesCount} isLikedByMe={isLikedByMe} commentId={commentId}></LikeButton>
        <ReplyButton commentId={commentId}></ReplyButton>
         </div>
        {/* <ShowReplies commentId={c.id} count={c._count.subcomments}></ShowReplies> */}
      </div>
    </div>
  );
};

export default Comment;
