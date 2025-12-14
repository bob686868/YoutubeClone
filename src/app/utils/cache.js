import "server-only"
import { unstable_cache } from "next/cache"
import { getProfilePhoto, getUsername } from "../actions/users"

export async function fetchSignedUrl(userId){
    const res=await getProfilePhoto(userId)
    return res.profilePhoto
}

export const getCachedProfilePhoto=unstable_cache(
    fetchSignedUrl,
    ["profile_photo"],
    { tags: ["profilePhoto"],revalidate:60*60*12}
)

export async function fetchUserName(userId){
    const res=await getUsername(userId)
    return res.username
}

export const getCachedUsername=unstable_cache(
    fetchUserName,
    ["username"],
    { tags: ["username"],revalidate:60*60*24}
)
