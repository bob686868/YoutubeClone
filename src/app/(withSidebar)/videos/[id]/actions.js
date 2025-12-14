"use server"
import { addReply} from "@/app/actions/comments"
import { toggleLike } from "@/app/actions/commentLikes"
import { subscribeTo, unsubscribe } from "@/app/actions/users"
import { addLikeVideo, deleteLikeVideo } from "@/app/actions/videos"
export async function addReplyFrontEnd(formData){
    let commentId=Number(formData.get("commentId"))
    let text=formData.get("text")

    await addReply(text,commentId)
} 

export async function toggleLikeFrontEnd(formData){
    let commentId=Number(formData.get('commentId'))
    let hasLiked=Number(formData.get('hasLiked'))

    await toggleLike(commentId,hasLiked == 1 )
}

export async function toggleSubsribe(formData){
    let isSubsribed=Boolean(formData.get("isSubscribed"))
    let uploaderId=Number(formData.get("uploaderId"))
    if(isSubsribed)await subscribeTo(uploaderId)
    else await unsubscribe(uploaderId)
}

export async function toggleLikeVideo(formData){
    let hasLiked=formData.get("hasLiked")
    let videoId=Number(formData.get("videoId"))
    if(hasLiked=="true")await addLikeVideo(videoId)
        else await deleteLikeVideo(videoId)
}
export async function dislikeVideo(formData){
    let hasLiked=formData.get("hasLiked")
    let videoId=Number(formData.get('videoId'))
    if(hasLiked)await deleteLikeVideo(videoId)
}
