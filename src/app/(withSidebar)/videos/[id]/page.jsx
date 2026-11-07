import React from "react";
import VideoSection from "./VideoSection";
import { getVideo, getVideos } from "@/app/actions/videos";
import RecommendedSection from "./RecommendedSection";
import CommentSection from "./CommentSection";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const VideoPage = async ({ params }) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const userId = cookieStore.get("id")?.value;

  if (!userId) redirect("/login");

  const [videoData, allVideosData] = await Promise.all([
    getVideo(id),
    getVideos(),
  ]);

  const filteredVideos = allVideosData?.videos?.filter((v) => v.id != id) || [];

  return (
    <div className="bg-[#0f0f0f] text-[#f1f1f1] min-h-screen">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 py-4 lg:py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Column: Player, Video Info, Description & Comments */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <VideoSection videoParam={videoData} />
          <CommentSection videoId={id} />
        </div>

        {/* Sidebar Column: Recommended Videos */}
        <div className="lg:col-span-4">
          <RecommendedSection videos={filteredVideos} />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
