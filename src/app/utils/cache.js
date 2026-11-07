import "server-only"
import { cache } from "react"
import { getProfilePhoto, getUsername } from "../actions/users"

// Per-request memoization (replaces broken 12-hour static unstable_cache)
export const getCachedProfilePhoto = cache(async (userId) => {
  if (!userId) return "/profilePhoto.jpg"
  const res = await getProfilePhoto(userId)
  return res?.profilePhoto || "/profilePhoto.jpg"
})

export const getCachedUsername = cache(async (userId) => {
  if (!userId) return "User"
  const res = await getUsername(userId)
  return res?.username || "User"
})

// Export aliases for backwards compatibility
export const fetchSignedUrl = getCachedProfilePhoto
export const fetchUserName = getCachedUsername
