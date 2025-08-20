'use client';

const IconButton = ({ icon: Icon, text, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
    >
      {/* The Icon component is rendered using JSX syntax */}
      <Icon size={20} />
      {text && <span>{text}</span>}
    </button>
  );
};

export default IconButton; 