import Comment from "./Comment";
import { addComment, getComments } from "@/app/actions/comments";
const CommentSection =async  ({ videoId }) => {
    async function submitComment(formData){
      "use server"
      let data=formData.get('comment')
      let videoId=formData.get('videoId')
      console.log('submitting comment')
      await addComment(data,videoId)
    }
    let {comments}=await getComments(videoId)

//     const comments = [
//   {
//     avatar: "https://i.pravatar.cc/40?img=1",
//     username: "John Doe",
//     time: "2 hours ago",
//     text: "This is an awesome video!",
//     likes: 12,
//   },
//   {
//     avatar: "https://i.pravatar.cc/40?img=2",
//     username: "Jane Smith",
//     time: "1 day ago",
//     text: "Thanks for sharing this!",
//     likes: 5,
//   },
// ];

  return (
    <section className="w-full flex flex-col gap-6 px-4 md:px-8 lg:px-16 mt-6">
      <form action={submitComment} >
       <input type="text" name="comment" className="border"/>
       <input type="hidden" name="videoId" value={videoId}/>
      </form>
      <h2 className="font-semibold text-lg">{comments.length} Comments</h2>

      <div className="flex flex-col gap-4">
        {comments.length>0 && comments.map((c, index) => (
          <Comment
            key={c.id}
            profilePhoto={c.user.profilePhoto}
            username={c.user.username}
            time={c.createdAt}
            text={c.text}
            likesCount={c.likesCount}
            commentId={c.id}
            isLikedByMe={c.likedByMe}
          />
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
