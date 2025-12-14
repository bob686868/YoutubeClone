import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import prisma from '../utils'

// let prisma=new PrismaClient()

export async function createPlaylist(name){
    try {
      await prisma.playlist.create({
        data:{
            name
        }
      })  

    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
export async function deletePlaylist(id){
    try {
        prisma.playlist.delete({
            where:{
                id
            }
        })
        return {status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
export async function addVideoToPlaylist(videoId,playlistId){
    try {
        await prisma.playlist.update({
            where:{id:playlistId},
            data:{
                videos:{
                    connect:{
                        id:videoId
                    }}
                }
        })
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
export async function removeVideoFromPlaylist(videoId,playlistId){
    try {
        await prisma.playlist.update({
            where:{id:playlistId},
            data:{
                videos:{
                    disconnect:{id:videoId}
                }
            }
        })
        return {status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
export async function getVideosOfAPlaylist(id){
    try {
        let playlist=await prisma.user.findUnique({
            where:{id},
            include:{videos:{include:{uploader:true}}}
        })
        return {playlist,status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
