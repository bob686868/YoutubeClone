import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

let prisma=new PrismaClient()
export async function addComment(commentedOnId,text){

    try {
        if(!commentedOnId){
            await prisma.comment.create({
                data:{
                    text
                }
            })
        }
        else{
            await prisma.comment.create({
                data:{
                    text,
                    parentComment:{
                        connect:{
                            id:commentedOnId
                        }
                    }
                },
            })
        }
        return {status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
} 

export async function deleteComment(id){
    try {
        await prisma.comment.delete({
            where:{id}
        })
        return {status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}

export async function editComment(id,text){
    try {
        if(!id || !text)return {status:400}
        
        await prisma.comment.update({
            where:{id},
            data:{text}
        })
        return {status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}

export async function getComments({videoId,commentId}){
    try {
        let comments;
        if(!commentId){
            comments=await prisma.comment.findMany({
                where:{
                    videoId
                },
                include:{
                    user
                }
            })
        }
        else{
            comments=await prisma.comment.findMany({
                where:{
                    commentId
                },
                include:{
                    user
                }})
            }
            return {comments,status:200}
        }
     catch (error) {
     console.error(error.message)
     return {status:500}   
    }
}