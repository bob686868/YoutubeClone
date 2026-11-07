import { cookies } from 'next/headers'
import { supabase } from '../serverUtils'
import prisma from '../utils'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { resolveProfilePhotoUrl } from './videos'

// ─── Shared cookie options (B1, B2) ──────────────────────────────────────────
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 30, // 30 days
  path: '/',
}

// ─── Auth helper (B3) ────────────────────────────────────────────────────────
export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}

export async function getAuthUserId() {
  const cookieStore = await cookies()
  const idVal = cookieStore.get('id')?.value
  if (!idVal) return null

  const token = cookieStore.get('token')?.value
  if (token && process.env.JWT_SECRET) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (decoded && Number(decoded.id) === Number(idVal)) {
        return Number(decoded.id)
      }
    } catch {
      // Token is invalid/expired
      return null
    }
  }
  return Number(idVal)
}

// ─── signup ──────────────────────────────────────────────────────────────────
export async function signup(username, email, password, profilePhoto) {
  let cookieStore = await cookies()

  // Validate required fields
  if (!username || !email || !password) {
    return { error: 'All credentials are required', status: 400 }
  }
  console.log(email,password)
  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters long', status: 400 }
  }

  try {
    let hashedPassword = await bcrypt.hash(password, 10)
    console.log('hashes successfully')
    // A4 fix: only one profilePhoto key — use the passed value if provided,
    // otherwise fall back to a random default avatar
    let n = Math.floor(Math.random() * 4)
    const resolvedPhoto = profilePhoto || `default${n}.jpg`
    
    console.log('hashes successfully')
    const newUser = await prisma.user.create({
      data: { email: email.trim().toLowerCase(), password: hashedPassword, username: username.trim(), profilePhoto: resolvedPhoto },
    })
    console.log(newUser.email)
    const id = newUser.id

    const [, watchHistoryRecord] = await Promise.all([
      prisma.watchLater.create({ data: { user: { connect: { id } } } }),
      prisma.watchHistory.create({ data: { user: { connect: { id } } } }),
    ])

    // A5 fix: use JWT_SECRET (correct case)
    const token = jwt.sign({ id }, process.env.JWT_SECRET)

    // B1 + B2 fix: secure cookie flags + 30-day maxAge
    cookieStore.set({ name: 'id', value: String(id), ...COOKIE_OPTIONS })
    cookieStore.set({ name: 'token', value: token, ...COOKIE_OPTIONS })
    cookieStore.set({ name: 'watchHistoryId', value: String(watchHistoryRecord.id), ...COOKIE_OPTIONS })

    return { message: 'User created successfully', status: 201 }
  } catch (error) {
    if (error.code === 'P2002') {
      return { error: 'A user with this email or channel name already exists', status: 409 }
    }
    return { error: 'Failed to create user', status: 500 }
  }
}

// ─── login ───────────────────────────────────────────────────────────────────
export async function login(email, password) {
  let cookieStore = await cookies()
  email = email?.trim().toLowerCase()

  if (!email || !password) {
    return { error: 'Email and password are required', status: 400 }
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return { error: 'No account found with this email', status: 404 }
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return { error: 'Invalid email or password', status: 401 }
    }

    // A5 fix: use JWT_SECRET (correct case)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

    // Ensure watchHistory exists (create if missing)
    let watchHistory = await prisma.watchHistory.findFirst({ where: { userId: user.id } })
    if (!watchHistory) {
      watchHistory = await prisma.watchHistory.create({
        data: { user: { connect: { id: user.id } } },
      })
    }

    // B1 + B2 fix: secure cookie flags + 30-day maxAge
    cookieStore.set({ name: 'id', value: String(user.id), ...COOKIE_OPTIONS })
    cookieStore.set({ name: 'token', value: token, ...COOKIE_OPTIONS })
    cookieStore.set({ name: 'watchHistoryId', value: String(watchHistory.id), ...COOKIE_OPTIONS })

    return { message: 'Login successful', status: 200 }
  } catch (error) {
    return { error: 'Something went wrong during login', status: 500 }
  }
}

// ─── logout ──────────────────────────────────────────────────────────────────
export async function logout() {
  'use server'
  let cookieStore = await cookies()
  cookieStore.delete('id')
  cookieStore.delete('token')
  cookieStore.delete('watchHistoryId')
}

// ─── subscribeTo ─────────────────────────────────────────────────────────────
export async function subscribeTo(id) {
  let cookieStore = await cookies()
  let subscriberId = Number(cookieStore.get('id')?.value)
  if (!subscriberId) return { error: 'Unauthorized', status: 401 }

  const targetId = Number(id)
  if (!targetId) return { error: 'Invalid target channel ID', status: 400 }
  if (subscriberId === targetId) return { error: 'Cannot subscribe to yourself', status: 400 }

  try {
    const existingSubscription = await prisma.subscriber.findUnique({
      where: {
        subscriberId_subscribedToId: {
          subscriberId,
          subscribedToId: targetId,
        },
      },
    })

    if (existingSubscription) {
      return { error: 'Subscription already exists', status: 409 }
    }

    await prisma.subscriber.create({
      data: { subscriberId, subscribedToId: targetId },
    })

    return { status: 201 }
  } catch (error) {
    return { error: 'Failed to create subscription', status: 500 }
  }
}

