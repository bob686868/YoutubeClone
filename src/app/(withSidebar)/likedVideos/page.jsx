import React from "react";
import VideoGrid from "../watchLater/VideoGrid";
import { getLikedVideos } from "@/app/actions/videos";

export default async function LikedVideosPage() {
  const { videos = [] } = await getLikedVideos();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <VideoGrid title="Liked Videos" videos={videos} />
    </div>
  );
}
