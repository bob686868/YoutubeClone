"use client";
import React from "react";

const SkeletonVideoCard = () => {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Thumbnail */}
      <div className="w-full aspect-video rounded-2xl animate-shimmer mb-3" />

      {/* 2. Content Row */}
      <div className="flex gap-3 items-start">
        {/* Avatar Circle */}
        <div className="w-9 h-9 rounded-full shrink-0 animate-shimmer" />

        {/* Text Lines */}
        <div className="flex flex-col flex-1 gap-2 pt-1">
          {/* Title Line 1 */}
          <div className="h-3.5 rounded-md w-[90%] animate-shimmer" />
          {/* Title Line 2 */}
          <div className="h-3.5 rounded-md w-[65%] animate-shimmer" />
          {/* Channel & Metadata Line */}
          <div className="h-3 rounded-md w-[45%] mt-1 animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-[#0f0f0f]">
      {/* Tags Skeleton Row */}
      <div className="sticky top-14 z-20 bg-[#0f0f0f] border-b border-white/5 py-2 px-4">
        <div className="flex gap-2.5 overflow-hidden py-1">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 rounded-lg shrink-0 animate-shimmer"
            />
          ))}
        </div>
      </div>

      {/* Responsive Grid matching Home.jsx */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 sm:gap-x-5 gap-y-8 sm:gap-y-10">
          {[...Array(8)].map((_, i) => (
            <SkeletonVideoCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
