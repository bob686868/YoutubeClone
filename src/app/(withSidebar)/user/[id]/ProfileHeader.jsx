import React from "react";
import { getUserInfo } from "@/app/actions/users";
import Link from "next/link";
import Image from "next/image";

const ProfileHeader = async ({ id, activeTab }) => {
  const tabs = ["home", "videos", "shorts", "posts"];
  const tabsCapitalized = ["Home", "Videos", "Shorts", "Posts"];

  const { user, profilePhoto } = await getUserInfo(Number(id));
  if (!user) return null;

  return (
    <div className="pt-4 pb-2 border-b border-white/10">
      {/* Channel Header Banner info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 py-6">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 ring-2 ring-white/10 shadow-xl">
          <Image
            fill
            src={profilePhoto || "/profilePhoto.jpg"}
            alt={user.username || "User"}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {user.username}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            @{user.username.toLowerCase()} • {user._count?.subscribers || 0} subscribers
          </p>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="mt-2">
        <ul className="flex space-x-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab, index) => (
            <Link
              href={`/user/${id}/${tab}`}
              key={tab}
              className={`cursor-pointer pb-3 text-sm transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-2 border-white text-white font-semibold"
                  : "text-neutral-400 hover:text-white font-medium"
              }`}
            >
              {tabsCapitalized[index]}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileHeader;
