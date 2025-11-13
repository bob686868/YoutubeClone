import React from 'react'

const Tag = ({ name, active }) => {
  return (
    <div className={`rounded-md px-3 py-1.5 whitespace-nowrap ${active ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
      {name}
    </div>
  )
}

export default Tag
