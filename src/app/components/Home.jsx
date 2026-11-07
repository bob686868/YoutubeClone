"use client";
import React, { useState, useRef, useEffect } from "react";
import Video from "../components/Video";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Tag from "../components/Tag";

export const dynamic = "force-dynamic";

export default function Home({ tags = [], videos = [] }) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [selectedTag, setSelectedTag] = useState("All");
  const tagContainerRef = useRef(null);

  const checkScroll = () => {
    if (tagContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tagContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = tagContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
    };
  }, [tags]);

  const scroll = (direction) => {
    if (tagContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        tagContainerRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);
      tagContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const allTags = [{ id: "all", name: "All" }, ...tags];

  const filteredVideos =
    selectedTag === "All"
      ? videos
      : videos.filter((v) =>
          v.tags?.some((t) => t.name.toLowerCase() === selectedTag.toLowerCase())
        );

  return (
    <div className="w-full">
      {/* Category Pills Bar with Sticky Navigation and Smooth Edge Fades */}
      <div className="sticky top-14 z-20 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/5 py-2">
        <div className="relative flex items-center px-4">
          {/* Left Arrow with Fade Gradient */}
          {showLeftArrow && (
            <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-3 pr-8 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/90 to-transparent pointer-events-auto">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 text-white pressable transition-colors"
              >
                <IoChevronBack size={18} />
              </button>
            </div>
          )}

          {/* Tags Scrollable Track */}
          <div
            ref={tagContainerRef}
            className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide py-1 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {allTags.map((t) => (
              <Tag
                key={t.id}
                name={t.name}
                active={selectedTag === t.name}
                onClick={() => setSelectedTag(t.name)}
              />
            ))}
          </div>

          {/* Right Arrow with Fade Gradient */}
          {showRightArrow && (
            <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center pr-3 pl-8 bg-gradient-to-l from-[#0f0f0f] via-[#0f0f0f]/90 to-transparent pointer-events-auto">
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 text-white pressable transition-colors"
              >
                <IoChevronForward size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Responsive Video Feed Grid - YouTube Standard Sizes */}
      <div className="p-4 sm:p-6 lg:p-8">
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 sm:gap-x-5 gap-y-8 sm:gap-y-10">
            {filteredVideos.map((v) => (
              <Video key={v.id} video={v} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
            <p className="text-lg font-medium">No videos found for this topic</p>
            <button
              onClick={() => setSelectedTag("All")}
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-full text-sm font-medium transition-colors"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
