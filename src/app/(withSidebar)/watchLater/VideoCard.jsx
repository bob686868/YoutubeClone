import WatchLaterButton from "@/app/components/WatchLaterButton";
import { formatDuration, timeAgo,formatImageUrl } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import {removeFromWatchLater} from '../watchLater/actions'
export default function VideoCard({ video }) {
    
  return (
    <div className="flex flex-col  bg-zinc-950 hover:bg-zinc-900 rounded-md duration-75 sm:flex-row gap-3 sm:gap-5 cursor-pointer">
      <div className="relative w-full sm:w-64 aspect-video rounded-xl overflow-hidden">
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
      <div className="flex flex-col pt-2 items-center sm:items-start sm:justify-between flex-1">

          <div>
            <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{video.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{video.uploader.username}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{video._count.views} views • {timeAgo(video.createdAt)}</p>
          </div>
      </div>
        <form action={removeFromWatchLater} className="text-center">
          <input type="hidden" name="videoId" value={video.id} />
          <button className="mt-6 mr-2 ml-20 inline-block mx-auto  text-red-400 cursor-pointer hover:text-red-600" type="submit">
            <FaRegTrashAlt />
          </button>
        </form>
    </div>
  );
}
