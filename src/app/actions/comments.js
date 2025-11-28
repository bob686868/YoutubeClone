import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

let prisma=new PrismaClient()

export async function addComment(text,videoId){
    let cookieStore=await cookies()
    videoId=Number(videoId)
    let userId=Number(cookieStore.get('id').value)
    try {
           await prisma.comment.create({
                data:{
                    text,
                    userId,
                    videoId
                },
            })
            revalidatePath(`/videos/${videoId}`)
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
export async function addReply(text,commentId){
    console.log("entered add reply:")
    console.log(text)
    let cookieStore=await cookies()
    let userId=Number(cookieStore.get('id').value)

    try {
            await prisma.comment.create({
                data:{
                    text,
                    userId,
                    commentId
                }
            })        
         
        console.log("added reply")
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


export async function getComments({videoId}){
    console.log('entered get comments')
    let cookieStore=await cookies()
    let userId =Number(cookieStore.get('id').value)
    try {
            let comments=await prisma.comment.findMany({
                where:{
                    videoId,
                    commentId:null
                },
                select:{
                    id:true,
                    text:true,
                    createdAt:true,
                    user:true,
                    _count:{
                        select:{
                            subcomments:true,
                            likes:true
                        },
                        
                    },
                    likes:{
                        where:{userId},
                        select:{id:true},
                        take:1
                    }
                }
            })
            console.log("got comments")
            let formatted=comments.map((c)=>({
                id:c.id,
                text:c.text,
                createdAt:c.createdAt,
                user:c.user,
                replyCount:c._count.subcomments,
                likedByMe: c.likes.length>0,
                likesCount:c._count.likes
            }
        ))
            console.log("got formatted comments")
            return {comments:formatted,status:200}
        } catch (error) {
            console.error(error.message)
            return {status:500}   
            }
    }

export async function getReplies({commentId}){
        let cookieStore=await cookies()
        let userId =Number(cookieStore.get('id').value)
        try{
            let replies=await prisma.comment.findMany({
                where:{
                    commentId
                },
                select:{
                    id:true,
                    text:true,
                    createdAt:true,
                    _count:{
                        select:{likes:true}
                    },
                    user:{
                        select:{id:true,username:true,profilePhoto:true}
                    },
                    likes:{
                        where:{userId},
                        select:{id:true},
                        take:1
                    }
                }

            })
            let formatted=replies.map((r)=>({
                id:r.id,
                text:r.text,
                createdAt:r.createdAt,
                user:r.user,
                likedByMe:r.likes.length>0,
                likesCount:c._count.likes
            }))
            return {comments:formatted,status:200}
        } catch (error) {
        console.error(error.message)
        return {status:500}   
        }
}