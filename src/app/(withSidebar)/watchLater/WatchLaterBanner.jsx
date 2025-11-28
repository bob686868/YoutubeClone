import React from "react";
import { Play, Shuffle, Download, MoreVertical } from "lucide-react";
import Image from "next/image";
import { formatImageUrl } from "@/app/utils";

export default function WatchLaterBanner({
  firstVideo,
  owner = "Ibrahim Zakaria",
  count,
  title
}) {
  let details = `${count} videos  •  Updated today `;
  console.log(firstVideo);
  return (
    <section
      className={`watchlater-banner relative w-full rounded-2xl overflow-hidden text-white ${
        !firstVideo ? "h-60" : null
      }`}
    >
      <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 p-5 sm:p-8">
        {/* Thumbnail */}
        <div className="w-full sm:w-[400px] lg:w-[275px] flex-shrink-0 rounded-xl overflow-hidden">
          {firstVideo && (
            <Image
              src={formatImageUrl(firstVideo.thumbnail)}
              width={150}
              height={150}
              alt="watch later thumbnail"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
          <h1 className="text-[26px] sm:text-[30px] font-semibold leading-tight">
            {title}
          </h1>

          <div className="mt-1 space-y-0.5">
            <p className="text-gray-300 text-sm sm:text-base font-medium">
              {owner}
            </p>
            <p className="text-gray-400 text-sm">{details}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 mt-6 w-full sm:w-auto">
            <button className="bg-white text-black font-medium py-2 px-6 rounded-full flex items-center cursor-pointer justify-center gap-2 hover:bg-gray-200 transition">
              <Play className="w-4 h-4" />
              Play all
            </button>

            <button className="bg-white/10 text-white cursor-pointer font-medium py-2 px-6 rounded-full flex items-center justify-center gap-2 border border-white/10 hover:bg-white/20 transition">
              <Shuffle className="w-4 h-4" />
              Shuffle
            </button>
          </div>
        </div>

        {/* Right icons (visible only on large screens) */}
        <div className="hidden lg:flex flex-col gap-3 absolute right-5 top-5">
          <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
