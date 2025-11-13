import React from 'react'
import ProfileHeader from '../ProfileHeader'

const page = async ({params}) => {
  let {id}=await params
  return (
    <div>
      <ProfileHeader id={id} activeTab={"shorts"}></ProfileHeader>
      <span className=' relative inline-block top-[40%] mx-auto text-gray-400 text-2xl'>
        No Shorts Available
      </span>
    </div>
  )
}

export default page
