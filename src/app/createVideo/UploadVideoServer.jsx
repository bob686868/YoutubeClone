import React from "react";
import UploadVideoClient from "./UploadVideoClient";
import { addVideo } from "../actions/videos.js";
import { getTags } from "../actions/tags";
const UploadVideoServer = async () => {
  const uploadVideo = async (prevState,formData) => {
    "use server";
   console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
   console.log(process.env.SUPABASE_SERVICE_ROLE_KEY)
   console.log('================================')
    const title = formData.get("title");
    const description = formData.get("description");
    const thumbnail = formData.get("thumbnail");
    console.log(thumbnail)
    const tagsString = formData.get("tags");
    const isShort = formData.get("isShort") === "on"; // Checkbox value is 'on' if checked
    const tags = tagsString ? tagsString.split(",") : [];
    await addVideo(title, description, thumbnail, 120, tags, isShort);
      return { success: true };
  };
  let { tags } = await getTags();
  tags = tags.map((t) => t.name);
  return (
    <div>
      <UploadVideoClient
        availableTags={tags}
        serverAction={uploadVideo}
      ></UploadVideoClient>
    </div>
  );
};

export default UploadVideoServer;
