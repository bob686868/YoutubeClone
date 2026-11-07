"use client";
import React from "react";
import { MdOutlineVideoLibrary } from "react-icons/md";

const PlaceHolder = ({ message = "No videos available" }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-neutral-400">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-3">
        <MdOutlineVideoLibrary size={32} className="text-neutral-500" />
      </div>
      <p className="text-lg font-medium text-neutral-300">{message}</p>
      <p className="text-sm text-neutral-500 mt-1">
        Videos you save or watch will appear here.
      </p>
    </div>
  );
};

export default PlaceHolder;
