import React from 'react'
import ProfileHeader from '../ProfileHeader'

const page = async ({params}) => {
  let {id}=await params
  return (
    <div className='bg-neutral-900 min-h-full px-4 relative'>
      <ProfileHeader id={id} activeTab={"posts"}></ProfileHeader>
      <span className=' absolute top-[50%] left-[50%] -translate-x-[50%] mx-auto text-neutral-300 text-2xl'>
        No Posts Available
      </span>
    </div>
  )
}

export default page

