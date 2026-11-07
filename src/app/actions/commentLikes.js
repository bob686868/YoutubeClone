import { cookies } from 'next/headers'
import prisma from '../utils'

// ─── toggleLike ───────────────────────────────────────────────────────────────
// D2 fix: removed console.log statements; safely handles authentication
export async function toggleLike(commentId, hasLiked) {
  let cookieStore = await cookies()
  let id = Number(cookieStore.get('id')?.value)
  if (!id) return { status: 401, message: 'Unauthorized' }

  const cId = Number(commentId)
  if (!cId) return { status: 400, message: 'Invalid comment ID' }

  try {
    if (!hasLiked) {
      await prisma.commentLike.upsert({
        where: {
          userId_commentId: { userId: id, commentId: cId },
        },
        update: {},
        create: { userId: id, commentId: cId },
      })
    } else {
      await prisma.commentLike.deleteMany({
        where: { userId: id, commentId: cId },
      })
    }
    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to toggle comment like' }
  }
}

// ─── getLikeState ─────────────────────────────────────────────────────────────
export async function getLikeState(commentId) {
  let cookieStore = await cookies()
  let id = Number(cookieStore.get('id')?.value)
  if (!id) return { hasLiked: false }

  const cId = Number(commentId)
  if (!cId) return { hasLiked: false }

  try {
    let commentLike = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: { userId: id, commentId: cId },
      },
    })
    return { hasLiked: Boolean(commentLike) }
  } catch (error) {
    return { hasLiked: false }
  }
}
