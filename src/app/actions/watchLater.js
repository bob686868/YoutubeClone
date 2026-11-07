import { cookies } from 'next/headers'
import prisma from '../utils'
import { resolveThumbnailUrl, resolveProfilePhotoUrl } from './videos'

// Uploader fields needed by the Video component (B4 fix: no password)
const UPLOADER_SELECT = { id: true, username: true, profilePhoto: true }

// ─── addVideoToWatchLater ────────────────────────────────────────────────────
export async function addVideoToWatchLater(videoId) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, message: 'Unauthorized' }

  const vidId = Number(videoId)
  if (!vidId) return { status: 400, message: 'Invalid video ID' }

  try {
    await prisma.watchLater.upsert({
      where: { userId },
      update: { videos: { connect: { id: vidId } } },
      create: {
        user: { connect: { id: userId } },
        videos: { connect: { id: vidId } },
      },
    })
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to add to Watch Later' }
  }
}

// ─── removeVideoFromWatchLater ───────────────────────────────────────────────
export async function removeVideoFromWatchLater(videoId) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, message: 'Unauthorized' }

  const vidId = Number(videoId)
  if (!vidId) return { status: 400, message: 'Invalid video ID' }

  try {
    await prisma.watchLater.update({
      where: { userId },
      data: { videos: { disconnect: { id: vidId } } },
    })
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to remove from Watch Later' }
  }
}

// ─── getVideosOfWatchLater ───────────────────────────────────────────────────
// C5 fix: use select so password is never fetched
export async function getVideosOfWatchLater() {
  let cookieStore = await cookies()
  let id = Number(cookieStore.get('id')?.value)
  if (!id) return { watchLater: [], status: 200 }

  try {
    let watchLater = await prisma.watchLater.findUnique({
      where: { userId: id },
      include: {
        videos: {
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
    })

    let videos = (watchLater?.videos ?? []).map((v) => ({
      ...v,
      thumbnail: resolveThumbnailUrl(v.thumbnail),
      uploader: {
        ...v.uploader,
        profilePhoto: resolveProfilePhotoUrl(v.uploader?.profilePhoto),
      },
    }))

    return { watchLater: videos, status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to fetch Watch Later' }
  }
}
