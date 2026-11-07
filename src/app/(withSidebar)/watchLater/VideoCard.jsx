import React from "react";
import { formatDuration, timeAgo } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function VideoCard({ video }) {
  if (!video) return null;

  const durationFormatted = video.duration
    ? formatDuration(video.duration)
    : "12:45";
  const viewsText = video._count?.views
    ? video._count.views.toLocaleString()
    : "0";
  const channelName = video.uploader?.username || "Channel";

  return (
    <div className="flex flex-col group cursor-pointer w-full">
      {/* Thumbnail */}
      <Link
        href={`/videos/${video.id}`}
        className="relative aspect-video w-full mb-3 rounded-2xl overflow-hidden bg-[#1c1c1c] ring-1 ring-white/5 shadow-sm"
      >
        <Image
          src={video.thumbnail || "/thumbnails/thumbnail1.jpg"}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
        />
        <span className="absolute bottom-1.5 right-1.5 bg-black/85 text-white text-xs font-semibold px-1.5 py-0.5 rounded tracking-tight">
          {durationFormatted}
        </span>
      </Link>

      {/* Info */}
      <div className="flex flex-col px-1 min-w-0">
        <Link href={`/videos/${video.id}`}>
          <h3 className="font-semibold text-white text-[15px] line-clamp-2 leading-snug group-hover:text-neutral-200 transition-colors">
            {video.title}
          </h3>
        </Link>
        <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
          <span>{channelName}</span>
          <FaCheckCircle className="text-[10px] text-neutral-500" />
        </p>
        <p className="text-xs text-neutral-400 mt-0.5">
          {viewsText} views • {timeAgo(video.createdAt)}
        </p>
      </div>
    </div>
  );
}
