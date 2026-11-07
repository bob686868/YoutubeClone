"use client";
import React from "react";

export default function ChannelLoading() {
  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto min-h-[80vh] py-6">
      {/* 1. Channel Profile Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-white/5">
        {/* Large Avatar */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full animate-shimmer shrink-0" />

        {/* Channel Details */}
        <div className="flex flex-col items-center sm:items-start gap-2 flex-1">
          <div className="h-7 sm:h-8 w-48 sm:w-64 rounded-md animate-shimmer" />
          <div className="h-4 w-36 rounded-md animate-shimmer" />
          <div className="h-3.5 w-48 rounded-md animate-shimmer" />

          {/* Action Button */}
          <div className="h-9 w-32 rounded-full animate-shimmer mt-2" />
        </div>
      </div>

      {/* 2. Channel Navigation Tabs Skeleton */}
      <div className="flex gap-6 border-b border-white/10 py-3">
        {["Home", "Videos", "Shorts", "Posts"].map((tab) => (
          <div key={tab} className="h-4 w-14 rounded animate-shimmer" />
        ))}
      </div>

      {/* 3. Channel Videos Grid Skeleton */}
      <div className="py-6">
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

