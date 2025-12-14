import React from 'react'
import VideoSection from './VideoSection'
import { getVideo, getVideos } from '@/app/actions/videos'
import RecommendedSection from './RecommendedSection'
import CommentSection from './CommentSection'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const page = async ({params}) => {
  let cookieStore=await cookies()
  let userId=cookieStore.get("id")
  if(!userId){
    redirect("/login")
  }
  let {videos}=await getVideos()
    let {id}=await params
    let video = await getVideo(id)
    videos=videos.filter((v)=>v.id!=id)
  return (
    <div className='bg-neutral-950   text-neutral-100 mt-8'>
      <VideoSection videoParam={video}/>
      <RecommendedSection videos={videos}></RecommendedSection>
      <CommentSection videoId={id}></CommentSection>
        {id}
      
    </div>
  )
}

export default page
