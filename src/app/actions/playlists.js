import { cookies } from 'next/headers'
import prisma from '../utils'
import { resolveThumbnailUrl, resolveProfilePhotoUrl } from './videos'

const UPLOADER_SELECT = { id: true, username: true, profilePhoto: true }

// ─── createPlaylist ──────────────────────────────────────────────────────────
export async function createPlaylist(name) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, message: 'Unauthorized' }

  try {
    if (!name?.trim()) return { status: 400, message: 'Playlist name is required' }

    const playlist = await prisma.playlist.create({
      data: {
        name: name.trim(),
        user: { connect: { id: userId } },
      },
    })
    return { playlist, status: 201 }
  } catch (error) {
    return { status: 500, message: 'Failed to create playlist' }
  }
}

// ─── deletePlaylist ──────────────────────────────────────────────────────────
export async function deletePlaylist(id) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, message: 'Unauthorized' }

  try {
    await prisma.playlist.delete({
      where: { id: Number(id) },
    })
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to delete playlist' }
  }
}

// ─── addVideoToPlaylist ──────────────────────────────────────────────────────
export async function addVideoToPlaylist(videoId, playlistId) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, message: 'Unauthorized' }

  try {
    await prisma.playlist.update({
      where: { id: Number(playlistId) },
      data: {
        videos: {
          connect: { id: Number(videoId) },
        },
      },
    })
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to add video to playlist' }
  }
}

// ─── removeVideoFromPlaylist ──────────────────────────────────────────────────
export async function removeVideoFromPlaylist(videoId, playlistId) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, message: 'Unauthorized' }

  try {
    await prisma.playlist.update({
      where: { id: Number(playlistId) },
      data: {
        videos: {
          disconnect: { id: Number(videoId) },
        },
      },
    })
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to remove video from playlist' }
  }
}

// ─── getVideosOfAPlaylist ────────────────────────────────────────────────────
export async function getVideosOfAPlaylist(id) {
  try {
    const playlist = await prisma.playlist.findUnique({
      where: { id: Number(id) },
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

    if (!playlist) return { status: 404, message: 'Playlist not found' }

    const transformedVideos = (playlist.videos || []).map((v) => ({
      ...v,
      thumbnail: resolveThumbnailUrl(v.thumbnail),
      uploader: {
        ...v.uploader,
        profilePhoto: resolveProfilePhotoUrl(v.uploader?.profilePhoto),
      },
    }))

    return {
      playlist: {
        ...playlist,
        videos: transformedVideos,
      },
      status: 200,
    }
  } catch (error) {
    return { status: 500, message: 'Failed to fetch playlist' }
  }
}
