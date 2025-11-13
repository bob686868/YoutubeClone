import Image from "next/image";

export default function Short({
  thumbnail,
  title,
  views,
  duration,
}) {
  return (
    <div className="w-full max-w-[210px] cursor-pointer">
      {/* Thumbnail */}
      <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-[1.03]"
        />
        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[0.75rem] px-1.5 py-0.5 rounded">
          {duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col mt-2">
        <h3
          className="text-sm font-medium text-white leading-snug line-clamp-2"
          title={title}
        >
          {title}
        </h3>
        <p className="text-gray-400 text-[0.875rem] mt-0.5">
          {views} views
        </p>
      </div>
    </div>
  );
}
