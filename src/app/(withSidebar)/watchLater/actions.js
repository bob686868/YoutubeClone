"use server"

import { revalidatePath } from "next/cache"
import { removeVideoFromWatchLater } from "@/app/actions/watchLater"


export async function removeFromWatchLater(formData){
    let videoId=Number(formData.get("videoId"))
    await removeVideoFromWatchLater(videoId)
    revalidatePath(`/watchLater/`)
}