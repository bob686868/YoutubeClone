import { formatDuration, timeAgo } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import WatchLaterButton from "../../../../components/WatchLaterButton";

export default function VideoCard({ video }) {
  function formatImageUrl(n) {
    return `/thumbnails/thumbnail${n}.jpg`;
  }
  let { id, thumbnail, title, duration, createdAt, username, _count } = video;
  return (
    <div className="w-full max-w-[360px] cursor-pointer">
      {/* Thumbnail */}
      <Link href={`/videos/${id}`}>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <Image
            src={formatImageUrl(thumbnail)}
            alt="video image"
            fill
            className="object-cover transition-transform duration-300 hover:scale-[1.03]"
          />
          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[0.75rem] px-1.5 py-0.5 rounded">
            {formatDuration(duration)}
          </span>
        </div>
      </Link>

      {/* Video Info */}
      <div className="flex mt-3">
        {/* Channel Avatar Placeholder (YouTube hides this on profile page, but we keep it optional) */}
        {/* <Image src={avatar} width={36} height={36} alt={channelName} className="rounded-full mr-3" /> */}

        <div className="flex flex-col">
          <h3
            className="text-sm font-medium  leading-snug  line-clamp-2"
            title={title}
          >
            {title}
          </h3>

          <div className="text-[0.875rem] text-gray-400  flex flex-1 justify-between">
            <div>
              <p className="hover:text-white transition-colors">{username}</p>
              <p className="text-gray-400 text-sm">
                {_count.views} views • {timeAgo(createdAt)}
              </p>
            </div>
            <WatchLaterButton videoId={id}></WatchLaterButton>
          </div>
        </div>
      </div>
    </div>
  );
}
