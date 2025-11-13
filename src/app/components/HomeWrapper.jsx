import React from "react";
import { getTags } from "../actions/tags";
import { getVideos } from "../actions/videos";
import Home from "../components/Home";
const HomeWrapper = async () => {
  let {tags} = await getTags();
  let {videos} = await getVideos();
  console.log(videos)
  return (
    <div className="bg-neutral-900 min-h-full text-neutral-100">
      <Home tags={tags} videos={videos}></Home>
    </div>
  );
};

export default HomeWrapper;
