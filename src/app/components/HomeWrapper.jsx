import React from "react";
import { getTags } from "../actions/tags";
import { getVideos } from "../actions/videos";
import Home from "../components/Home";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "../actions/users";

const HomeWrapper = async () => {
  const { tags = [] } = await getTags();
  const { videos = [] } = await getVideos();
  const cookieStore = await cookies();
  const id = cookieStore.get("id");
  if (!id) redirect("/login");

  return (
    <div className="bg-[#0f0f0f] min-h-full text-[#f1f1f1]">
      <Home tags={tags} videos={videos} logout={logout} />
    </div>
  );
};

export default HomeWrapper;
