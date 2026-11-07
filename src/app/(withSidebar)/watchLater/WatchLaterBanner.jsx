import React from "react";
import { Play, Shuffle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WatchLaterBanner({
  firstVideo,
  owner = "You",
  count = 0,
  title = "Playlist",
}) {
  const details = `${count} ${count === 1 ? "video" : "videos"} • Updated recently`;

  return (
    <section className="watchlater-banner relative w-full rounded-2xl overflow-hidden text-white border border-white/5">
      <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between gap-6 p-6 sm:p-8">
        {/* Thumbnail preview */}
        <div className="w-full sm:w-[320px] md:w-[260px] aspect-video flex-shrink-0 rounded-xl overflow-hidden relative shadow-2xl bg-black/40 ring-1 ring-white/10">
          {firstVideo?.thumbnail ? (
            <Image
              fill
              src={firstVideo.thumbnail}
              alt={firstVideo.title || "Playlist thumbnail"}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 text-neutral-500 text-xs">
              No videos yet
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {title}
          </h1>

          <div className="mt-1 space-y-0.5">
            <p className="text-neutral-300 text-sm font-medium">{owner}</p>
            <p className="text-neutral-400 text-xs">{details}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
            {firstVideo?.id ? (
              <Link
                href={`/videos/${firstVideo.id}`}
                className="play-btn py-2 px-6 rounded-full flex items-center justify-center gap-2 text-sm font-semibold pressable"
              >
                <Play className="w-4 h-4 fill-current" />
                Play all
              </Link>
            ) : (
              <button
                disabled
                className="play-btn py-2 px-6 rounded-full flex items-center justify-center gap-2 text-sm font-semibold opacity-50 cursor-not-allowed"
              >
                <Play className="w-4 h-4 fill-current" />
                Play all
              </button>
            )}

            <button
              type="button"
              className="shuffle-btn py-2 px-6 rounded-full flex items-center justify-center gap-2 text-sm font-semibold pressable"
            >
              <Shuffle className="w-4 h-4" />
              Shuffle
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
