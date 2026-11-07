"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addReplyFrontEnd } from "./actions";
import toast from "react-hot-toast";

export default function ReplyButton({ commentId }) {
  const [content, setContent] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("commentId", String(commentId));
    formData.append("text", content.trim());

    try {
      await addReplyFrontEnd(formData);
      setContent("");
      setShowReplyForm(false);
      router.refresh();
      toast.success("Reply added!");
    } catch {
      toast.error("Failed to post reply.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowReplyForm((prev) => !prev)}
        className="px-3 py-1 text-xs font-semibold rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors pressable"
      >
        Reply
      </button>

      {showReplyForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-3 flex flex-col gap-2 pl-2 border-l border-white/10 animate-in fade-in duration-150"
        >
          <textarea
            name="text"
            value={content}
            disabled={isSubmitting}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a reply..."
            rows={2}
            className="w-full bg-transparent border-b border-neutral-700 focus:border-white focus:outline-none text-sm text-white placeholder-neutral-500 py-1 resize-none transition-colors disabled:opacity-50"
          />

          <div className="flex items-center justify-end gap-2 mt-1">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                setContent("");
                setShowReplyForm(false);
              }}
              className="px-3 py-1 text-xs font-semibold rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors pressable disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              disabled={!content.trim() || isSubmitting}
              type="submit"
              className="px-3.5 py-1 text-xs font-semibold rounded-full bg-white text-black hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all pressable shadow-sm flex items-center justify-center min-w-[70px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Posting...</span>
                </div>
              ) : (
                "Reply"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
