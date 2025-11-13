"use server"

import { revalidatePath } from "next/cache"
import { removeVideoFromWatchLater } from "@/app/actions/watchLater"


export async function removeFromWatchLater(formData){
    console.log('remove from watch later from front end')
    let videoId=Number(formData.get("videoId"))
    await removeVideoFromWatchLater(videoId)
    revalidatePath(`/watchLater/`)
}