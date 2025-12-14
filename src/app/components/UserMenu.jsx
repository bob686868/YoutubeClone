"use client";
import React, { useEffect, useState,useRef } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
// import { logout } from '../actions/users';

const UserMenu = ({ username,profilePhoto,logout }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
  let extraClasses = !isVisible ? "hidden" : "block";
  let id=useRef(null);
  let menuRef = useRef(null);
  const mouseEnterHandler = () => {
    id.current = setTimeout(() => setIsToolTipVisible(true), 1000);
  };
  const mouseLeaveHandler = () => {
    setIsToolTipVisible(false);
    clearTimeout(id.current);
  };
  const logoutHandler = () => {
    logout();
  };
  const toggleVisible = () => setIsVisible((prev) => !prev);
  function handleClickOutside(e) {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsVisible(false);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });
  return (
    <div className="relative">
      <Image
      src={profilePhoto}
      width={50}
      height={50}
        className="w-8 h-8 rounded-full cursor-pointer bg-gray-200 ml-2"
        onClick={toggleVisible}
      ></Image>

      <div
        className={`absolute ${extraClasses} top-2 right-2 w-60 py-4 bg-neutral-900 rounded-md`}
        ref={menuRef}
      >
        <header className="flex gap-x-2 pb-3  px-4 border-b border-neutral-400">
          <Image 
              src={profilePhoto}
              width={50}
              height={50}
              className="w-11 h-11  rounded-full bg-gray-200 "
            />



          <div>
            <div className="">{username || "ibrahim"}</div>
            <div className="mb-3">@{username || "ibrahim"}-h5o</div>
            <Link
              href={`/changeAvatar`}
              className="text-blue-400  cursor-pointer relative"
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              View your channel
            {isToolTipVisible && <div className="absolute top-4 left-14 w-27 p-1 bg-neutral-900 text-neutral-100  text-xs transition duration-100 border border-neutral-300">view your channel</div>}
            </Link>
          </div>
        </header>

        <form action={logoutHandler}>
          <div className=" py-2 px-4 flex mt-1 items-center hover:bg-neutral-700 cursor-pointer ">
            <FaSignOutAlt className="mr-2 " />
            <button className="cursor-pointer">Sign out</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserMenu;
