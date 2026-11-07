"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdHome,
  MdOutlineHome,
  MdSubscriptions,
  MdOutlineSubscriptions,
  MdHistory,
  MdOutlineWatchLater,
  MdThumbUp,
  MdOutlineThumbUp,
  MdOutlineSlowMotionVideo,
  MdSlowMotionVideo,
  MdOutlinePlaylistPlay,
  MdOutlineSmartDisplay,
  MdOutlineWhatshot,
  MdWhatshot,
  MdOutlineMusicNote,
  MdMusicNote,
  MdOutlineSportsEsports,
  MdSportsEsports,
  MdOutlineNewspaper,
  MdNewspaper,
  MdOutlineEmojiEvents,
  MdEmojiEvents,
  MdOutlinePodcasts,
  MdPodcasts,
  MdOutlineSettings,
  MdOutlineFlag,
  MdOutlineHelpOutline,
  MdOutlineFeedback,
} from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

export default function Sidebar({
  isOpen,
  setIsOpen,
  isWatchPage,
  isCollapsedDesktop,
}) {
  const pathname = usePathname();

  // 1. Primary Nav
  const mainNav = [
    {
      label: "Home",
      href: "/",
      icon: MdOutlineHome,
      activeIcon: MdHome,
      exact: true,
    },
    {
      label: "Shorts",
      href: "/results?searchQuery=shorts",
      icon: MdOutlineSlowMotionVideo,
      activeIcon: MdSlowMotionVideo,
    },
    {
      label: "Subscriptions",
      href: "/subscriptions",
      icon: MdOutlineSubscriptions,
      activeIcon: MdSubscriptions,
    },
  ];

  // 2. You Nav
  const youNav = [
    {
      label: "History",
      href: "/watchHistory",
      icon: MdHistory,
      activeIcon: MdHistory,
    },
    {
      label: "Playlists",
      href: "/watchLater",
      icon: MdOutlinePlaylistPlay,
      activeIcon: MdOutlinePlaylistPlay,
    },
    {
      label: "Watch Later",
      href: "/watchLater",
      icon: MdOutlineWatchLater,
      activeIcon: MdOutlineWatchLater,
    },
    {
      label: "Liked videos",
      href: "/likedVideos",
      icon: MdOutlineThumbUp,
      activeIcon: MdThumbUp,
    },
  ];

  // 3. Explore Nav
  const exploreNav = [
    {
      label: "Trending",
      href: "/results?searchQuery=trending",
      icon: MdOutlineWhatshot,
      activeIcon: MdWhatshot,
    },
    {
      label: "Music",
      href: "/results?searchQuery=music",
      icon: MdOutlineMusicNote,
      activeIcon: MdMusicNote,
    },
    {
      label: "Gaming",
      href: "/results?searchQuery=gaming",
      icon: MdOutlineSportsEsports,
      activeIcon: MdSportsEsports,
    },
    {
      label: "News",
      href: "/results?searchQuery=news",
      icon: MdOutlineNewspaper,
      activeIcon: MdNewspaper,
    },
    {
      label: "Sports",
      href: "/results?searchQuery=sports",
      icon: MdOutlineEmojiEvents,
      activeIcon: MdEmojiEvents,
    },
    {
      label: "Podcasts",
      href: "/results?searchQuery=podcasts",
      icon: MdOutlinePodcasts,
      activeIcon: MdPodcasts,
    },
  ];

  // 4. More From YouTube
  const moreFromYoutube = [
    { label: "YouTube Premium", href: "#", icon: FaYoutube, color: "text-red-500" },
    { label: "YouTube Studio", href: "#", icon: FaYoutube, color: "text-red-500" },
    { label: "YouTube Music", href: "#", icon: FaYoutube, color: "text-red-500" },
    { label: "YouTube Kids", href: "#", icon: FaYoutube, color: "text-red-500" },
  ];

  // 5. Settings & Help
  const settingsNav = [
    { label: "Settings", href: "#", icon: MdOutlineSettings },
    { label: "Report history", href: "#", icon: MdOutlineFlag },
    { label: "Help", href: "#", icon: MdOutlineHelpOutline },
    { label: "Send feedback", href: "#", icon: MdOutlineFeedback },
  ];

  const isLinkActive = (item) => {
    if (item.exact) return pathname === item.href;
    if (item.href === "#") return false;
    return pathname.startsWith(item.href);
  };

  const isDrawerMode = isWatchPage;

  // Reusable Nav List Renderer
  const renderNavSection = (items, onLinkClick) => {
    return items.map((item) => {
      const active = isLinkActive(item);
      const Icon = active && item.activeIcon ? item.activeIcon : item.icon;
      return (
        <Link
          key={item.label}
          href={item.href}
          onClick={onLinkClick}
          className={`flex items-center gap-5 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 pressable ${
            active
              ? "bg-white/10 font-semibold text-white"
              : "text-neutral-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Icon
            size={21}
            className={
              item.color
                ? item.color
                : active
                ? "text-white"
                : "text-neutral-400"
            }
          />
          <span className="truncate">{item.label}</span>
        </Link>
      );
    });
  };

  return (
    <>
      {/* 1. Backdrop Overlay for Drawer (Mobile or Watch Page) */}
      {(isDrawerMode ? isOpen : isOpen) && (
        <div
          onClick={() => setIsOpen(false)}
          className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-200 ${
            !isDrawerMode ? "lg:hidden" : ""
          }`}
          aria-hidden="true"
        />
      )}

      {/* 2. DRAWER SIDEBAR (Mobile or Watch Page) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#0f0f0f] text-[#f1f1f1] z-50 flex flex-col shadow-2xl transition-transform duration-250 ease-[cubic-bezier(0.2,0,0,1)] border-r border-white/10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${!isDrawerMode ? "lg:hidden" : ""}`}
      >
        {/* Drawer Header with Hamburger & Logo */}
        <div className="h-14 flex items-center px-4 gap-4 border-b border-white/5 shrink-0">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="p-2 hover:bg-white/10 rounded-full cursor-pointer pressable text-neutral-200"
          >
            <IoMenu size={22} />
          </button>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-1 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={28}
              height={28}
            >
              <path
                d="M23.498 6.186a2.997 2.997 0 0 0-2.116-2.118C19.673 3.5 12 3.5 12 3.5s-7.674 0-9.382.568A2.997 2.997 0 0 0 .502 6.186C0 7.894 0 12 0 12s0 4.106.502 5.814a2.997 2.997 0 0 0 2.116 2.118C4.327 20.5 12 20.5 12 20.5s7.674 0 9.382-.568a2.997 2.997 0 0 0 2.116-2.118C24 16.106 24 12 24 12s0-4.106-.502-5.814z"
                fill="#FF0000"
              />
              <path d="M9.75 15.02V8.98l6.5 3.02-6.5 3.02z" fill="#FFFFFF" />
            </svg>
            <span className="text-lg font-semibold tracking-tighter text-white">
              YouTube
            </span>
          </Link>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-3 space-y-1">
          {renderNavSection(mainNav, () => setIsOpen(false))}

          <div className="h-px bg-white/10 my-3 mx-1" />

          <div className="px-3 py-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            You
          </div>
          {renderNavSection(youNav, () => setIsOpen(false))}

          <div className="h-px bg-white/10 my-3 mx-1" />

          <div className="px-3 py-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Explore
          </div>
          {renderNavSection(exploreNav, () => setIsOpen(false))}

          <div className="h-px bg-white/10 my-3 mx-1" />

          <div className="px-3 py-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            More from YouTube
          </div>
          {renderNavSection(moreFromYoutube, () => setIsOpen(false))}

          <div className="h-px bg-white/10 my-3 mx-1" />

          {renderNavSection(settingsNav, () => setIsOpen(false))}

          {/* YouTube Footer Links */}
          <div className="px-3 pt-4 pb-6 text-[11px] text-neutral-500 space-y-3 leading-relaxed">
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <span>About</span>
              <span>Press</span>
              <span>Copyright</span>
              <span>Contact us</span>
              <span>Creators</span>
              <span>Advertise</span>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <span>Terms</span>
              <span>Privacy</span>
              <span>Policy & Safety</span>
            </div>
            <p className="text-neutral-600 font-medium pt-1">
              © 2026 YouTube Clone
            </p>
          </div>
        </div>
      </aside>

      {/* 3. DOCKED DESKTOP SIDEBAR (When NOT on watch page) */}
      {!isWatchPage && (
        <>
          {/* Mini Sidebar on Desktop when collapsed */}
          {isCollapsedDesktop ? (
            <aside className="hidden lg:flex fixed top-14 left-0 bottom-0 w-[72px] bg-[#0f0f0f] border-r border-white/5 flex-col items-center py-2 z-30 select-none">
              <div className="flex flex-col gap-1 w-full px-1">
                {[...mainNav.slice(0, 3), youNav[0], youNav[2]].map((item) => {
                  const active = isLinkActive(item);
                  const Icon = active && item.activeIcon ? item.activeIcon : item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex flex-col items-center justify-center py-3.5 rounded-xl text-[10px] gap-1.5 transition-all duration-150 pressable ${
                        active
                          ? "text-white font-medium bg-white/10"
                          : "text-neutral-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon size={22} />
                      <span className="truncate max-w-[64px]">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </aside>
          ) : (
            /* Full Expanded Sidebar on Desktop */
            <aside className="hidden lg:flex fixed top-14 left-0 bottom-0 w-60 bg-[#0f0f0f] border-r border-white/5 flex-col z-30 select-none overflow-y-auto scrollbar-thin">
              <div className="py-3 px-2 space-y-1">
                {renderNavSection(mainNav)}

                <div className="h-px bg-white/10 my-3 mx-1" />

                <div className="px-3 py-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  You
                </div>
                {renderNavSection(youNav)}

                <div className="h-px bg-white/10 my-3 mx-1" />

                <div className="px-3 py-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Explore
                </div>
                {renderNavSection(exploreNav)}

                <div className="h-px bg-white/10 my-3 mx-1" />

                <div className="px-3 py-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  More from YouTube
                </div>
                {renderNavSection(moreFromYoutube)}

                <div className="h-px bg-white/10 my-3 mx-1" />

                {renderNavSection(settingsNav)}

                {/* YouTube Footer Links */}
                <div className="px-3 pt-4 pb-8 text-[11px] text-neutral-500 space-y-3 leading-relaxed">
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <span>About</span>
                    <span>Press</span>
                    <span>Copyright</span>
                    <span>Contact us</span>
                    <span>Creators</span>
                  </div>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <span>Terms</span>
                    <span>Privacy</span>
                    <span>Policy & Safety</span>
                  </div>
                  <p className="text-neutral-600 font-medium pt-1">
                    © 2026 YouTube Clone
                  </p>
                </div>
              </div>
            </aside>
          )}
        </>
      )}
    </>
  );
}
