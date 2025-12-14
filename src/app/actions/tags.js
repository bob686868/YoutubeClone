import { PrismaClient } from "@prisma/client";
import prisma from '../utils'

// let prisma=new PrismaClient()

export async function getTags(){
    try {
        let tags=await prisma.tag.findMany()
    
        return {tags,status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
export async function addTag(tagName){
    try {
        await prisma.tag.create({
            data:{
                name:tagName
            }
        })
        return {status:201}
    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}
