import React from 'react'

const Option = ({ options, menuRef, position }) => (
  <div
    ref={menuRef}
    className={`absolute right-0 ${position === 'top' ? 'bottom-8' : 'top-8'} min-w-[200px] bg-white shadow-lg rounded-md z-50 p-2 flex flex-col`}
  >
    {options.map((opt, idx) => (
      <div key={idx} className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer rounded">
        {opt.icon}
        <span className="text-sm">{opt.label}</span>
      </div>
    ))}
  </div>
);

export default Option