// ─── unsubscribe ─────────────────────────────────────────────────────────────
// A1 fix: was calling prisma.subscriber.create instead of delete
export async function unsubscribe(subscribedToId) {
  let cookieStore = await cookies()
  let subscriberId = Number(cookieStore.get('id')?.value)
  if (!subscriberId) return { error: 'Unauthorized', status: 401 }

  const targetId = Number(subscribedToId)
  if (!targetId) return { error: 'Invalid channel ID', status: 400 }

  try {
    const subscription = await prisma.subscriber.findUnique({
      where: {
        subscriberId_subscribedToId: { subscriberId, subscribedToId: targetId },
      },
    })

    if (!subscription) {
      return { status: 400, message: 'Not subscribed' }
    }

    await prisma.subscriber.delete({
      where: {
        subscriberId_subscribedToId: { subscriberId, subscribedToId: targetId },
      },
    })

    return { status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to unsubscribe' }
  }
}

// ─── getUserInfo ──────────────────────────────────────────────────────────────
export async function getUserInfo(uploaderId) {
  try {
    let user = await prisma.user.findUnique({
      where: { id: Number(uploaderId) },
      select: {
        id: true,
        username: true,
        profilePhoto: true,
        _count: { select: { subscribers: true } },
      },
    })
    if (!user) return { status: 404, message: 'User not found' }

    return { user, profilePhoto: resolveProfilePhotoUrl(user.profilePhoto), status: 200 }
  } catch (error) {
    return { status: 500, message: 'Failed to get user info' }
  }
}

// ─── getAllUsers ──────────────────────────────────────────────────────────────
// D3 fix: removed invalid `viewedVideos` relation that doesn't exist on User model
export async function getAllUsers() {
  try {
    let users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        profilePhoto: true,
        videos: true,
        subscribers: {
          include: { subscriber: true },
        },
        subscribedTo: {
          include: { subscribedTo: true },
        },
      },
    })
    return { users, status: 200 }
  } catch (e) {
    return { error: e.message, status: 500 }
  }
}

// ─── getSubscribedTo ─────────────────────────────────────────────────────────
export async function getSubscribedTo() {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return { subscribedTo: [] }

  try {
    let user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        subscribedTo: {
          select: {
            subscribedTo: {
              select: {
                id: true,
                username: true,
                profilePhoto: true,
                _count: { select: { subscribers: true } },
              },
            },
          },
        },
      },
    })

    let subscribedTo = (user?.subscribedTo || []).map((s) => ({
      subscribedTo: {
        ...s.subscribedTo,
        profilePhoto: resolveProfilePhotoUrl(s.subscribedTo?.profilePhoto),
      },
    }))
    return { subscribedTo }
  } catch (error) {
    return { status: 500, message: 'Failed to get subscriptions' }
  }
}

// ─── getProfilePhoto ─────────────────────────────────────────────────────────
export async function getProfilePhoto(userId) {
  const uId = Number(userId)
  if (!uId) return { status: 400, profilePhoto: '/profilePhoto.jpg' }

  try {
    let user = await prisma.user.findUnique({
      where: { id: uId },
      select: { profilePhoto: true },
    })

    if (!user?.profilePhoto) return { status: 200, profilePhoto: '/profilePhoto.jpg' }

    // Consistent fallback for default avatars
    if (user.profilePhoto.startsWith('default')) {
      const match = user.profilePhoto.match(/\d+/)
      const n = match ? Number(match[0]) : 0
      return { status: 200, profilePhoto: `https://i.pravatar.cc/150?img=${(n % 70) + 12}` }
    }

    if (
      user.profilePhoto.startsWith('http://') ||
      user.profilePhoto.startsWith('https://') ||
      user.profilePhoto.startsWith('/')
    ) {
      return { status: 200, profilePhoto: user.profilePhoto }
    }

    // Attempt signed URL first (supports private Supabase buckets seamlessly)
    const { data, error } = await supabase.storage
      .from('avatars')
      .createSignedUrl(user.profilePhoto, 60 * 60 * 24 * 7)

    if (!error && data?.signedUrl) {
      return { status: 200, profilePhoto: data.signedUrl }
    }

    // Fallback to public URL resolver
    return { status: 200, profilePhoto: resolveProfilePhotoUrl(user.profilePhoto) }
  } catch (error) {
    return { status: 500, profilePhoto: '/profilePhoto.jpg', message: 'Error getting profile photo' }
  }
}

// ─── updateProfilePhoto ──────────────────────────────────────────────────────
export async function updateProfilePhoto(profilePhoto) {
  let cookieStore = await cookies()
  let id = Number(cookieStore.get('id')?.value)
  if (!id) return { status: 401, message: 'Unauthorized' }

  try {
    await prisma.user.update({ where: { id }, data: { profilePhoto } })
    return { status: 201 }
  } catch (error) {
    return { status: 500, message: 'Failed to update profile photo' }
  }
}

// ─── getUsername ──────────────────────────────────────────────────────────────
export async function getUsername(userId) {
  const uId = Number(userId)
  if (!uId) return { status: 400, message: 'Invalid user ID' }

  try {
    let user = await prisma.user.findUnique({
      where: { id: uId },
      select: { username: true },
    })
    return { status: 200, username: user?.username ?? null }
  } catch (error) {
    return { status: 500 }
  }
}
