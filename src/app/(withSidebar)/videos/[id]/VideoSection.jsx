"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaThumbsDown,
  FaRegThumbsDown,
  FaShare,
  FaRegClock,
  FaCheckCircle,
  FaPlay,
} from "react-icons/fa";
import { addToWatchLater } from "../../user/[id]/home/actions";
import { toggleLikeVideo, toggleSubsribe, dislikeVideo } from "./actions";
import { timeAgo } from "@/app/utils";
import toast from "react-hot-toast";

const VideoSection = ({ videoParam }) => {
  if (!videoParam || !videoParam.video) return null;

  const { video, isSubsribed, hasLiked } = videoParam;
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [stats, setStats] = useState({
    isSubscribed: Boolean(isSubsribed),
    subCount: video.uploader?._count?.subscribers || 0,
    isLiked: Boolean(hasLiked),
    likeCount: video._count?.likes || 0,
    isDisliked: false,
  });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleLike = async () => {
    const nextLiked = !stats.isLiked;
    setStats((prev) => ({
      ...prev,
      isLiked: nextLiked,
      likeCount: nextLiked ? prev.likeCount + 1 : Math.max(0, prev.likeCount - 1),
      isDisliked: false,
    }));

    const formData = new FormData();
    formData.append("videoId", String(video.id));
    formData.append("hasLiked", String(nextLiked));
    await toggleLikeVideo(formData);
  };

  const handleDislike = async () => {
    const nextDisliked = !stats.isDisliked;
    setStats((prev) => ({
      ...prev,
      isDisliked: nextDisliked,
      isLiked: false,
      likeCount: prev.isLiked ? Math.max(0, prev.likeCount - 1) : prev.likeCount,
    }));

    const formData = new FormData();
    formData.append("videoId", String(video.id));
    formData.append("hasLiked", "false");
    await dislikeVideo(formData);
  };

  const handleSubscribe = async () => {
    const nextSubscribed = !stats.isSubscribed;
    setStats((prev) => ({
      ...prev,
      isSubscribed: nextSubscribed,
      subCount: nextSubscribed
        ? prev.subCount + 1
        : Math.max(0, prev.subCount - 1),
    }));

    const formData = new FormData();
    formData.append("uploaderId", String(video.uploader?.id));
    formData.append("isSubscribed", String(nextSubscribed));
    await toggleSubsribe(formData);
  };

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch {
      toast.success("Link ready to share!");
    }
  };

  const videoStreamUrl = video.url?.startsWith("http")
    ? video.url
    : `https://${process.env.SUPABASE_PROJECT_ID ?? "ubeazuoonhgorgpfbbse"}.supabase.co/storage/v1/object/public/Videos/${video.url}`;

  const channelName = video.uploader?.username || video.uploader?.name || "Channel";
  const channelAvatar = video.uploader?.profilePhoto || "/profilePhoto.jpg";

  const desc = video.description || "";
  const hasMultipleLines = (desc.match(/\n/g) || []).length >= 3;
  const isLongText = desc.trim().length > 180;
  const canExpand = Boolean(hasMultipleLines || isLongText);

  return (
    <section className="w-full flex flex-col">
      {/* 1. CINEMA VIDEO PLAYER WITH AMBIENT GLOW */}
      <div className="relative w-full rounded-2xl group">
        {/* Ambient Mode dynamic glow behind video */}
        {video.thumbnail && (
          <div className="absolute inset-0 -z-10 blur-3xl opacity-25 scale-105 pointer-events-none rounded-2xl overflow-hidden transition-opacity duration-700">
            <Image
              src={video.thumbnail}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Video Frame */}
        <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
          <video
            ref={videoRef}
            src={videoStreamUrl}
            poster={video.thumbnail}
            controls
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-contain cursor-pointer"
            onError={() => {
              console.warn("Video stream source not available yet.");
            }}
          />

          {/* Play Overlay (Hidden when playing) */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-black/35 flex items-center justify-center cursor-pointer group-hover:bg-black/20 transition-all duration-200"
            >
              <div className="w-18 h-18 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 pressable shadow-2xl group-hover:scale-105 transition-transform">
                <FaPlay className="text-white text-2xl ml-1" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. VIDEO TITLE */}
      <h1 className="mt-4 text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
        {video.title}
      </h1>

      {/* 3. CHANNEL INFO & INTERACTION BAR */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-y-3 gap-x-4 border-b border-white/5 pb-4">
        {/* Channel Details & Subscribe Button */}
        <div className="flex items-center gap-3">
          <Link
            href={video.uploader?.id ? `/user/${video.uploader.id}/home` : "#"}
            className="shrink-0"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 hover:ring-2 hover:ring-white/30 transition-all">
              <Image
                src={channelAvatar}
                fill
                className="object-cover"
                alt={channelName}
              />
            </div>
          </Link>

          <div className="flex flex-col min-w-0">
            <Link
              href={video.uploader?.id ? `/user/${video.uploader.id}/home` : "#"}
              className="flex items-center gap-1 font-semibold text-white text-sm sm:text-base hover:text-neutral-200 transition-colors"
            >
              <span className="truncate">{channelName}</span>
              <FaCheckCircle className="text-[10px] text-neutral-400 shrink-0" />
            </Link>
            <span className="text-xs text-neutral-400">
              {stats.subCount.toLocaleString()} subscribers
            </span>
          </div>

          <button
            onClick={handleSubscribe}
            type="button"
            className={`ml-3 px-4 sm:px-5 py-2 rounded-full text-sm font-semibold pressable transition-all ${
              stats.isSubscribed
                ? "bg-white/10 hover:bg-white/15 text-white"
                : "bg-white hover:bg-neutral-200 text-black shadow-md"
            }`}
          >
            {stats.isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        {/* Action Buttons: Segmented Like/Dislike, Share, Save */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {/* Unified Like / Dislike Capsule */}
          <div className="flex items-center bg-white/10 hover:bg-white/15 rounded-full h-9 backdrop-blur-sm transition-colors border border-white/5">
            <button
              onClick={handleLike}
              type="button"
              className={`flex items-center gap-2 px-3.5 h-full rounded-l-full hover:bg-white/10 pressable text-sm font-medium transition-colors ${
                stats.isLiked ? "text-blue-400" : "text-white"
              }`}
            >
              {stats.isLiked ? <FaThumbsUp size={15} /> : <FaRegThumbsUp size={15} />}
              <span>{stats.likeCount.toLocaleString()}</span>
            </button>

            <div className="w-px h-5 bg-white/15" />

            <button
              onClick={handleDislike}
              type="button"
              className={`px-3.5 h-full rounded-r-full hover:bg-white/10 pressable text-sm transition-colors ${
                stats.isDisliked ? "text-blue-400" : "text-neutral-300"
              }`}
            >
              {stats.isDisliked ? <FaThumbsDown size={15} /> : <FaRegThumbsDown size={15} />}
            </button>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            type="button"
            className="flex items-center gap-2 px-4 h-9 bg-white/10 hover:bg-white/15 rounded-full text-sm font-medium pressable transition-colors border border-white/5 text-white"
          >
            <FaShare size={13} />
            <span>Share</span>
          </button>

          {/* Save to Watch Later */}
          <form
            action={async (formData) => {
              await addToWatchLater(formData);
              toast.success("Saved to Watch Later");
            }}
          >
            <input type="hidden" value={video.id} name="videoId" />
            <button
              type="submit"
              className="flex items-center gap-2 px-4 h-9 bg-white/10 hover:bg-white/15 rounded-full text-sm font-medium pressable transition-colors border border-white/5 text-white cursor-pointer"
            >
              <FaRegClock size={13} />
              <span>Save</span>
            </button>
          </form>
        </div>
      </div>

      {/* 4. EXPANDABLE YOUTUBE-STYLE DESCRIPTION CARD */}
      <div
        onClick={() => {
          if (canExpand && !isExpanded) setIsExpanded(true);
        }}
        className={`mt-4 p-3.5 rounded-2xl bg-[#212121] hover:bg-[#272727] border border-white/5 transition-colors duration-200 select-text ${
          canExpand && !isExpanded ? "cursor-pointer" : ""
        }`}
      >
        <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white mb-2">
          <span>{video._count?.views?.toLocaleString() || 0} views</span>
          <span>•</span>
          <span>{timeAgo(video.createdAt)}</span>
        </div>

        <p
          className={`text-sm leading-relaxed text-neutral-200 whitespace-pre-wrap ${
            canExpand && !isExpanded ? "line-clamp-3" : ""
          }`}
        >
          {desc || "No description provided."}
        </p>

        {canExpand && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded((prev) => !prev);
            }}
            type="button"
            className="mt-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white transition-colors pressable"
          >
            {isExpanded ? "Show less" : "...more"}
          </button>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
