import React from 'react'
import { getUserInfo } from '@/app/actions/users';
import Link from 'next/link';
import Image from 'next/image';
import { formatProfileImageUrl } from '@/app/utils';


const ProfileHeader =async ({id,activeTab}) => {
const tabs = ["home", "videos", "shorts", "posts"];
const tabsCapitalized = ["Home", "Videos", "Shorts", "Posts"];

    // let headerList=await headers()
    // let host=headerList.get('host')
    // console.log(headerList)
    // console.log(host)
    let {user}=await getUserInfo(Number(id))
    console.log(user)
  return (
    <div>
      <div className="flex items-center py-6 text-neutral-200 mt-5">
        <Image
          width={100}
          height={100}
          src={formatProfileImageUrl(user.profilePhoto)}
          className="w-20 h-20 rounded-full mr-4"
          />
        <div>
          <h1 className="text-2xl font-semibold">{user.username}</h1>
          <p className="text-neutral-200">{user._count.subscribers} subscribers</p>
        </div>
      </div>
            <div className="border-b border-gray-300">
        <ul className="flex space-x-8">
          {tabs.map((tab,index) => (
            <Link
             href={`/user/${id}/${tab}`}
              key={tab}
              className={`cursor-pointer pb-3  text-sm font-medium ${
                activeTab === tab ? "border-b-2 text-neutral-100 border-neutral-100 font-semibold" : "text-gray-500"
              }`}
            >
              {tabsCapitalized[index]}
            </Link>
          ))}
        </ul>
      </div>
      {/* {children} */}
    </div>
  )
}

export default ProfileHeader
