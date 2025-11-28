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

  return (
    <section className="w-full text-neutral-100 flex flex-col gap-6 px-4 md:px-8 lg:px-16 mt-6">
      <h2 className="font-semibold text-lg">{comments.length} Comments</h2>
      <form action={submitComment} >
       <input type="text" name="comment" placeholder="Add a comment" className=" border-b p-1 border-neutral-500 focus:border-neutral-100 focus:outline-none block w-[90%] mx-auto rounded-sm "/>
       <input type="hidden" name="videoId" value={videoId}/>
      </form>

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
