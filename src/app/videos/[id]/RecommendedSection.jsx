'use client'
import SmallVideo from "@/app/components/SmallVideo";
import Video from "@/app/components/Video";
const RecommendedSection = ({ videos }) => {
    const thumbnailUrl=(t)=>"/thumbnails/thumbnail"+String(t)+".jpg"

  return (
    <aside className="w-full lg:w-1/3 flex flex-col gap-4">
      {/* Desktop: vertical list */}
      <div className="hidden lg:flex flex-col gap-4">
        {videos.map((v, index) => (
          <SmallVideo key={index} name={v.uploader.username} title={v.title} 
                description={v.description} duration={v.duration} 
                date={v.createdAt} imgUrl={thumbnailUrl(v.thumbnail)}
                id={v.id} />
        ))}
      </div>

      {/* Mobile/Tablet: horizontal scrollable list */}
      <div className="flex lg:hidden overflow-x-auto gap-4 py-2">
        {videos.map((v, index) => (
          <div key={index} className="flex-shrink-0 w-60">
            <Video video={v} />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RecommendedSection;
