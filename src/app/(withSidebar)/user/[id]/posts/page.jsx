import React from 'react'
import ProfileHeader from '../ProfileHeader'

const page = async ({params}) => {
  let {id}=await params
  return (
    <div>
      <ProfileHeader id={id} activeTab={"posts"}></ProfileHeader>
      <span className='inline-block relative top-[40%] mx-auto text-gray-400 text-2xl'>
        No Posts Available
      </span>
    </div>
  )
}

export default page

