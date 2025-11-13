import Image from "next/image";

// Mock data
const videos = [
  {
    id: 1,
    title: "React Tutorial",
    thumbnail: "https://placehold.co/320x180",
    views: "1.2M",
    uploaded: "2 days ago",
  },
  {
    id: 2,
    title: "Tailwind CSS Tips",
    thumbnail: "https://placehold.co/320x180",
    views: "800K",
    uploaded: "1 week ago",
  },
  {
    id: 3,
    title: "JavaScript Tricks",
    thumbnail: "https://placehold.co/320x180",
    views: "500K",
    uploaded: "1 month ago",
  },
];

const posts = [
  { id: 1, content: "Just uploaded a new video! Check it out!" },
  { id: 2, content: "Learning Tailwind is fun 😎" },
];

export default function ProfilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}

      {/* Tabs */}

      {/* Tab Content */}
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id}>
              <Image
                src={video.thumbnail}
                width={5}
                height={5}
                alt={video.title}
                className="w-full rounded-md"
              />
              <h2 className="mt-2 text-sm font-semibold">{video.title}</h2>
              <p className="text-gray-500 text-xs">
                {video.views} views • {video.uploaded}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id}>
              <Image
                src={video.thumbnail}
                width={5}
                height={5}
                alt={video.title}
                className="w-full rounded-md"
              />
              <h2 className="mt-2 text-sm font-semibold">{video.title}</h2>
              <p className="text-gray-500 text-xs">
                {video.views} views • {video.uploaded}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {videos.map((video) => (
            <div key={video.id} className="relative">
              <Image
                src={video.thumbnail}
                width={5}
                height={5}
                alt={video.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <p className="absolute bottom-1 left-1 text-white text-xs bg-black bg-opacity-50 px-1 rounded">
                {video.title}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 border border-gray-200 rounded-md bg-gray-50"
            >
              {post.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
