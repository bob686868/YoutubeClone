"use server"
import { createClient } from '@supabase/supabase-js'

import { getProfilePhoto, updateProfilePhoto } from '@/app/actions/users'
import { getCachedProfilePhoto } from '@/app/utils/cache'
import { cookies } from 'next/headers'
import { revalidatePath, revalidateTag } from 'next/cache'
const supabaseAdmin=createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
     process.env.SUPABASE_SERVICE_ROLE_KEY
)
export  const uploadPhoto = async(formData,userId)=>{
    const file=formData.get('file')
    if(!file)return 
    let path=`${userId}/${file.name}`
    console.log(userId)
    const {data,error}= await supabaseAdmin.storage
    .from("avatars")
    .upload(path,file,{upsert:true})
    console.log(error)
    await updateProfilePhoto(path)
    revalidateTag('profilePhoto')
    revalidatePath('changeAvatar')
  }

export const getPhoto = async()=>{
    let userId=Number((await cookies()).get('id').value)
    return (await getCachedProfilePhoto(userId))
}