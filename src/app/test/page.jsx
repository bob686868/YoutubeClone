import React from 'react'
import { getVideos } from '../actions/videos'
import SmallVideo from '../components/SmallVideo'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
const page = async () => {
    let cookieStore=await cookies()
    let userId=cookieStore.get("id")
    if(!userId){
      redirect("/login")
    }
    let {videos}=await getVideos()
    let thumnnailUrl=(t)=>"/thumbnails/thumbnail"+String(t)+".jpg"
  return (
    <div className='bg-white text-black'>
      {videos.length>0 && videos.map((v)=>(
        <SmallVideo key={v.id} id={v.id} thumbnail={thumnnailUrl(v.thumbnail)} title={v.title} name={v.uploader.username} createdAt={v.createdAt} ></SmallVideo>
      ))}
    </div>
  )
}

export default page
