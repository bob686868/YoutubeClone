'use client';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Video from "../components/Video";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Tag from "../components/Tag";
import { useState, useRef, useEffect } from 'react';
import Short from "../components/Short";

export const dynamic = 'force-dynamic';

export default function Home({tags,videos}) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const tagContainerRef = useRef(null);
  console.log(videos)

  const checkScroll = () => {
    if (tagContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tagContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = tagContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll(); // Initial check
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (tagContainerRef.current) {
      const scrollAmount = 200; // Adjust this value to control scroll distance
      const newScrollLeft = tagContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      tagContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };


  return (
    <div className="relative">
      {/* <Sidebar /> */}
        <p className="text-pink-400">

        sfdpghsfhiodpgsdhigfop
        </p>
      <div className="ml-[30px]">
        <Header />
        <main className="w-full flex flex-col pt-14">
          <div className="flex items-center relative">
            {showLeftArrow && (
              <div className="absolute left-0 z-10 bg-white h-full flex items-center">
                <button 
                  onClick={() => scroll('left')}
                  className="bg-white rounded-full p-2 hover:bg-gray-100 shadow-md"
                >
                  <IoIosArrowBack className="text-gray-600" size={20} />
                </button>
              </div>
            )}
            
            <div 
              ref={tagContainerRef}
              className="flex gap-x-3 overflow-x-auto scrollbar-hide py-2 px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {tags.length>0 && tags.map((t)=>(
                <Tag name={t.name} id={t.id}/>
              ))}
      
            </div>

            {showRightArrow && (
              <div className="absolute right-0 z-10 bg-white h-full flex items-center">
                <button 
                  onClick={() => scroll('right')}
                  className="bg-white rounded-full p-2 hover:bg-gray-100 shadow-md"
                >
                  <IoIosArrowForward className="text-gray-600" size={20} />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3  gap-x-1 gap-y-3 p-4">
          {videos.length>0 && videos.map((v)=>(

              <Video video={v}/>

          ))}
            {/* <Short/> */}
          </div>
        </main>
      </div>
    </div>
  );
}
