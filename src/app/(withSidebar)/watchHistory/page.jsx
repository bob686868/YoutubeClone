import React from "react";
import { getVideosOfWatchHistory } from "@/app/actions/watchHistory";
import VideoGrid from "../watchLater/VideoGrid";

export default async function WatchHistoryPage() {
  const { watchHistory = [] } = await getVideosOfWatchHistory();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <VideoGrid title="Watch History" videos={watchHistory} />
    </div>
  );
}
