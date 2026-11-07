import React from "react";
import Image from "next/image";
import Link from "next/link";

const ChannelCard = ({ subscribedTo }) => {
  if (!subscribedTo) return null;
  const { username, _count, profilePhoto, id } = subscribedTo;

  return (
    <div className="flex flex-col items-center bg-[#1c1c1c] hover:bg-[#222222] text-[#f1f1f1] rounded-2xl p-5 border border-white/5 transition-all duration-200 group">
      <Link href={`/user/${id}/home`} className="relative w-20 h-20 rounded-full overflow-hidden mb-3 ring-2 ring-white/10 group-hover:ring-white/30 transition-all">
        <Image
          fill
          src={profilePhoto || "/profilePhoto.jpg"}
          alt={username || "Channel"}
          className="object-cover"
        />
      </Link>

      <h3 className="text-sm font-semibold text-center truncate max-w-full text-white">
        {username}
      </h3>
      <p className="text-xs text-neutral-400 mt-0.5">
        {_count?.subscribers || 0} subscribers
      </p>

      <Link
        href={`/user/${id}/home`}
        className="mt-4 bg-white/10 hover:bg-white/20 active:bg-white/25 text-xs font-semibold text-white px-4 py-1.5 rounded-full pressable transition-colors"
      >
        View Channel
      </Link>
    </div>
  );
};

export default ChannelCard;
