import VideoCard from "./VideoCard";
import WatchLaterBanner from "./WatchLaterBanner";

export default function VideoGrid({ videos }) {
  return (
    <div className="grid grid-cols-1 gap-6 relative min-h-[70vh]">
      {/* {videos.length>0 && */}
      <WatchLaterBanner firstVideo={videos[0]}/>
      {/* } */}
      {videos.length > 0 &&
        videos.map((v) => <VideoCard key={v.id} video={v}/>)}

      {/* {videos.length==0 && 
          <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] text-2xl text-gray-400">No videos available</div>
          } */}
    </div>
  );
}
