import { getVideosOfWatchLater } from "@/app/actions/watchLater";
import VideoGrid from "../watchLater/VideoGrid";
import { getLikedVideos } from "@/app/actions/videos";

export default async function WatchLaterPage() {
  let {user}= await getLikedVideos();
  // console.dir(user, { depth: null, colors: true });
  console.log(user.likes)
  let videos=user.likes.map((l)=>l.video)
  console.dir(videos,{depth:null,colors:true})
  return (
    <div className="min-h-screen bg-white  text-neutral-900">
      <div className="flex">
        <main className="flex-1 md:ml-5 p-4 sm:p-6">
          {/* <h1 className="text-xl sm:text-2xl font-semibold mb-4">
            Liked Videos
          </h1> */}
          <VideoGrid videos={videos} />
        </main>
      </div>
    </div>
  );
}
