export default function CommentCard({ user, text, likes, createdAt }) {
  return (
    <div className="flex gap-3 mb-4">
      {/* Avatar */}
      <Image
        src="/profilePhoto.jpg"
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Comment content */}
      <div className="flex flex-col">
        <p className="text-sm">
          <span className="font-medium mr-1">{user}</span>
          <span className="text-gray-600">{text}</span>
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
          <span>{likes} likes</span>
          <span>{createdAt}</span>
          <button className="hover:underline">Reply</button>
        </div>
      </div>
    </div>
  );
}
