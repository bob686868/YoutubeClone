"use server"
import { createClient } from '@supabase/supabase-js'
import { updateProfilePhoto } from '@/app/actions/users'
import { getCachedProfilePhoto } from '@/app/utils/cache'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const uploadPhoto = async (formData, userId) => {
  const file = formData.get('file')
  if (!file) return

  let path = `${userId}/${file.name}`
  const { error } = await supabaseAdmin.storage
    .from("avatars")
    .upload(path, file, { upsert: true })

  if (error) {
    return { status: 500, message: "Upload failed" }
  }

  await updateProfilePhoto(path)
  revalidatePath('/', 'layout')
  revalidatePath('/changeAvatar')
}

export const getPhoto = async () => {
  let cookieStore = await cookies()
  let userId = Number(cookieStore.get('id')?.value)
  if (!userId) return "/profilePhoto.jpg"
  return getCachedProfilePhoto(userId)
}
