import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import prisma from '../utils'
import { supabase } from "../serverUtils";
import {v4 as uuidv4} from 'uuid'

// let prisma=new PrismaClient()

export async function getThumbnailFromPath(thumbnail){
    const res=await supabase.storage
    .from('thumbnails')
    .createSignedUrl(thumbnail,3000)
    return res

}

export async function getProfilePhotoFromPath(profilePhoto){
    const res= await supabase.storage
        .from('avatars')
        .createSignedUrl(profilePhoto,60*60*12)
    return res
}

export async function addVideo(title,description,thumbnail,duration=120,tags=null,isShort=false){
    let cookieStore =await cookies()
    let id=Number(cookieStore.get('id').value)
    let tId=uuidv4()
    let path=`${tId}/${thumbnail.name}`
    let {data,error}=await supabase
                        .storage
                        .from('thumbnails')
                        .upload(path,thumbnail,{upsert:true})
    if(error){
        console.log(error.message)
        return {status:500}
    }
    try {
    if(!title|| !description || !thumbnail || !duration){
            return {status:400,
                message:'data provided isnt enough'
            }
        }
        await prisma.video.create({data:{
            title,description,duration,thumbnail:path,
            uploaderId:id,
            // tags:{
            //     connect:tags.map((name)=>({name}))
            // }
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

export async function getVideos(skip=0){
    try {
        let videos=await prisma.video.findMany({
            include:{
                uploader:true,
                _count:{
                    select:{
                        views:true
                    }
                }
            },
            skip,
            take:15
        })

        videos=await Promise.all(
            videos.map(async (v)=>{
                const [thumbRes,profileRes]=await Promise.all([
                getThumbnailFromPath(v.thumbnail),
                getProfilePhotoFromPath(v.uploader.profilePhoto)
                ])

                if(thumbRes.error)return v
                return {...v,thumbnail:thumbRes.data.signedUrl,uploader:{...v.uploader,profilePhoto:profileRes.data?.signedUrl}}
            })
        )
    // videos.map((v)=>)
        return {videos,status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}        
    }
}

export async function getVideo(videoId) {
  const cookieStore = await cookies();
  const userId = Number(cookieStore.get("id")?.value);
  const watchHistoryId = Number(cookieStore.get("watchHistoryId")?.value);
  videoId = Number(videoId);

  try {
    // 1) Fetch video + uploader + counts in ONE query
    const video = await prisma.video.findUnique({
      where: { id: videoId },
      include: {
        uploader: {
          include: {
            _count: { select: { subscribers: true } }
          }
        },
        _count: {
          select: { views: true, likes: true }
        }
      }
    });

    if (!video) return { status: 500 };
    console.log(video)
    console.log(supabase)
    // 2) Signed URLs in parallel (fastest)
    const [profileRes, thumbRes] = await Promise.all([
      getProfilePhotoFromPath(video.uploader.profilePhoto),
      getThumbnailFromPath(video.thumbnail),
    ]);

    video.uploader.profilePhoto = profileRes.data.signedUrl;
    video.thumbnail = thumbRes.data.signedUrl;

    // 3) Subscriber + like queries in parallel
    const pSub = prisma.subscriber.findUnique({
      where: {
        subscriberId_subscribedToId: {
          subscriberId: userId,
          subscribedToId: video.uploaderId,
        }
      },
      select: { subscribedToId: true }
    });

    const pLike = prisma.like.findUnique({
      where: {
        userId_videoId: {
          userId,
          videoId,
        }
      },
      select: { id: true }
    });

    const [subRes, likeRes] = await Promise.all([pSub, pLike]);

    // 4) Insert view + update watch history in parallel
    // IMPORTANT: these are *writes*, so we keep them parallel (no race condition)
    const pView = prisma.view.create({ data: { videoId } });

    const pHistory = prisma.watchHistoryVideo.upsert({
      where: {
        watchHistoryId_videoId: {
          watchHistoryId,
          videoId
        }
      },
      update: { watchedAt: new Date() },
      create: { watchHistoryId, videoId }
    });

    await Promise.all([pView, pHistory]);

    return {
      video,
      isSubsribed: Boolean(subRes),
      hasLiked: Boolean(likeRes),
      status: 200
    };

  } catch (err) {
    console.error(err);
    return { status: 500 };
  }
}


export async function getUserVideos(uploaderId,skip=0){
    try {
        let videos=await prisma.video.findMany({
            where:{
                uploaderId
            },
            include:{
                _count:{
                    select:{
                        views:true
                }}
            },
            skip,
            take:15
        })
        videos=videos.map((v)=>{
          let {data}=supabase.storage.from('thumbnails').getPublicUrl(v.thumbnail)
          return {...v,thumbnail:data.publicUrl}
        })
        console.log(videos)
        console.log('entered')
        return {videos,status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}        
    }
}

export async function deleteLikeVideo(videoId){
    console.log('deleting Like video')
    let cookieStore=await cookies()
    let userId=Number(cookieStore.get('id').value)
    
    try {
        await prisma.like.delete({
            where:{
                userId_videoId:{
                    userId,
                    videoId
                }
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}
export async function addLikeVideo(videoId){
    console.log('adding Like video')
    let cookieStore=await cookies()
    let userId=Number(cookieStore.get('id').value)
    
    try {
        await prisma.like.create({
            data:{
                    userId,
                    videoId
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

export async function getLikedVideos(){
    let cookieStore=await cookies()
    let userId=Number(cookieStore.get('id').value)

    try {
        let user=await prisma.user.findUnique({where:{
            id:userId
            },
            select:{
                likes:{
                    select:{
                        video:{
                            select:{
                                uploader:{
                                    select:{
                                        username:true
                                    }
                                }
                            ,
                                _count:{
                                    select:{
                                        views:true
                                    }
                                },
                                id:true,
                                createdAt:true,
                                title:true,
                                thumbnail:true,
                                duration:true
                            }
                        }
                    }
                }
            }
        
            
        }
    )
    let formatted=user.likes.map((l)=>{
      let {data}=supabase.storage.from('thumbnails').getPublicUrl(l.video.thumbnail)
      return {...l.video,thumbnail:data.publicUrl}
    })
    console.log(formatted)
    return {videos:formatted}
    } catch (error) {
        console.log(error.message)
    }

}


export async function searchVideos(searchTerm, skip = 0, take = 15) {
  try {
    const videos = await prisma.video.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        createdAt: true,
        duration: true,
        uploader: {
          select: {
            username: true,
            id:true
          },
        },
        isShort: true,
        _count: {
          select: {
            views: true,
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { status: 200, videos };
  } catch (error) {
    console.error("❌ Error searching videos:", error);
    return { status: 500, message: "Internal server error" };
  }
}
