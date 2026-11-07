import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import prisma from '../utils'
import { getProfilePhotoFromPath } from './videos'

// Minimal user fields — C1 fix: excludes password
const USER_SELECT = { id: true, username: true, profilePhoto: true }

// ─── addComment ───────────────────────────────────────────────────────────────
export async function addComment(text, videoId) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, error: 'Please log in to comment' }

  videoId = Number(videoId)
  if (!videoId || !text || !text.trim()) {
    return { status: 400, error: 'Valid comment text and videoId required' }
  }

  try {
    await prisma.comment.create({
      data: {
        text: text.trim(),
        userId,
        videoId,
      },
    })
    revalidatePath(`/videos/${videoId}`)
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to add comment' }
  }
}

// ─── addReply ─────────────────────────────────────────────────────────────────
export async function addReply(text, commentId) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, error: 'Please log in to reply' }

  commentId = Number(commentId)
  if (!commentId || !text || !text.trim()) {
    return { status: 400, error: 'Valid reply text and commentId required' }
  }

  try {
    await prisma.comment.create({
      data: {
        text: text.trim(),
        userId,
        commentId,
      },
    })
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to add reply' }
  }
}

// ─── deleteComment ────────────────────────────────────────────────────────────
export async function deleteComment(id) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, message: 'Unauthorized' }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
      select: { userId: true, videoId: true },
    })

    if (!comment) return { status: 404, message: 'Comment not found' }
    if (comment.userId !== userId) return { status: 403, message: 'Forbidden' }

    await prisma.comment.delete({ where: { id: Number(id) } })
    if (comment.videoId) revalidatePath(`/videos/${comment.videoId}`)
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to delete comment' }
  }
}

// ─── editComment ──────────────────────────────────────────────────────────────
export async function editComment(id, text) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { status: 401, message: 'Unauthorized' }
  if (!id || !text || !text.trim()) return { status: 400, message: 'id and valid text are required' }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
      select: { userId: true, videoId: true },
    })

    if (!comment) return { status: 404, message: 'Comment not found' }
    if (comment.userId !== userId) return { status: 403, message: 'Forbidden' }

    await prisma.comment.update({
      where: { id: Number(id) },
      data: { text: text.trim() },
    })
    if (comment.videoId) revalidatePath(`/videos/${comment.videoId}`)
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to edit comment' }
  }
}

// ─── getComments ──────────────────────────────────────────────────────────────
// C1 fix: select only safe user fields (no password)
// Safe for both authenticated and guest users
export async function getComments(videoId) {
  videoId = Number(videoId)
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value) || null

  try {
    let comments = await prisma.comment.findMany({
      where: { videoId, commentId: null },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        text: true,
        createdAt: true,
        user: { select: USER_SELECT },
        _count: { select: { subcomments: true, likes: true } },
        ...(userId
          ? {
              likes: { where: { userId }, select: { id: true }, take: 1 },
            }
          : {}),
      },
    })

    let formatted = await Promise.all(
      comments.map(async (c) => {
        let res = await getProfilePhotoFromPath(c.user.profilePhoto)
        return {
          id: c.id,
          text: c.text,
          createdAt: c.createdAt,
          user: { ...c.user, profilePhoto: res.data?.signedUrl ?? '' },
          replyCount: c._count.subcomments,
          likedByMe: Boolean(c.likes && c.likes.length > 0),
          likesCount: c._count.likes,
        }
      })
    )

    return { comments: formatted, status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to fetch comments' }
  }
}

// ─── getReplies ───────────────────────────────────────────────────────────────
// A2 fix: resolved variable `r` reference
// Safe for both authenticated and guest users
export async function getReplies({ commentId }) {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value) || null

  try {
    let replies = await prisma.comment.findMany({
      where: { commentId: Number(commentId) },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        text: true,
        createdAt: true,
        _count: { select: { likes: true } },
        user: { select: USER_SELECT },
        ...(userId
          ? {
              likes: { where: { userId }, select: { id: true }, take: 1 },
            }
          : {}),
      },
    })

    let formatted = await Promise.all(
      replies.map(async (r) => {
        let res = await getProfilePhotoFromPath(r.user.profilePhoto)
        return {
          id: r.id,
          text: r.text,
          createdAt: r.createdAt,
          user: { ...r.user, profilePhoto: res.data?.signedUrl ?? '' },
          likedByMe: Boolean(r.likes && r.likes.length > 0),
          likesCount: r._count.likes,
        }
      })
    )

    return { comments: formatted, status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to fetch replies' }
  }
}
