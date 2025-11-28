import PlaceHolder from "@/app/components/PlaceHolder";
import VideoCard from "./VideoCard";
import WatchLaterBanner from "./WatchLaterBanner";

export default function VideoGrid({ videos,title,isResult=false }) {
  console.log(videos)
  return (
    <div className="grid grid-cols-1 gap-6 relative min-h-[70vh]">
      {/* {videos.length>0 && */}
      {!isResult &&
      <WatchLaterBanner firstVideo={videos[0]} title={title} count={videos.length}/>
      }
      {/* } */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-6 px-4">
        
      {videos.length > 0 &&
        videos.map((v) => <VideoCard key={v.id} video={v}/>)}

      {videos.length==0 && 
        <PlaceHolder/>
      }
          </div>
    </div>
  );
}
