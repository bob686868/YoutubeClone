"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const UploadVideoClient = ({
  availableTags,
  availableThumbnails,
  serverAction,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState([]);
  const [isShort, setIsShort] = useState(false);

  const handleTagChange = (e) => {
    const value = e.target.value;
    if (tags.includes(value)) {
      setTags(tags.filter((tag) => tag !== value));
    } else {
      setTags([...tags, value]);
    }
  };

  return (
    <div className="min-h-screen text-neutral-100 bg-neutral-900 flex justify-center py-10">
      <div className="bg-neutral-800 w-full max-w-3xl p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Upload Video</h1>

        <form action={serverAction} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full border border-neutral-700 bg-neutral-900 text-neutral-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              className="w-full border resize-none border-neutral-700 bg-neutral-900 text-neutral-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={4}
            />
          </div>

          {/* Thumbnail */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Thumbnail</label>
            <div className="relative">
              <select
                value={thumbnail}
                name="thumbnail"
                required
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full appearance-none border border-neutral-700 bg-neutral-900 text-neutral-100 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="">Select a thumbnail</option>
                {availableThumbnails.map((img, idx) => (
                  <option
                    key={idx}
                    value={img}
                    className="bg-neutral-800 text-neutral-100"
                  >
                    Thumbnail {idx + 1}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                size={18}
              />
            </div>

            {thumbnail && (
              <Image
                src={thumbnail}
                alt="Selected thumbnail"
                className="mt-3 w-40 h-24 object-cover rounded-md border border-neutral-700"
                width={150}
                height={150}
              />
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleTagChange({ target: { value: tag } })}
                  className={`px-3 py-1 rounded-full border text-sm transition ${
                    tags.includes(tag)
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-neutral-900 text-neutral-400 border-neutral-700 hover:bg-neutral-700 hover:text-neutral-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <input type="hidden" name="tags" value={tags.join(",")} />

          {/* Shorts Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="shorts"
              checked={isShort}
              onChange={() => setIsShort(!isShort)}
              className="w-4 h-4 accent-red-500"
            />
            <label htmlFor="shorts" className="text-sm font-medium">
              This is a Short
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-medium py-2 rounded-md hover:bg-red-700 transition"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideoClient;
