"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { formatDuration, timeAgo } from "../utils";
import WatchLaterButton from "./WatchLaterButton";

const Video = ({ video, isSidebar = false }) => {
  if (!video) return null;

  const {
    id,
    uploader,
    title,
    createdAt,
    thumbnail,
    duration,
    _count,
  } = video;

  const formattedDuration = duration ? formatDuration(duration) : "12:45";
  const viewsText = _count?.views != null ? _count.views.toLocaleString() : "0";
  const channelName = uploader?.username || uploader?.name || "Channel";
  const avatarUrl = uploader?.profilePhoto || "/profilePhoto.jpg";

  // Sidebar Variant: Compact Horizontal Layout (For Video Page)
  if (isSidebar) {
    return (
      <div className="flex gap-3 group cursor-pointer w-full items-start">
        {/* Thumbnail Container */}
        <Link
          href={`/videos/${id}`}
          className="relative flex-none w-40 sm:w-44 aspect-video bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm shrink-0"
        >
          <Image
            alt={title}
            src={thumbnail || "/thumbnails/thumbnail1.jpg"}
            fill
            sizes="176px"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
          />
          <div className="absolute bottom-1 right-1 bg-black/85 text-white text-[10px] font-semibold px-1 py-0.5 rounded tracking-tight">
            {formattedDuration}
          </div>
        </Link>

        {/* Info Section */}
        <div className="flex flex-col min-w-0 pr-1 flex-1">
          <Link href={`/videos/${id}`}>
            <h4 className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-neutral-200 transition-colors">
              {title}
            </h4>
          </Link>

          <div className="flex flex-col mt-1">
            <Link
              href={uploader?.id ? `/user/${uploader.id}/home` : "#"}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span className="truncate">{channelName}</span>
              <FaCheckCircle className="text-[10px] text-neutral-500 shrink-0" />
            </Link>

            <div className="text-[11px] text-neutral-400 mt-0.5">
              {viewsText} views • {timeAgo(createdAt)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Variant: Vertical Card (For Home Feed Grid)
  return (
    <div className="flex flex-col w-full group">
      {/* Thumbnail */}
      <Link
        href={`/videos/${id}`}
        className="relative aspect-video w-full mb-3 rounded-2xl overflow-hidden bg-[#1a1a1a] shadow-sm ring-1 ring-white/5"
      >
        <Image
          alt={title}
          src={thumbnail || "/thumbnails/thumbnail1.jpg"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
        />
        <div className="absolute bottom-2 right-2 bg-black/85 text-white text-xs font-semibold px-1.5 py-0.5 rounded tracking-tight">
          {formattedDuration}
        </div>
      </Link>

      {/* Content Row */}
      <div className="flex gap-3 items-start">
        {/* Avatar */}
        <Link
          href={uploader?.id ? `/user/${uploader.id}/home` : "#"}
          className="shrink-0"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/10 hover:ring-2 hover:ring-white/30 transition-all">
            <Image
              alt={channelName}
              src={avatarUrl}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
        </Link>

        {/* Text Metadata */}
        <div className="flex flex-col flex-1 min-w-0">
          <Link href={`/videos/${id}`}>
            <h3 className="font-semibold text-white text-[15px] line-clamp-2 leading-snug group-hover:text-neutral-200 transition-colors">
              {title}
            </h3>
          </Link>

          <div className="mt-1 flex flex-col">
            <Link
              href={uploader?.id ? `/user/${uploader.id}/home` : "#"}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span className="truncate">{channelName}</span>
              <FaCheckCircle className="text-[10px] text-neutral-500 shrink-0" />
            </Link>

            <span className="text-xs text-neutral-400 mt-0.5">
              {viewsText} views • {timeAgo(createdAt)}
            </span>
          </div>
        </div>

        {/* Action Button (Three dots on hover) */}
        <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <WatchLaterButton videoId={id} />
        </div>
      </div>
    </div>
  );
};

export default Video;
