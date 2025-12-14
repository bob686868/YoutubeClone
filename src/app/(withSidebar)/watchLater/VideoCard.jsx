import WatchLaterButton from "@/app/components/WatchLaterButton";
import { formatDuration, timeAgo,formatImageUrl } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import {removeFromWatchLater} from '../watchLater/actions'
export default function VideoCard({ video }) {
    
  return (
    <div className="flex flex-col text-neutral-200 bg-neutral-950 hover:bg-neutral-900 rounded-md duration-75  gap-2 cursor-pointer h-fit">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <Link href={`/videos/${video.id}`}>
          <Image
            src={formatImageUrl(video.thumbnail)}
            width={200}
            height={200}
            alt={video.title}
            className="object-cover w-full h-full"
            />
          </Link>
        
        <span className="absolute bottom-1  right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
          {formatDuration(video.duration)}
        </span>
      </div>
      <div className="flex  px-2 pb-2 flex-col  sm:items-start sm:justify-between flex-1">

          <div>
            <h3 className="font-semibold text-md sm:text-base line-clamp-2">{video.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{video.uploader.username}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{video._count.views} views • {timeAgo(video.createdAt)}</p>
          </div>
      </div>

    </div>
  );
}
