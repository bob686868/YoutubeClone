"use client";
import React, { useState, useActionState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiImageAdd, BiVideoPlus, BiCheckCircle, BiLoaderAlt } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UploadVideoClient = ({ availableTags = [], serverAction }) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(serverAction, null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isShort, setIsShort] = useState(false);

  const thumbInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Video published successfully!");
      router.push("/");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "video") {
      setVideoFile(file);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
    } else {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f1f1f1] py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto bg-[#181818] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-white/10 rounded-full text-neutral-300 hover:text-white transition-colors pressable"
            >
              <IoArrowBack size={22} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Upload video
              </h1>
              <p className="text-neutral-400 text-xs mt-0.5">
                Share your videos with the YouTube community
              </p>
            </div>
          </div>
        </header>

        <form action={formAction} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: File Pickers */}
          <div className="space-y-6">
            {/* Video File Zone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2.5 text-neutral-300">
                Video File
              </label>
              <input
                type="file"
                name="video"
                accept="video/*"
                className="hidden"
                ref={videoInputRef}
                onChange={(e) => handleFileChange(e, "video")}
                required
              />
              <div
                onClick={() => videoInputRef.current?.click()}
                className={`group aspect-video rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer p-4 ${
                  videoFile
                    ? "border-red-500/60 bg-red-500/5"
                    : "border-white/15 bg-[#121212] hover:border-white/30"
                }`}
              >
                {videoFile ? (
                  <div className="text-center">
                    <BiCheckCircle className="text-red-500 size-12 mx-auto mb-2" />
                    <p className="text-sm font-semibold truncate max-w-[220px] text-white">
                      {videoFile.name}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      {(videoFile.size / (1024 * 1024)).toFixed(1)} MB • Click to change
                    </p>
                  </div>
                ) : (
                  <>
                    <BiVideoPlus className="size-12 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
                    <p className="text-sm font-semibold text-neutral-300 mt-2">
                      Select video to upload
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">MP4, WebM, or MOV</p>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Zone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2.5 text-neutral-300">
                Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                className="hidden"
                ref={thumbInputRef}
                onChange={(e) => handleFileChange(e, "thumb")}
                required
              />
              {!thumbnailPreview ? (
                <div
                  onClick={() => thumbInputRef.current?.click()}
                  className="w-48 aspect-video rounded-2xl border-2 border-dashed border-white/15 bg-[#121212] flex flex-col items-center justify-center cursor-pointer hover:border-white/30 transition-all"
                >
                  <BiImageAdd className="size-8 text-neutral-500" />
                  <span className="text-xs font-semibold text-neutral-400 mt-1.5">
                    Upload image
                  </span>
                </div>
              ) : (
                <div className="relative w-48 aspect-video rounded-2xl overflow-hidden group border border-white/10 shadow-lg">
                  <Image
                    src={thumbnailPreview}
                    fill
                    className="object-cover"
                    alt="Thumbnail preview"
                  />
                  <div
                    onClick={() => thumbInputRef.current?.click()}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  >
                    <span className="text-xs font-bold text-white">Change</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Metadata Inputs */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-300">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a title that describes your video"
                className="w-full bg-[#121212] border border-white/10 rounded-xl p-3 text-sm text-white placeholder-neutral-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-300">
                Description
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell viewers about your video"
                rows={4}
                className="w-full bg-[#121212] border border-white/10 rounded-xl p-3 text-sm text-white placeholder-neutral-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-300">
                Category Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all pressable ${
                      selectedTags.includes(tag)
                        ? "bg-red-600 border-red-600 text-white shadow-sm"
                        : "bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <input type="hidden" name="tags" value={selectedTags.join(",")} />
              <input type="hidden" name="isShort" value={isShort.toString()} />
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-[#121212] rounded-xl border border-white/5">
              <input
                type="checkbox"
                id="isShort"
                checked={isShort}
                onChange={() => setIsShort(!isShort)}
                className="size-4 accent-red-600 cursor-pointer"
              />
              <label
                htmlFor="isShort"
                className="text-xs sm:text-sm font-medium text-neutral-300 cursor-pointer select-none"
              >
                Upload as a YouTube Short
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3.5 rounded-full pressable transition-all shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <>
                  <BiLoaderAlt className="animate-spin size-5" />
                  <span>Publishing video...</span>
                </>
              ) : (
                "Publish Video"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideoClient;
