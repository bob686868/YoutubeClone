import { getVideosOfWatchHistory } from '@/app/actions/watchHistory'
import React from 'react'
import VideoGrid from '../watchLater/VideoGrid'

const page=async () => {
  let {watchHistory}=await getVideosOfWatchHistory()
  let videos=watchHistory.videos
  let formattedVideos=videos.map((v)=>v.video)
  console.log(formattedVideos)
  console.log('-=-gfs=fsg')
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <div className="flex">
        <main className="flex-1 md:ml-5 p-4 sm:p-6 mt-5">
          {/* <h1 className="text-xl sm:text-2xl font-semibold mb-4">
            Liked Videos
          </h1> */}
          <VideoGrid title={"Watch History"} videos={formattedVideos} />
        </main>
      </div>
    </div>
  )
}

export default page