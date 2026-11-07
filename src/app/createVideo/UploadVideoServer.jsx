import React from "react";
import UploadVideoClient from "./UploadVideoClient";
import { addVideo } from "../actions/videos.js";
import { getTags } from "../actions/tags";

export const dynamic = "force-dynamic";

const UploadVideoServer = async () => {
  const uploadVideo = async (prevState, formData) => {
    "use server";

    const title = formData.get("title");
    const description = formData.get("description");
    const thumbnail = formData.get("thumbnail");
    const videoFile = formData.get("video");
    const tagsString = formData.get("tags");
    
    const isShort = formData.get("isShort") === "true" || formData.get("isShort") === "on"; 
    const tags = tagsString ? tagsString.split(",") : [];

    const result = await addVideo(title, description, thumbnail, videoFile, 120, tags, isShort);
    
    if (result.status === 201) {
      return { success: true };
    } else {
      return { success: false, error: result.message || "Upload failed" };
    }
  };

  const tagResult = await getTags().catch(() => ({ tags: [] }));
  const tags = Array.isArray(tagResult?.tags) ? tagResult.tags.map((t) => t.name) : [];

  return (
    <div>
      <UploadVideoClient
        availableTags={tags}
        serverAction={uploadVideo}
      />
    </div>
  );
};

export default UploadVideoServer;
