import { getVideosOfWatchLater } from "@/app/actions/watchLater";
import VideoGrid from "./VideoGrid";

export default async function WatchLaterPage() {
  let { watchLater } = await getVideosOfWatchLater();
  return (
    <div className="min-h-screen bg-black py-6 rounded-md text-white">
      <div className="flex">
        <main className="flex-1 md:ml-5 p-4 ">
          {/* <h1 className="text-xl sm:text-2xl font-semibold mb-4">
            Watch Later
          </h1> */}
          <VideoGrid videos={watchLater.videos} title={"Watch Later"} />
        </main>
      </div>
    </div>
  );
}
