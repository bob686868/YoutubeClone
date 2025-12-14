import { getVideosOfWatchLater } from "@/app/actions/watchLater";
import VideoGrid from "../watchLater/VideoGrid";
import { getLikedVideos } from "@/app/actions/videos";

export default async function WatchLaterPage() {
  let { videos } = await getLikedVideos();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="flex">
        <main className="flex-1 md:ml-5 p-4 sm:p-6 mt-5">
          {/* <h1 className="text-xl sm:text-2xl font-semibold mb-4">
            Liked Videos
          </h1> */}
          <VideoGrid title={"Liked Videos"} videos={videos} />
        </main>
      </div>
    </div>
  );
}
