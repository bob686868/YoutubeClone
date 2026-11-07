import React from "react";
import { searchVideos } from "@/app/actions/videos";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { formatDuration, timeAgo } from "@/app/utils";
import WatchLaterButton from "@/app/components/WatchLaterButton";
import { IoSearchOutline } from "react-icons/io5";

const SearchResultsPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const searchText = resolvedParams?.searchQuery || "";
  const { videos = [] } = await searchVideos(searchText);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f1f1f1] px-4 sm:px-8 py-6">
      <div className="max-w-5xl mx-auto">
        {/* Header summary */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
          <p className="text-sm text-neutral-400">
            About {videos.length} {videos.length === 1 ? "result" : "results"} for{" "}
            <span className="text-white font-semibold">"{searchText}"</span>
          </p>
        </div>

        {/* Results List */}
        {videos.length > 0 ? (
          <div className="flex flex-col gap-6">
            {videos.map((video) => {
              const formattedDuration = video.duration
                ? formatDuration(video.duration)
                : "12:45";
              const viewsText = video._count?.views
                ? video._count.views.toLocaleString()
                : "0";
              const channelName =
                video.uploader?.username || video.uploader?.name || "Channel";
              const channelAvatar =
                video.uploader?.profilePhoto || "/profilePhoto.jpg";

              return (
                <div
                  key={video.id}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-5 group cursor-pointer"
                >
                  {/* Left: Thumbnail */}
                  <Link
                    href={`/videos/${video.id}`}
                    className="relative w-full sm:w-80 md:w-96 aspect-video rounded-2xl overflow-hidden bg-[#1c1c1c] shrink-0 ring-1 ring-white/5 shadow-md"
                  >
                    <Image
                      src={video.thumbnail || "/thumbnails/thumbnail1.jpg"}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 384px"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
                    />
                    <span className="absolute bottom-1.5 right-1.5 bg-black/85 text-white text-xs font-semibold px-1.5 py-0.5 rounded tracking-tight">
                      {formattedDuration}
                    </span>
                  </Link>

                  {/* Right: Info */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/videos/${video.id}`} className="flex-1">
                        <h2 className="text-base sm:text-lg font-semibold text-white line-clamp-2 leading-snug group-hover:text-neutral-200 transition-colors">
                          {video.title}
                        </h2>
                      </Link>
                      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <WatchLaterButton videoId={video.id} />
                      </div>
                    </div>

                    <div className="text-xs text-neutral-400 mt-1">
                      {viewsText} views • {timeAgo(video.createdAt)}
                    </div>

                    {/* Channel */}
                    <Link
                      href={video.uploader?.id ? `/user/${video.uploader.id}/home` : "#"}
                      className="flex items-center gap-2.5 my-3 py-1 group/channel w-fit"
                    >
                      <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10">
                        <Image
                          src={channelAvatar}
                          fill
                          sizes="24px"
                          alt={channelName}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs text-neutral-300 group-hover/channel:text-white transition-colors flex items-center gap-1 font-medium">
                        {channelName}
                        <FaCheckCircle className="text-[10px] text-neutral-500" />
                      </span>
                    </Link>

                    {/* Description snippet */}
                    {video.description && (
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-neutral-400">
            <IoSearchOutline size={56} className="text-neutral-600 mb-4" />
            <h3 className="text-lg font-semibold text-white">No results found</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Try different keywords or check for spelling errors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
