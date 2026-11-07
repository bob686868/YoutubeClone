import { cookies } from 'next/headers'
import prisma from '../utils'
import { resolveThumbnailUrl, resolveProfilePhotoUrl } from './videos'

// Uploader fields needed by the Video component (C6 fix: include id and profilePhoto)
const UPLOADER_SELECT = { id: true, username: true, profilePhoto: true }

// ─── removeVideoFromWatchHistory ─────────────────────────────────────────────
// A3 fix: was calling `.id` on a Promise instead of awaiting the query
export async function removeVideoFromWatchHistory(videoId) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, message: 'Unauthorized' }

  const vidId = Number(videoId)
  if (!vidId) return { status: 400, message: 'Invalid video ID' }

  try {
    const watchHistoryRecord = await prisma.watchHistory.findUnique({
      where: { userId },
      select: { id: true },
    })

    if (!watchHistoryRecord) return { status: 404, message: 'Watch history not found' }

    await prisma.watchHistoryVideo.delete({
      where: {
        watchHistoryId_videoId: {
          watchHistoryId: watchHistoryRecord.id,
          videoId: vidId,
        },
      },
    })
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to remove from watch history' }
  }
}

// ─── clearWatchHistory ────────────────────────────────────────────────────────
export async function clearWatchHistory() {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, message: 'Unauthorized' }

  try {
    const watchHistoryRecord = await prisma.watchHistory.findUnique({
      where: { userId },
      select: { id: true },
    })

    if (watchHistoryRecord) {
      await prisma.watchHistoryVideo.deleteMany({
        where: { watchHistoryId: watchHistoryRecord.id },
      })
    }
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to clear watch history' }
  }
}

// ─── getVideosOfWatchHistory ─────────────────────────────────────────────────
// C6 fix: now includes uploader.id and uploader.profilePhoto
export async function getVideosOfWatchHistory(skip = 0) {
  let cookieStore = await cookies()
  let id = Number(cookieStore.get('id')?.value)
  if (!id) return { watchHistory: [], status: 200 }

  try {
    let watchHistory = await prisma.watchHistory.findUnique({
      where: { userId: id },
      select: {
        videos: {
          orderBy: { watchedAt: 'desc' },
          skip: Number(skip) || 0,
          take: 15,
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

    let videos = (watchHistory?.videos ?? []).map((v) => ({
      ...v.video,
      thumbnail: resolveThumbnailUrl(v.video?.thumbnail),
      uploader: {
        ...v.video?.uploader,
        profilePhoto: resolveProfilePhotoUrl(v.video?.uploader?.profilePhoto),
      },
    }))

    return { watchHistory: videos, status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to fetch watch history' }
  }
}
