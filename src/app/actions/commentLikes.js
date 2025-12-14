import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import prisma from '../utils'


// let prisma=new PrismaClient()

export async function toggleLike(commentId,hasLiked){
    console.log(hasLiked)
    console.log(commentId)
    let cookieStore=await cookies()
    let id=Number(cookieStore.get('id').value) 
    try {
        if(!hasLiked){
            await prisma.commentLike.create({
                data:{
                        userId:id,
                        commentId
                }
            })
            console.log('added commentLike successfully')
        }
        else{
            await prisma.commentLike.delete({
                where:{
                    userId_commentId:{

                        userId:id,
                        commentId
                    }
                }
            })
            console.log('deleted commentLIke successfully')

        }
        
        
    } catch (error) {
        console.log(error.message)
    }
}

export async function getLikeState(commentId){
    let cookieStore=await cookies()

    let id =Number(cookieStore.get('id').value)
    try {
        let commentLike=await prisma.commentLike.findUnique({
            where:{
                userId:id,
                commentId
            }
        })
        if(!commentLike)return{hasLiked:false}
        return {hasLiked:true}
    } catch (error) {
        console.log(error.message)
        return {hasLiked:false}
    }

}