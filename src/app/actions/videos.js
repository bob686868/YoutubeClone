import { cookies } from 'next/headers'
import prisma from '../utils'
import { supabase } from '../serverUtils'
import { v4 as uuidv4 } from 'uuid'

// ─── URL Resolvers ───────────────────────────────────────────────────────────

export function resolveThumbnailUrl(thumbnail) {
  if (!thumbnail) return '/thumbnails/thumbnail1.jpg'
  if (thumbnail.startsWith('http://') || thumbnail.startsWith('https://')) return thumbnail
  const { data } = supabase.storage.from('thumbnails').getPublicUrl(thumbnail)
  return data?.publicUrl || '/thumbnails/thumbnail1.jpg'
}

export function resolveProfilePhotoUrl(profilePhoto) {
  if (!profilePhoto) return '/profilePhoto.jpg'
  if (profilePhoto.startsWith('http://') || profilePhoto.startsWith('https://')) return profilePhoto
  if (profilePhoto.startsWith('/')) return profilePhoto

  // Consistent fallback for default avatars (e.g. "default0.jpg", "default1.jpg", etc.)
  if (profilePhoto.startsWith('default')) {
    const match = profilePhoto.match(/\d+/)
    const n = match ? Number(match[0]) : 0
    return `https://i.pravatar.cc/150?img=${(n % 70) + 12}`
  }

  const { data } = supabase.storage.from('avatars').getPublicUrl(profilePhoto)
  return data?.publicUrl || '/profilePhoto.jpg'
}

export async function getThumbnailFromPath(thumbnail) {
  if (!thumbnail) return { data: { signedUrl: '/thumbnails/thumbnail1.jpg' } }
  return { data: { signedUrl: resolveThumbnailUrl(thumbnail) } }
}

export async function getProfilePhotoFromPath(profilePhoto) {
  if (!profilePhoto) return { data: { signedUrl: '/profilePhoto.jpg' } }

  if (profilePhoto.startsWith('default')) {
    const match = profilePhoto.match(/\d+/)
    const n = match ? Number(match[0]) : 0
    return { data: { signedUrl: `https://i.pravatar.cc/150?img=${(n % 70) + 12}` } }
  }

  if (
    profilePhoto.startsWith('http://') ||
    profilePhoto.startsWith('https://') ||
    profilePhoto.startsWith('/')
  ) {
    return { data: { signedUrl: profilePhoto } }
  }

  try {
    const res = await supabase.storage.from('avatars').createSignedUrl(profilePhoto, 60 * 60 * 24 * 7)
    if (!res.error && res.data?.signedUrl) {
      return res
    }
  } catch {}

  return { data: { signedUrl: resolveProfilePhotoUrl(profilePhoto) } }
}

// Uploader select shape used across multiple queries (B4 fix: no password field)
const UPLOADER_SELECT = {
  id: true,
  username: true,
  profilePhoto: true,
}

// ─── addVideo ─────────────────────────────────────────────────────────────────
export async function addVideo(title, description, thumbnail, videoFile, duration = 120, tags = null, isShort = false) {
  let cookieStore = await cookies()
  let id = Number(cookieStore.get('id')?.value)
  if (!id) return { status: 401, message: 'You must be logged in to upload a video' }

  if (!title || !description || !thumbnail || !videoFile) {
    return { status: 400, message: 'Missing required data' }
  }

  let tId = uuidv4()

  // 1. Upload Thumbnail
  let thumbPath = `${tId}/thumb_${thumbnail.name}`
  let { error: thumbError } = await supabase.storage
    .from('thumbnails')
    .upload(thumbPath, thumbnail, { upsert: true })

  if (thumbError) {
    return { status: 500, message: 'Thumbnail upload failed' }
  }

  // 2. Upload Video File
  let videoPath = `${tId}/vid_${videoFile.name}`
  let { error: videoError } = await supabase.storage
    .from('Videos')
    .upload(videoPath, videoFile, { upsert: true })

  if (videoError) {
    return { status: 500, message: 'Video file upload failed' }
  }

  try {
    await prisma.video.create({
      data: {
        title,
        description,
        duration: Number(duration) || 120,
        thumbnail: thumbPath,
        url: videoPath,
        isShort,
        uploaderId: id,
        tags: {
          connectOrCreate: (tags || []).map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    })

    return { status: 201 }
  } catch (error) {
    return { status: 500, message: 'Database save failed' }
  }
}

// ─── deleteVideo ──────────────────────────────────────────────────────────────
// E2: removes record and cleans up storage files
export async function deleteVideo(id) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, message: 'Unauthorized' }

  try {
    const video = await prisma.video.findUnique({
      where: { id: Number(id) },
      select: { uploaderId: true, thumbnail: true, url: true },
    })

    if (!video) return { status: 404, message: 'Video not found' }
    if (video.uploaderId !== userId) return { status: 403, message: 'Forbidden' }

    // Delete DB record first (cascades to views, likes, comments, etc.)
    await prisma.video.delete({ where: { id: Number(id) } })

    // Clean up storage files in background (non-fatal if they fail)
    await Promise.allSettled([
      supabase.storage.from('thumbnails').remove([video.thumbnail]),
      supabase.storage.from('Videos').remove([video.url]),
    ])

    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to delete video' }
  }
}

