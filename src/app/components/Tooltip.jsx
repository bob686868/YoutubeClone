import React from 'react'

const Tooltip = ({ text, position = 'bottom' }) => {
  return (
    <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-2 z-50">
      <div className="bg-[#606060] text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-lg">
        {text}
        <div className="absolute w-2 h-2 bg-[#606060] transform rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  )
}

export default Tooltip