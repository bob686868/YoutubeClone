"use client";
import React from "react";

export default function LikedVideosLoading() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col gap-8 w-full">
        {/* Banner Skeleton */}
        <div className="w-full rounded-2xl p-6 sm:p-8 bg-[#212121] animate-shimmer flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-full sm:w-[320px] md:w-[260px] aspect-video rounded-xl bg-black/40 animate-shimmer shrink-0" />
          <div className="flex flex-col flex-1 items-center md:items-start gap-3 w-full">
            <div className="h-8 w-48 rounded-md animate-shimmer" />
            <div className="h-4 w-28 rounded-md animate-shimmer" />
            <div className="h-3 w-36 rounded-md animate-shimmer" />
            <div className="flex gap-3 mt-4">
              <div className="h-10 w-28 rounded-full animate-shimmer" />
              <div className="h-10 w-28 rounded-full animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Video Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 sm:gap-x-5 gap-y-8 sm:gap-y-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col w-full gap-3">
              <div className="w-full aspect-video rounded-2xl animate-shimmer" />
              <div className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-full animate-shimmer shrink-0" />
                <div className="flex-1 flex flex-col gap-2 pt-1">
                  <div className="h-3.5 w-[90%] rounded animate-shimmer" />
                  <div className="h-3.5 w-[65%] rounded animate-shimmer" />
                  <div className="h-3 w-[45%] rounded animate-shimmer mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

