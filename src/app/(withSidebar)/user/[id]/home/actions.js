"use server"

import { addVideoToWatchLater } from "@/app/actions/watchLater"
export async function addToWatchLater(formData){
    console.log('adding from frontend to watch later')
    let videoId=Number(formData.get('videoId'))
    await addVideoToWatchLater(videoId)
    console.log('addded video to watchlater frontend')
}