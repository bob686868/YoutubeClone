import React from "react";
import UploadVideoClient from "./UploadVideoClient";
import { addVideo } from "../actions/videos.js";
import { getTags } from "../actions/tags";
const UploadVideoServer = async () => {
  const uploadVideo = async (prevState,formData) => {
    "use server";
    console.log(formData)
    console.log('=-=====================')
    const title = formData.get("title");
    const description = formData.get("description");
    let thumbnail = formData.get("thumbnail");
    thumbnail = Number(thumbnail[thumbnail.length - 5]);
    const tagsString = formData.get("tags");
    const isShort = formData.get("isShort") === "on"; // Checkbox value is 'on' if checked
    const tags = tagsString ? tagsString.split(",") : [];
    await addVideo(title, description, thumbnail, 120, tags, isShort);
      return { success: true };
  };
  const thumbnails = [
    "/thumbnails/thumbnail1.jpg",
    "/thumbnails/thumbnail2.jpg",
    "/thumbnails/thumbnail3.jpg",
  ];
  let { tags } = await getTags();
  tags = tags.map((t) => t.name);
  return (
    <div>
      <UploadVideoClient
        availableTags={tags}
        availableThumbnails={thumbnails}
        serverAction={uploadVideo}
      ></UploadVideoClient>
    </div>
  );
};

export default UploadVideoServer;
