import React from "react";
import PlaceHolder from "@/app/components/PlaceHolder";
import VideoCard from "./VideoCard";
import WatchLaterBanner from "./WatchLaterBanner";

export default function VideoGrid({ videos = [], title, isResult = false }) {
  return (
    <div className="flex flex-col gap-6 w-full min-h-[70vh]">
      {!isResult && (
        <WatchLaterBanner
          firstVideo={videos[0]}
          title={title}
          count={videos.length}
        />
      )}

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 sm:gap-x-5 gap-y-8 sm:gap-y-10">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      ) : (
        <PlaceHolder message={`No videos in ${title}`} />
      )}
    </div>
  );
}
