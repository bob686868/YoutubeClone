import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { BsPlayBtn } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { BsFire } from "react-icons/bs";
import { BsMusicNoteList } from "react-icons/bs";
import { BsTrophy } from "react-icons/bs";
import { BsBroadcast } from "react-icons/bs";
import { BsNewspaper } from "react-icons/bs";
import { BsLightningCharge } from "react-icons/bs";
import { BsShop } from "react-icons/bs";
import { BsCameraVideo } from "react-icons/bs";
import { BsMusicNote } from "react-icons/bs";
import { BsController } from "react-icons/bs";
import { BsTv } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import { BsTrophyFill } from "react-icons/bs";
import { BsLightning } from "react-icons/bs";

export const sidebarData = [
  {
    section: "Main",
    items: [
      { icon: IoMdHome, text: "Home" },
      { icon: SiYoutubeshorts, text: "Shorts" },
      { icon: MdOutlineSubscriptions, text: "Subscriptions" },
    ]
  },
  {
    section: "You",
    items: [
      { icon: MdOutlineVideoLibrary, text: "Library" },
      { icon: BsClockHistory, text: "History" },
      { icon: BsPlayBtn, text: "Your videos" },
      { icon: BsClock, text: "Watch later" },
      { icon: BsChevronDown, text: "Show more" },
    ]
  },
  {
    section: "Subscriptions",
    items: [
      { icon: BsFire, text: "Trending" },
      { icon: BsMusicNoteList, text: "Music" },
      { icon: BsTrophy, text: "Sports" },
      { icon: BsBroadcast, text: "Live" },
      { icon: BsNewspaper, text: "News" },
    ]
  },
  {
    section: "Explore",
    items: [
      { icon: BsLightningCharge, text: "Trending" },
      { icon: BsShop, text: "Shopping" },
      { icon: BsMusicNote, text: "Music" },
      { icon: BsCameraVideo, text: "Movies & Shows" },
      { icon: BsController, text: "Gaming" },
      { icon: BsTv, text: "Live" },
      { icon: BsTrophyFill, text: "Sports" },
      { icon: BsLightning, text: "Learning" },
    ]
  },
  {
    section: "More from YouTube",
    items: [
      { icon: BsTv, text: "YouTube Premium" },
      { icon: BsCameraVideo, text: "YouTube Studio" },
      { icon: BsMusicNote, text: "YouTube Music" },
      { icon: BsTv, text: "YouTube Kids" },
      { icon: BsTv, text: "YouTube TV" },
    ]
  },
  {
    section: "Settings",
    items: [
      { icon: BsTv, text: "Settings" },
      { icon: BsTv, text: "Report history" },
      { icon: BsTv, text: "Help" },
      { icon: BsTv, text: "Send feedback" },
    ]
  }
]; 