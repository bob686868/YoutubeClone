import React from "react";
import { getVideosOfWatchLater } from "@/app/actions/watchLater";
import VideoGrid from "./VideoGrid";

export default async function WatchLaterPage() {
  const { watchLater = [] } = await getVideosOfWatchLater();
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <VideoGrid videos={watchLater} title="Watch Later" />
    </div>
  );
}
