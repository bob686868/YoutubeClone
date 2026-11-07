"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CommentInputClient({
  videoId,
  currentUserPhoto = "/profilePhoto.jpg",
  submitComment,
}) {
  const [commentText, setCommentText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  const handleCancel = () => {
    if (isSubmitting) return;
    setCommentText("");
    setIsFocused(false);
    if (inputRef.current) inputRef.current.blur();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("comment", commentText);
    formData.append("videoId", String(videoId));

    try {
      await submitComment(formData);
      setCommentText("");
      setIsFocused(false);
      router.refresh();
      toast.success("Comment added!");
    } catch {
      toast.error("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex gap-3.5 items-start w-full">
      {/* User avatar indicator */}
      <div className="w-10 h-10 rounded-full bg-neutral-800 shrink-0 relative overflow-hidden ring-1 ring-white/10 mt-0.5">
        <Image
          src={currentUserPhoto || "/profilePhoto.jpg"}
          fill
          className="object-cover"
          alt="Current user"
        />
      </div>

      {/* Input container */}
      <div className="flex-1 flex flex-col">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            name="comment"
            value={commentText}
            disabled={isSubmitting}
            onChange={(e) => setCommentText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Add a comment..."
            autoComplete="off"
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 pb-1.5 border-b border-neutral-700 focus:border-white focus:outline-none transition-colors duration-200 disabled:opacity-50"
          />

          {/* Action buttons (Shown on focus or when input has text) */}
          {(isFocused || commentText.length > 0 || isSubmitting) && (
            <div className="flex items-center justify-end gap-2 mt-2.5 animate-in fade-in duration-150">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-neutral-300 hover:bg-white/10 pressable transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!commentText.trim() || isSubmitting}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed pressable transition-all shadow-sm flex items-center justify-center min-w-[80px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Posting...</span>
                  </div>
                ) : (
                  "Comment"
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
