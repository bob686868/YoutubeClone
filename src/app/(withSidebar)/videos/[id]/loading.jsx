"use client";
import React from "react";

export default function VideoLoading() {
  return (
    <div className="bg-[#0f0f0f] text-[#f1f1f1] min-h-screen">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 py-4 lg:py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Main Player & Details) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* 1. Main Cinema Video Frame */}
          <div className="w-full aspect-video rounded-2xl animate-shimmer shadow-2xl ring-1 ring-white/10" />

          {/* 2. Title Skeleton */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="h-6 sm:h-7 rounded-md w-[85%] animate-shimmer" />
            <div className="h-6 sm:h-7 rounded-md w-[50%] animate-shimmer" />
          </div>

          {/* 3. Channel Info & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-white/5">
            <div className="flex items-center gap-3">
              {/* Channel Avatar */}
              <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-full animate-shimmer shrink-0" />
              {/* Channel Name & Subs */}
              <div className="flex flex-col gap-1.5">
                <div className="h-4 w-32 rounded-md animate-shimmer" />
                <div className="h-3 w-20 rounded-md animate-shimmer" />
              </div>
              {/* Subscribe Button */}
              <div className="h-9 w-28 rounded-full animate-shimmer ml-2" />
            </div>

            {/* Actions Pills (Like, Share, Save) */}
            <div className="flex items-center gap-2">
              <div className="h-9 w-32 rounded-full animate-shimmer" />
              <div className="h-9 w-24 rounded-full animate-shimmer" />
              <div className="h-9 w-20 rounded-full animate-shimmer" />
            </div>
          </div>

          {/* 4. Description Box Skeleton */}
          <div className="w-full h-28 rounded-2xl bg-[#212121] animate-shimmer p-4 mt-2" />

          {/* 5. Comments Header & Input Skeleton */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="h-6 w-36 rounded-md animate-shimmer" />
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full animate-shimmer shrink-0" />
              <div className="flex-1 h-9 rounded-md animate-shimmer" />
            </div>
            {/* Comment Items */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3 items-start mt-2">
                <div className="w-9 h-9 rounded-full animate-shimmer shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-3.5 w-28 rounded animate-shimmer" />
                  <div className="h-3.5 w-full rounded animate-shimmer" />
                  <div className="h-3.5 w-2/3 rounded animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Recommended Sidebar) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {/* Filter Chips Row */}
          <div className="flex gap-2 pb-2">
            <div className="h-8 w-14 rounded-lg animate-shimmer shrink-0" />
            <div className="h-8 w-20 rounded-lg animate-shimmer shrink-0" />
            <div className="h-8 w-28 rounded-lg animate-shimmer shrink-0" />
          </div>

          {/* Recommended Video Cards */}
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex gap-3 items-start w-full">
              {/* Thumbnail */}
              <div className="w-40 sm:w-44 aspect-video rounded-xl animate-shimmer shrink-0" />
              {/* Info */}
              <div className="flex-1 flex flex-col gap-2 pt-1">
                <div className="h-3.5 w-[95%] rounded animate-shimmer" />
                <div className="h-3.5 w-[70%] rounded animate-shimmer" />
                <div className="h-3 w-[50%] rounded animate-shimmer mt-1" />
                <div className="h-2.5 w-[40%] rounded animate-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

