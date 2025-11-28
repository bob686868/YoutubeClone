"use client";
import React, { useRef } from "react";

const PlaceHolder = () => {
  let divRef = useRef();
  if (divRef.current) {
    const rect = divRef.current.getBoundingClientRect();
    console.log("position", rect);
  }
  return (
    <div
      ref={divRef}
      className="text-2xl text-neutral-400 absolute top-[80%] left-[50%] -translate-[50%]"
    >
      No videos Available
    </div>
  );
};

export default PlaceHolder;
