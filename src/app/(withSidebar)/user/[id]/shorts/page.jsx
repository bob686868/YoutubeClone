import React from "react";
import ProfileHeader from "../ProfileHeader";

const page = async ({ params }) => {
  let { id } = await params;
  return (
    <div className="bg-neutral-950 min-h-full relative px-4">
      <ProfileHeader id={id} activeTab={"shorts"}></ProfileHeader>
      <span className=" absolute top-[50%] left-[50%] -translate-x-[50%] mx-auto text-neutral-300 text-2xl">
        No Shorts Available
      </span>
    </div>
  );
};

export default page;
