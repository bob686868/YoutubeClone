import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import prisma from '../utils'

// let prisma=new PrismaClient()

export async function removeVideoFromWatchHistory(videoId) {
    let cookieStore=await cookies()
    let userId= cookieStore.get('id')
    try {
        let id=await prisma.watchHistory.findUnique({
            where:{
                userId
            }
        }).id
        await prisma.watchHistoryVideo.delete({
            where:{
                watchHistoryId_videoId:{
                    watchHistoryId:id,
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
    let id = Number(cookieStore.get('id').value)
    console.log(id)
    try {
        let watchHistory=await prisma.watchHistory.findUnique({
        where:{userId:id},
        select:{videos:{
                orderBy:{watchedAt:"desc"},
                skip,
                take:15,
                select:{
                video:{
                    select:
                        {uploader:{
                            select:{
                                username:true
                            }
                        },
                        createdAt:true,
                        thumbnail:true,
                        title:true,
                        duration:true,
                        _count:{
                            select:{
                                views:true
                            }
                        }
                    },
                        
                }}
        }}})
       return {watchHistory,status:200} 
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
