import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

let prisma=new PrismaClient()
export async function addVideo(title,description,thumbnail,duration=120,tags=null,isShort=false){
    let cookieStore =await cookies()
    let id=Number(cookieStore.get('id').value)
    console.log(id,'-=-=00-=0=-0-0=-')
    thumbnail=String(thumbnail  )
    console.log('adding')
    try {
        if(!title || !description || !thumbnail || !duration){
            return {status:400,
                message:'data provided isnt enough'
            }
        }
        await prisma.video.create({data:{
            title,description,duration,thumbnail,
            uploaderId:id,
            // tags:{
            //     connect:tags.map((name)=>({name}))
            // }
        }})
        console.log('added')
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
        console.log('entered')
        return {videos,status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}        
    }
}

export async function getVideo(videoId){
    let cookieStore=await cookies()
    let userId=Number(cookieStore.get('id').value)
    console.log(userId)
    videoId=Number(videoId)
    console.log(videoId)
    let watchHistoryId=Number(cookieStore.get('watchHistoryId').value)
    try {
        let video =await prisma.video.findUnique({
            where:{
                id:videoId
            },
            include:{
                uploader:{
                    include:{
                        _count:{
                            select:{subscribers:true}
                        }
                    }
                },
                _count:{
                    select:{
                        views:true,
                        likes:true
                    }
                }
            },
    })
    if(!video)return {status:500}
    let uploaderId=video.uploaderId
    let isSubsribed=await prisma.subscriber.findUnique({
        where:{
            subscriberId_subscribedToId:{
                subscriberId:userId,
                subscribedToId:uploaderId
            }
        }
        ,
       select:{
            subscribedToId:true
        }
    }) 
    await prisma.view.create({
        data:{
            videoId
        }
    })
    let hasLiked=await prisma.like.findUnique({
        where:{
            userId_videoId:{
                userId,
                videoId
            }
        },
       select:{
            id:true
       }
    })

    await prisma.watchHistoryVideo.upsert({
        where:{
            watchHistoryId_videoId:{
                watchHistoryId:watchHistoryId,
                videoId
            }
        },
        update:{
            watchedAt:new Date()
        },
        create:{
            watchHistoryId:watchHistoryId,
            videoId
        }
    })
    return {video,isSubsribed:Boolean(isSubsribed),hasLiked:Boolean(hasLiked),status:200}
    } catch (error) {
        console.error(error.message)
        return {status:500}
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
    return {user}
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
