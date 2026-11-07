import React from "react";
import Comment from "./Comment";
import { addComment, getComments } from "@/app/actions/comments";
import { getCachedProfilePhoto } from "@/app/utils/cache";
import { cookies } from "next/headers";
import CommentInputClient from "./CommentInputClient";

const CommentSection = async ({ videoId }) => {
  const cookieStore = await cookies();
  const userId = Number(cookieStore.get("id")?.value) || null;
  const currentUserPhoto = userId
    ? await getCachedProfilePhoto(userId)
    : "/profilePhoto.jpg";

  async function submitComment(formData) {
    "use server";
    let data = formData.get("comment");
    let vId = formData.get("videoId");
    if (data && data.trim()) {
      await addComment(data, vId);
    }
  }

  const { comments = [] } = await getComments(videoId);

  return (
    <section className="w-full text-[#f1f1f1] flex flex-col gap-6 pt-4">
      <div className="flex items-center gap-6">
        <h2 className="font-bold text-xl text-white">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </h2>
      </div>

      {/* Interactive YouTube-style Comment Input */}
      <CommentInputClient
        videoId={videoId}
        currentUserPhoto={currentUserPhoto}
        submitComment={submitComment}
      />

      {/* Comment List */}
      <div className="flex flex-col gap-5 mt-2">
        {comments.length > 0 ? (
          comments.map((c) => (
            <Comment
              key={c.id}
              profilePhoto={c.user?.profilePhoto}
              username={c.user?.username || "User"}
              time={c.createdAt}
              text={c.text}
              likesCount={c.likesCount || 0}
              commentId={c.id}
              isLikedByMe={c.likedByMe}
            />
          ))
        ) : (
          <div className="text-neutral-500 text-sm py-4">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentSection;
