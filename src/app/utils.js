
import { PrismaClient } from '@prisma/client'

export  function timeAgo(date) {

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const units = [
    { label: "year", seconds: 365 * 24 * 60 * 60 },
    { label: "month", seconds: 30 * 24 * 60 * 60 },
    { label: "week", seconds: 7 * 24 * 60 * 60 },
    { label: "day", seconds: 24 * 60 * 60 },
    { label: "hour", seconds: 60 * 60 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const value = Math.floor(seconds / unit.seconds);
    if (value >= 1) {
    
      return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export function formatDuration(seconds){
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  let secs = String((seconds % 60)).padStart(2,'0');
  
  if (hrs > 0) {
    return `${hrs}:${mins}:${secs}`;
  } else {
    return `${mins}:${secs}`;
  }
}

export function formatImageUrl(n){
  return `/thumbnails/thumbnail${n}.jpg`
}
export function formatProfileImageUrl(n){
  return `https://i.pravatar.cc/150?img=${n}`

}




const globalForPrisma = globalThis;

const prisma =
  globalThis.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

