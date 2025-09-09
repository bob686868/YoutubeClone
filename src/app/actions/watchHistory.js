import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

let prisma=new PrismaClient()

export async function removeVideoFromWatchHistory(videoId) {
    let cookieStore=await cookies()
    let userId= cookieStore.get('id')
    try {
        await prisma.watchHistoryVideo.delete({
            where:{
                watchHistoryId_videoId:{
                    watchHistoryId:userId,
                    videoId
                }
            }
        })
       return {status:200} 
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
export async function getVideosOfWatchHistory(skip) {
    let cookieStore=await cookies()
    let id = cookieStore.get('id')
    try {
        let watchHistory=await prisma.watchHistory.findMany({
        where:{id},
        include:{videos:{
                orderBy:{watchedAt:"desc"},
                skip,
                take:15,
                include:{
                video:{
                    include:{uploader:true}
                }}
        }}})
       return {watchHistory,status:200} 
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
