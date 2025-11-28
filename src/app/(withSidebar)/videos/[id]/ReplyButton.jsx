"use client";

import { useState} from "react";
import { addReplyFrontEnd } from "./actions";

export default function ReplyButton({ commentId }) {
  const [content, setContent] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  return (
    <div>
        <button
            onClick={() => setShowReplyForm((prev) => !prev)}
            className={` text-sm font-medium cursor-pointer hover:text-neutral-100 ${
            showReplyForm ? "text-neutral-200" : "text-neutral-300"
            }`}
        >
            Reply
        </button>

        {showReplyForm &&
        <form
        action={addReplyFrontEnd}
        className="mt-2 flex items-start gap-2"
        >
        <input type="hidden" name="commentId" value={commentId} />

        <textarea
            name="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a reply..."
            className="flex-1 resize-none rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
            rows={2}
        />

        <button
            disabled={!content.trim()}
            type="submit"
            className="text-neural-100 cursor-pointer hover:text-neutral-100 text-sm font-semibold 0 disabled:opacity-40"
        >
            {/* {isPending ? "Replying..." : "Reply"} */}
            Reply
        </button>
        </form>
}
    </div>
    
  );
}


