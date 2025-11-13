import { getUserVideos } from "@/app/actions/videos";
import React from "react";
import ProfileHeader from "../ProfileHeader";
import Video from "@/app/(withSidebar)/user/[id]/home/Video";

const page = async ({ params }) => {
  let { id } = await params;
  let { videos } = await getUserVideos(Number(id));

  console.log(videos);
  return (
    <div>
      <ProfileHeader activeTab={"home"} id={id}></ProfileHeader>
      {videos.map((v) => (
        <Video video={v}></Video>
      ))}
    </div>
  );
};

export default page;
