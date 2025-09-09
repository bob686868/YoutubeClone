import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function signup(username,email,password,profilePhoto) {
    let cookieStore=await cookies()
    try {
        
        // Validate required fields
        if (!username || !email || !password) {
            return {
                message: "Channel name and profile photo are required" ,
                 status: 400 
            }
        }

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                email,password,username,profilePhoto
            }})
        cookieStore.set({key:"id",value:newUser.id})

        await prisma.user.update({
            where:{id},
            data:{
                watchLater:{
                    connect:{
                        id
                    }
                },
                watchHistory:{
                    connect:{
                        id
                    }
                }
            }
        })
        
        return { 
                message: "User created successfully", 
                user: newUser 
            },
            { status: 201 }  

    } catch (error) {
        console.error('Error creating user:', error)
        
        // Handle unique constraint violations
        if (error.code === 'P2002') {
            return {
                 error: "A user with this channel name already exists" ,
                status: 409
            }
        }

        return {
            error: "Failed to create user" ,
            status: 500 
        }
    }
}

export async function logout(){
    let cookieStore=await cookies()
    id=cookieStore.get('id')
    try {
        await prisma.user.delete({
            where:{
                id
            }
        })
    } catch (error) {
        console.error(error.message)
        return {
            status:500
        }
    }
}


export async function subscribeTo(id) {
    let cookieStore=await cookies()
    let subscriberId=cookieStore.get('id')
    try {
        // Check if subscription already exists
        const existingSubscription = await prisma.subscriber.findUnique({
            where: {
                subscriberId_subscribedToId: {
                    subscriberId: Number(subscriberId),
                    subscribedToId: Number(id)
                }
            }
        })
        
        if (existingSubscription) {
            return{
                error: "Subscription already exists" ,
                 status: 409
                } 
                
            }
            
        // Create the subscription
        const subscription = await prisma.subscriber.create({
            data: {
                subscriberId: parseInt(body.subscriberId),
                subscribedToId: parseInt(id)
            }
        })
        
        // subscribed successfully
        return {status: 201 }
            
        } catch (error) {
            console.error('Error creating subscription:', error)
            return { error: "Failed to create subscription", status: 500 }
        }
} 

export async function unsubscribe(subscribedToId){
    let cookieStore=await cookies()
    let subscriberId=cookieStore.get('id')
    try {
        // check if subscription already exist
        let subscription=await prisma.subscriber.findUnique({
            where:{
                subscriberId_subscribedToId:{
                    subscriberId,
                    subscribedToId
                }
            }
        })

        if(!subscription)
            return{status:400,message:"not already subscribed"}

        await prisma.subscriber.create({
            data:{
                subscriberId,subscribedToId
                }})

    } catch (error) {
        console.error(error.message)
        return {status:500}
    }
}

export async function getAllUsers() {
    try {
        let users = await prisma.user.findMany({
            include: {
                videos: true,
                viewedVideos: true,
                subscribers: {
                    include: {
                        subscriber: true 
                    }
                },
                subscribedTo: {
                    include: {
                        subscribedTo: true
                    }
                }
            }
        });
        return {users,status: 200}
    }
    catch (e) {
        return {
            error: e.message,status: 500 
    }
    }
}