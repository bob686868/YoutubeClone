import React from "react";
import { getUserVideos } from "@/app/actions/videos";
import ProfileHeader from "../ProfileHeader";
import Video from "@/app/components/Video";

const UserVideosPage = async ({ params }) => {
  const { id } = await params;
  const { videos = [] } = await getUserVideos(Number(id));

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto min-h-[80vh]">
      <ProfileHeader activeTab="videos" id={id} />

      <div className="py-6">
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 sm:gap-x-5 gap-y-8 sm:gap-y-10">
            {videos.map((v) => (
              <Video key={v.id} video={v} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-neutral-500 text-sm">
            This channel has uploaded no videos.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserVideosPage;
