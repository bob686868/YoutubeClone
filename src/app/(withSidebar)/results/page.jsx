import { searchVideos } from "@/app/actions/videos";
import VideoCard from "../watchLater/VideoCard";
import React from "react";
import VideoGrid from "../watchLater/VideoGrid";

const page = async ({ searchParams }) => {
  const searchText = searchParams.searchQuery;
  let { videos } = await searchVideos(searchText);
  return (
    <div className="min-h-[100vh] bg-neutral-950 relative">
      <div> Search term : {searchText} </div>
      <VideoGrid videos={videos} isResult={true}></VideoGrid>
    </div>
  );
};

export default page;
