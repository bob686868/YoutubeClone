import { getUserVideos } from "@/app/actions/videos";
import React from "react";
import ProfileHeader from "../ProfileHeader";
import Video from "@/app/(withSidebar)/user/[id]/home/Video";

const page = async ({ params }) => {
  let { id } = await params;
  let { videos } = await getUserVideos(Number(id));

  console.log(videos);
  return (
    <div className="px-4 bg-neutral-950">
      <ProfileHeader activeTab={"videos"} id={id}></ProfileHeader>

      <div className="py-3 grid grid-cols-1 gap-2 min-h-[80vh] sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <Video video={v}></Video>
        ))}
      </div>
    </div>
  );
};

export default page;