// ─── getVideos ────────────────────────────────────────────────────────────────
// B4 fix: use select to exclude password from uploader
// Robust public URL transformation
export async function getVideos(skip = 0) {
  try {
    const videos = await prisma.video.findMany({
      select: {
        id: true,
        title: true,
        thumbnail: true,
        duration: true,
        createdAt: true,
        isShort: true,
        uploaderId: true,
        uploader: { select: UPLOADER_SELECT },
        tags: { select: { id: true, name: true } },
        _count: { select: { views: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: Number(skip) || 0,
      take: 15,
    })

    const transformedVideos = videos.map((v) => ({
      ...v,
      thumbnail: resolveThumbnailUrl(v.thumbnail),
      uploader: {
        ...v.uploader,
        profilePhoto: resolveProfilePhotoUrl(v.uploader?.profilePhoto),
      },
    }))

    return { videos: transformedVideos, status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to fetch videos' }
  }
}

// ─── getVideo ─────────────────────────────────────────────────────────────────
export async function getVideo(videoId) {
  const cookieStore = await cookies()
  const userId = Number(cookieStore.get('id')?.value) || null
  const watchHistoryId = Number(cookieStore.get('watchHistoryId')?.value) || null
  videoId = Number(videoId)

  if (!videoId) return { status: 400, message: 'Invalid video ID' }

  try {
    // 1) Fetch video + uploader (no password) + counts
    const video = await prisma.video.findUnique({
      where: { id: videoId },
      include: {
        uploader: {
          select: {
            ...UPLOADER_SELECT,
            _count: { select: { subscribers: true } },
          },
        },
        _count: { select: { views: true, likes: true } },
      },
    })

    if (!video) return { status: 404, message: 'Video not found' }

    // 2) Resolve URLs
    video.thumbnail = resolveThumbnailUrl(video.thumbnail)
    video.uploader.profilePhoto = resolveProfilePhotoUrl(video.uploader?.profilePhoto)

    // Resolve public video stream URL if needed
    if (video.url && !video.url.startsWith('http')) {
      const { data: videoData } = supabase.storage.from('Videos').getPublicUrl(video.url)
      if (videoData?.publicUrl) {
        video.url = videoData.publicUrl
      }
    }

    // 3) Subscriber + like queries in parallel (safe for anonymous visitors)
    const [subRes, likeRes] = await Promise.all([
      userId
        ? prisma.subscriber.findUnique({
            where: {
              subscriberId_subscribedToId: {
                subscriberId: userId,
                subscribedToId: video.uploaderId,
              },
            },
            select: { subscribedToId: true },
          })
        : Promise.resolve(null),
      userId
        ? prisma.like.findUnique({
            where: { userId_videoId: { userId, videoId } },
            select: { id: true },
          })
        : Promise.resolve(null),
    ])

    // 4) Record view + update watch history in parallel
    const pView = prisma.view.create({ data: { videoId } })

    const historyUpsert = (watchHistoryId && userId)
      ? prisma.watchHistoryVideo.upsert({
          where: { watchHistoryId_videoId: { watchHistoryId, videoId } },
          update: { watchedAt: new Date() },
          create: { watchHistoryId, videoId },
        })
      : Promise.resolve()

    await Promise.all([pView, historyUpsert])

    return {
      video,
      isSubsribed: Boolean(subRes),
      hasLiked: Boolean(likeRes),
      status: 200,
    }
  } catch (err) {
    return { status: 500, message: 'Failed to fetch video' }
  }
}

// ─── getUserVideos ────────────────────────────────────────────────────────────
// C4 fix: include uploader fields needed by the Video component
// B4 fix: exclude password via select
export async function getUserVideos(uploaderId, skip = 0) {
  const uId = Number(uploaderId)
  if (!uId) return { videos: [], status: 400 }

  try {
    let videos = await prisma.video.findMany({
      where: { uploaderId: uId },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        duration: true,
        createdAt: true,
        isShort: true,
        uploaderId: true,
        uploader: { select: UPLOADER_SELECT },
        tags: { select: { id: true, name: true } },
        _count: { select: { views: true } },
      },
      skip: Number(skip) || 0,
      take: 15,
      orderBy: { createdAt: 'desc' },
    })

    videos = videos.map((v) => ({
      ...v,
      thumbnail: resolveThumbnailUrl(v.thumbnail),
      uploader: {
        ...v.uploader,
        profilePhoto: resolveProfilePhotoUrl(v.uploader?.profilePhoto),
      },
    }))

    return { videos, status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to fetch user videos' }
  }
}

// ─── deleteLikeVideo ─────────────────────────────────────────────────────────
export async function deleteLikeVideo(videoId) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, message: 'Unauthorized' }

  const vidId = Number(videoId)
  if (!vidId) return { status: 400, message: 'Invalid video ID' }

  try {
    await prisma.like.delete({ where: { userId_videoId: { userId, videoId: vidId } } })
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to unlike video' }
  }
}

// ─── addLikeVideo ─────────────────────────────────────────────────────────────
export async function addLikeVideo(videoId) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, message: 'Unauthorized' }

  const vidId = Number(videoId)
  if (!vidId) return { status: 400, message: 'Invalid video ID' }

  try {
    await prisma.like.upsert({
      where: { userId_videoId: { userId, videoId: vidId } },
      update: {},
      create: { userId, videoId: vidId },
    })
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to like video' }
  }
}

