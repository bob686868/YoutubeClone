import { getVideosOfWatchLater } from "@/app/actions/watchLater";
import VideoGrid from "./VideoGrid";

export default async function WatchLaterPage() {
  let { watchLater } = await getVideosOfWatchLater();
  return (
    <div className="min-h-screen bg-black  text-white">
      <div className="flex">
        <main className="flex-1 md:ml-5 p-4 sm:p-6">
          {/* <h1 className="text-xl sm:text-2xl font-semibold mb-4">
            Watch Later
          </h1> */}
          <VideoGrid videos={watchLater.videos} />
        </main>
      </div>
    </div>
  );
}
