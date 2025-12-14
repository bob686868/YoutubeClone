import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { supabase } from '../serverUtils'
import prisma from '../utils'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// const prisma = new PrismaClient()

export async function signup(username,email,password,profilePhoto) {
    let cookieStore=await cookies()

    let n = Math.floor(Math.random()*4)
    try {
        
        // Validate required fields
        if (!username || !email || !password) {
            return {
                message:"all credentials are required",
                 status: 400 
            }
        }
       let hashedPassword=await bcrypt.hash(password,10)
        const newUser = await prisma.user.create({
            data: {
                email,password:hashedPassword,username,profilePhoto,profilePhoto:`default${n}.jpg`
            }})
        cookieStore.set({name:"id",value:newUser.id})
        let id =newUser.id
        console.log(id)
        
        const [v1, v2] = await Promise.all([
            prisma.watchLater.create({data:
                {user:{
                    connect:{id}
                }}}),
                prisma.watchHistory.create({data:
                    {user:{
                        connect:{id}
                    }}}),
                ]);
        cookieStore.set({name:"watchHistoryId",value:v2.id})
        const token=jwt.sign({id:newUser.id},process.env.JWt_SECRET)
        cookieStore.set({name:"token",value:token})
        return { 
                message: "User created successfully", 
                status: 201 
            }  

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

export async function login(email, password) {
  let cookieStore = await cookies();
  email = email.trim().toLowerCase();

  try {
    // Validate required fields
    if (!email || !password) {
      return {
        error: "Email and password are required",
        status: 400,
      };
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        error: "No account found with this email",
        status: 404,
      };
    }

    // Validate password
    let match=await bcrypt.compare(password,user.password)
    if (!match) {
      return {
        error: "Invalid email or password",
        status: 401,
      };
    }

    // Auth success → set cookies
    cookieStore.set({
      name: "id",
      value: user.id,
    });
    let token=jwt.sign({id:user.id},process.env.JWt_SECRET)
    cookieStore.set({
      name: "token",
      value: token,
    });

    // Check the user’s watchHistory; create if not exists
    let watchHistory = await prisma.watchHistory.findFirst({
      where: { userId: user.id },
    });

    if (!watchHistory) {
      watchHistory = await prisma.watchHistory.create({
        data: {
          user: { connect: { id: user.id } },
        },
      });
    }

    cookieStore.set({
      name: "watchHistoryId",
      value: watchHistory.id,
    });

    return {
      message: "Login successful",
      status: 200,
    };
  } catch (error) {
    console.error("Login error:", error);

    return {
      error: "Something went wrong during login",
      status: 500,
    };
  }
}


export async function logout(){
    "use server"
    let cookieStore=await cookies()
    cookieStore.delete("id")
    // try {
    //     await prisma.user.delete({
    //         where:{
    //             id
    //         }
    //     })
    // } catch (error) {
    //     console.error(error.message)
    //     return {
    //         status:500
    //     }
    // }
}


export async function subscribeTo(id) {
    console.log('subscribed backend')
    console.log('====================')

    let cookieStore=await cookies()
    let subscriberId=cookieStore.get('id').value
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
                    subscriberId: Number(subscriberId),
                    subscribedToId: Number(id)
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
    console.log('unsubscribed backend')
    let cookieStore=await cookies()
    let subscriberId=Number(cookieStore.get('id').value)
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

export async function getUserInfo(uploaderId){
    try {
        let user=await prisma.user.findUnique({
            where:{
                id:uploaderId
            },
            include:{
                _count:{
                    select:{
                        subscribers:true
                    }
                }
            }
        })
        let {data}=supabase.storage.from('avatars').getPublicUrl(user.profilePhoto)
        return {user,profilePhoto:data.publicUrl,status:200}
    } catch (error) {
        console.log(error.message)
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

export async function getSubscribedTo(){
    let cookieStore =await cookies()
    let userId=Number(cookieStore.get('id'  ).value)
    try {
        let {subscribedTo}=await prisma.user.findUnique({where:
            {
                id:userId
        },
        select:{
            subscribedTo:{
                select:{
                    subscribedTo:{
                        select:{
                            id:true,
                            username:true,
                            profilePhoto:true,
                            _count:{
                                select:{
                                    subscribers:true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    subscribedTo=subscribedTo.map((s)=>{
        let {data}=supabase.storage.from('avatars').getPublicUrl(s.subscribedTo.profilePhoto)
        console.log(s)
        return {subscribedTo:{...s.subscribedTo,profilePhoto:data.publicUrl}}
    })
    // let s=subscribedTo.map((s)=>{
    //     let url=supabase.storage.from('avatar').getPublicUrl(s.id)
    // })
    return {subscribedTo}
    } catch (error) {
        console.log(error.message)        
    }
}

export async function getProfilePhoto(userId){
    console.log(userId)
    console.log('==========================-=-=-=-')
    try {
        let {profilePhoto}=await prisma.user.findUnique({where:{
            id:userId
        },select:{
        profilePhoto:true
        }})
        console.log(profilePhoto)
        const {data,error}= await supabase.storage
        .from('avatars')
        .createSignedUrl(profilePhoto,60*60*12)
    return {status:200,profilePhoto:!error ? data.signedUrl : ""}
    } catch (error) {
        console.log(error.message)
        return {status:500 , message:"error getting profile photo"}
    }
}

export async function updateProfilePhoto(profilePhoto){
    let id=(await cookies()).get('id')
    if(!id)return {status:404}
    id=Number(id.value)
    try {
        await prisma.user.update({
            where:{id},
            data:{
                profilePhoto
            }
        })
        return {status:201}
    } catch (error) {
        console.log(error.message)
        return {status:500}
    }

}

export async function getUsername(userId){
    try {
        let username=await prisma.user.findUnique({
            where:{id:userId},
            select:{username:true}
        })
        console.log(username)
        console.log('==================')
        return {status:200,username}
    } catch (error) {
        return {status:500}
    }
}