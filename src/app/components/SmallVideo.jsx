import Image from "next/image";
import { formatDuration, formatImageUrl, timeAgo } from "../utils";
import Link from "next/link";

import { BsThreeDotsVertical } from "react-icons/bs";
export default function SmallVideo({
video
}) {
  console.log(video)
  let {id,duration,createdAt,username,title,profilePhoto,_count,thumbnail}=video
  duration = formatDuration(duration);
  createdAt = timeAgo(createdAt);
  thumbnail=formatImageUrl(thumbnail)
  return (
    <div className="flex mb-4 cursor-pointer hover:bg-gray-100 rounded-lg p-1">
      <div className="relative flex-shrink-0 w-40 h-24">
        <Link href={`/videos/${id}`}>
          <Image
            src={thumbnail}
            alt={title}
            width={100}
            height={100}
            className="w-full h-full object-cover rounded-lg"
          />
        </Link>
        <span className="absolute bottom-1 right-1 bg-black text-white text-[10px] px-1 py-[1px] rounded">
          {duration}
        </span>
      </div>

      <div className="ml-3 flex w-full flex-col justify-between">
        <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-600 mt-1">{username}</p>
        <p className="text-xs text-gray-600">
          {_count.views} • {createdAt}
        </p>
      </div>
      <div className="w-fit p-3 -mt-3">
        <BsThreeDotsVertical className="p-2 size-8 rounded-full hover:bg-gray-300 transition duration-100 cursor-pointer"></BsThreeDotsVertical>
      </div>
    </div>
  );
}
