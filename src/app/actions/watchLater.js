import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

let prisma=new PrismaClient()

export async function addVideoToWatchLater(videoId) {
    let cookieStore=await cookies()
    console.log(videoId )
    console.log('==-=-=-=-=-=-')
    let userId=Number(cookieStore.get('id').value)
    console.log('adding video to watch later backend')
    try {
        await prisma.watchLater.update({
            where:{userId},
            data:{
                videos:{
                    connect:{id:videoId}
                }
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
    let userId= Number(cookieStore.get('id').value)
    try {

        await prisma.watchLater.update({
            where:{
                userId
            },
            data:{
                videos:{
                    disconnect:{
                       id:videoId 
                    }
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
export async function getVideosOfWatchLater() {
    let cookieStore=await cookies()
    let id = Number(cookieStore.get('id').value)
    try {
        let watchLater=await prisma.watchLater.findUnique({
        where:{userId:id},
        include:{
             videos:{
                    include:{uploader:true,
                        _count:{
                        select:{
                            views:true
                        }
                    }
                },
            },
               },

        })
        console.log(watchLater)
       return {watchLater,status:200} 
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
