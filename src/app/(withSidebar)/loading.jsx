const SkeletonVideoCard = () => {
  return (
    <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg border border-gray-200">
      {/* Thumbnail */}
      <div className="bg-gray-300 h-48 w-full rounded-t-lg relative overflow-hidden animate-shimmer bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-[length:200%_100%]"></div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Video title */}
        <div className="h-4 bg-gray-300 rounded w-3/4 animate-shimmer"></div>

        {/* Channel name */}
        <div className="h-3 bg-gray-300 rounded w-1/2 animate-shimmer"></div>

        {/* Views and date */}
        <div className="flex space-x-2">
          <div className="h-3 bg-gray-300 rounded w-1/4 animate-shimmer"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default function Loading() {
  // You can return multiple skeleton cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonVideoCard key={i} />
      ))}
    </div>
  );
}
