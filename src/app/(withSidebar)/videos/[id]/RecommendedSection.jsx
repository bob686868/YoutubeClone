"use client";
import React, { useState } from "react";
import Video from "@/app/components/Video";

const RecommendedSection = ({ videos = [] }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Related", "Recently uploaded"];

  return (
    <aside className="w-full flex flex-col gap-4">
      {/* Filter Chips Bar */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer pressable ${
              activeFilter === filter
                ? "bg-white text-black font-semibold"
                : "bg-white/10 hover:bg-white/15 text-neutral-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Videos List */}
      <div className="flex flex-col gap-3.5">
        {videos.length > 0 ? (
          videos.map((v) => (
            <Video key={v.id} video={v} isSidebar={true} />
          ))
        ) : (
          <div className="text-center py-10 text-neutral-500 text-sm">
            No related videos found
          </div>
        )}
      </div>
    </aside>
  );
};

export default RecommendedSection;
