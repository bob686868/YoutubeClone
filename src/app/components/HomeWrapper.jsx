import React from "react";
import { getTags } from "../actions/tags";
import { getVideos } from "../actions/videos";
import Home from "../components/Home";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "../actions/users";
const HomeWrapper = async () => {
  let { tags } = await getTags();
  let { videos } = await getVideos();
  let cookieStore = await cookies();
  let id = cookieStore.get("id");
  if (!id) redirect("/login");
  return (
    <div className="bg-neutral-950 min-h-full text-neutral-100">
      <Home tags={tags} videos={videos} logout={logout}></Home>
    </div>
  );
};

export default HomeWrapper;
