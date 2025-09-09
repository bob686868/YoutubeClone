import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

let prisma=new PrismaClient()

export async function addVideoToWatchLater(videoId) {
    let cookieStore=await cookies()
    let userId=cookieStore.get('id')
    try {
        await prisma.watchLaterVideo.create({
            data:{
                watchLaterId:userId,
                videoId
            }            
        })
       return {status:200} 
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
export async function removeVideoFromWatchLater(videoId) {
    let cookieStore=await cookies()
    let userId= cookieStore.get('id')
    try {
        await prisma.watchLaterVideo.delete({
            where:{
                watchLaterId_videoId:{
                    watchLaterId:userId,
                    videoId
                }
            }
        }
)
       return {status:200} 
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
export async function getVideosOfWatchLater(skip) {
    let cookieStore=await cookies()
    let id = cookieStore.get('id')
    try {
        let watchLater=await prisma.watchLater.findUnique({
        where:{id},
        include:{
             videos:{
                    include:{uploader:true}
                },
                skip,
                take:15,
                orderBy:{
                    watchedAt
                }
               },

        })
       return {watchLater,status:200} 
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
