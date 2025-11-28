// components/ChannelCard.jsx
import { formatProfileImageUrl } from "@/app/utils";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ChannelCard = ({ subscribedTo }) => {
  let { username, _count, profilePhoto, id } = subscribedTo;
  return (
    <div className="flex flex-col items-center  dark:bg-neutral-800 text-neutral-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer w-56 sm:w-64">
      <Image
        width={50}
        height={50}
        src={formatProfileImageUrl(profilePhoto)}
        className="w-20 h-20 rounded-full object-cover mb-3"
      />
      <h3 className="text-base font-semibold text-center truncate">
        {username}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {_count.subscribers} subscribers
      </p>

      <Link
        href={`/user/${id}/home`}
        className="mt-3 cursor-pointer bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-sm text-gray-700 dark:text-gray-200 px-4 py-1.5 rounded-full transition-all"
      >
        View Channel
      </Link>
    </div>
  );
};

export default ChannelCard;