// ─── getLikedVideos ───────────────────────────────────────────────────────────
// C2 fix: transform profilePhoto URL; B4 fix: exclude password
export async function getLikedVideos() {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { videos: [], status: 200 }

  try {
    let user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        likes: {
          select: {
            video: {
              select: {
                id: true,
                title: true,
                thumbnail: true,
                duration: true,
                createdAt: true,
                isShort: true,
                uploaderId: true,
                uploader: { select: UPLOADER_SELECT },
                _count: { select: { views: true } },
              },
            },
          },
        },
      },
    })

    let formatted = (user?.likes || []).map((l) => ({
      ...l.video,
      thumbnail: resolveThumbnailUrl(l.video.thumbnail),
      uploader: {
        ...l.video.uploader,
        profilePhoto: resolveProfilePhotoUrl(l.video.uploader?.profilePhoto),
      },
    }))

    return { videos: formatted, status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to fetch liked videos' }
  }
}

// ─── searchVideos ─────────────────────────────────────────────────────────────
// C3 fix: transform thumbnail to public URL; include description and profilePhoto
export async function searchVideos(searchTerm, skip = 0, take = 15) {
  try {
    const videos = await prisma.video.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        createdAt: true,
        duration: true,
        isShort: true,
        uploaderId: true,
        uploader: { select: UPLOADER_SELECT },
        _count: { select: { views: true } },
      },
      skip: Number(skip) || 0,
      take: Number(take) || 15,
      orderBy: { createdAt: 'desc' },
    })

    const mapped = videos.map((v) => ({
      ...v,
      thumbnail: resolveThumbnailUrl(v.thumbnail),
      uploader: {
        ...v.uploader,
        profilePhoto: resolveProfilePhotoUrl(v.uploader?.profilePhoto),
      },
    }))

    return { status: 200, videos: mapped }
  } catch (error) {
    return { status: 500, message: 'Internal server error' }
  }
}
