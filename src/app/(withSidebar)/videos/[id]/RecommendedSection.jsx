'use client'
import SmallVideo from "@/app/components/SmallVideo";
import Video from "@/app/components/Video";
const RecommendedSection = ({ videos }) => {
    const thumbnailUrl=(t)=>"/thumbnails/thumbnail"+String(t)+".jpg"

  return (
    // <aside className="w-full lg:w-1/3 flex flex-col gap-4">

      <div className="grid grid-cols-2 mt-2 lg:grid-cols-3  overflow-x-auto gap-1 py-2">
        {videos.map((v, index) => (
          // <div key={index} className="flex-shrink-0 w-60">
            <Video video={v} />
          
        ))}
      </div>
    // </aside>
  );
};

export default RecommendedSection;
