'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { sidebarData } from '../data/sidebarData.js';
import { IoMdClose } from "react-icons/io";
import { twMerge } from 'tailwind-merge';

const MobileSidebar = ({ isOpen, onClose }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={twMerge(
          "fixed inset-0 bg-black transition-opacity duration-300",
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={twMerge(
          "fixed inset-y-0 left-0 w-64 bg-white z-50 overflow-hidden flex flex-col",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Image 
              src="/youtube.jpg"
              alt="YouTube"
              width={90}
              height={20}
              className="h-5 w-auto"
              priority
            />
            <span className="text-xl font-semibold">YouTube</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <IoMdClose size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {sidebarData.map((section, index) => (
            <div key={index} className="py-2">
              {section.section && (
                <div className="px-4 py-2 text-sm font-medium text-gray-500">
                  {section.section}
                </div>
              )}
              {section.items.map((item, itemIndex) => {
                return (
                  <button
                    key={itemIndex}
                    className="flex items-center gap-6 w-full px-4 py-2 hover:bg-gray-100"
                  >
                    <span className="text-sm">{item.text}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileSidebar; 