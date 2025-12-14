
import { Search, Mic, Bell, Video, User } from "lucide-react";
import Image from "next/image";
import { searchVideosFrontEnd } from "./actions";
import UserMenu from "../components/UserMenu";

export default function Navbar() {
  return (
<nav className="flex h-14 items-center justify-between w-full px-4 lg:px-6 bg-neutral-800">
      {/* Left section (Logo) */}
      <div className="hidden lg:flex items-center space-x-2">
        <Image
          src="/youtube-logo.svg"
          alt="YouTube Logo"
          width={30}
          height={30}
          className="cursor-pointer"
        />
        <h1 className="text-xl font-semibold tracking-tight">YouTube</h1>
      </div>

      {/* Middle section (Search bar) */}
      <div className="flex flex-1 justify-center max-w-[600px]">
        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
          <form
            action={searchVideosFrontEnd}
            className="flex items-center w-full border border-gray-300 rounded-full overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search"
              name="searchText"
              className="w-[20px] inline px-4 py-2 outline-none text-sm"
            />
            
            <button
              type="submit"
              className="bg-neutral-700 w-5px-4 py-2 border-l border-neutral-700 hover:bg-neutral-600"
            >
              <Search size={20} />
            </button>
          </form>

        </div>
        <button className="ml-3 bg-neutral-700 hover:bg-neutral-700 p-2 rounded-full">
          <Mic size={20} />
        </button>
      </div>

      {/* Right section (Icons) */}
      <div className="flex items-center space-x-4 ml-4">
        <button className="p-2 hover:bg-neutral-700 rounded-full">
          <Video size={22} />
        </button>
        <button className="p-2 hover:bg-neutral-700 rounded-full relative">
          <Bell size={22} />
          <span className="absolute top-1 right-1 bg-red-600 text-neutral-100 text-[10px] font-semibold px-[4px] rounded-full">
            3
          </span>
        </button>
      
        <UserMenu/>
      </div>
    </nav>
  );
}
