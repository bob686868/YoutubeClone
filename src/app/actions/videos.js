import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

let prisma=new PrismaClient()
export async function addVideo(title,description,thumbnail,duration,tags=null,isShort=false){
    let cookieStore =await cookies()
    let id=cookieStore.get('id')
    try {
        if(!title || !description || !thumbnail || !duration){
            return {status:400,
                message:'data provided isnt enough'
            }
        }
        await prisma.video.create({data:{
            title,description,duration,thumbnail,isShort,
            user:{
                connect:{id}
            },
            tags:{
                connect:tags.map((name)=>({name}))
            }
        }})

        return {
            status:201
        }
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}

export async function deleteVideo(id){
    try {
        await prisma.video.delete({
            where:{id}
        })
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}

export async function getVideos(skip){
    try {
        videos=await prisma.video.findMany({
            include:{
                uploader
            },
            skip,
            take:15
        })
        return {status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}        
    }
}

export async function getVideo(videoId){
    let cookieStore=await cookies()
    let userId=Number(cookieStore.get('id'))
    try {
        let video =await prisma.video.findUnique({
            where:{
                id:videoId
            },
            include:{uploader}
    })
    if(!video)return {status:500}

    await prisma.watchHistoryVideo.upsert({
        where:{
            watchHistoryId_videoId:{
                watchHistoryId:userId,
                videoId
            }
        },
        update:{
            watchetAt:new Date()
        },
        create:{
            watchHistoryId:userId,
            videoId
        }
    })
    return {video,status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}