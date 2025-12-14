"use client";
import React, { useState, useActionState,useRef } from "react";
import Image from "next/image";
import { BiImageAdd } from "react-icons/bi";
import toast from "react-hot-toast";

const UploadVideoClient = ({
  availableTags,
  serverAction,
}) => {
  const [state, formAction] = useActionState(serverAction, { success: false });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState([]);
  const [isShort, setIsShort] = useState(false);

  const fileRef=useRef(null)

  const handleTagChange = (e) => {
    const value = e.target.value;
    if (tags.includes(value)) {
      setTags(tags.filter((tag) => tag !== value));
    } else {
      setTags([...tags, value]);
    }
  };
  function clickHandler(){
    fileRef.current.click()
  }
  function changeHandler(e){
    let file=e.target.files[0]
    let url=URL.createObjectURL(file)
    setThumbnail(url)
  }

  return (
    <div className="min-h-screen text-neutral-100 bg-neutral-950 flex justify-center py-10">
      <div className="bg-neutral-900 w-full max-w-3xl p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Upload Video</h1>

        <form
          action={(formData) => {
            formAction(formData);
            toast.success("Video uploaded successfully!");
          }}
          className="space-y-5"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full border border-neutral-700 bg-neutral-950 text-neutral-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-neutral-200"
            />
          </div>

          {/* Description */}
          <div className="mb-1">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              className="w-full border resize-none border-neutral-700 bg-neutral-950 text-neutral-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-neutral-200"
              rows={4}
            />
          </div>

          {/* Thumbnail */}
          <div className="text-sm font-medium mb-1">Thumbnail</div>
          <input type="file" className="hidden" name="thumbnail" ref={fileRef} onChange={changeHandler}/>
          {!thumbnail &&
          <div className="w-40  p-8 border bg-neutral-950 border-neutral-500 rounded-sm cursor-pointer"  onClick={clickHandler}>
            
              <BiImageAdd className="mx-auto size-8"></BiImageAdd>
              <div className="text-xs text-neutral-400 text-center ">Upload File</div>
              

            
          </div>
          }
          {thumbnail  &&
          <div className="flex gap-x-3 items-center">

              <Image
              src={thumbnail}
              width={50}
              height={50}
              className="w-40 h-36 rounded-md"
              />
              <button type="button" className="bg-neutral-700 hover:bg-neutral-600 cursor-pointer rounded-full py-1 px-2 h-fit" onClick={()=>setThumbnail(null)}>remove</button>
            </div>
          }


          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleTagChange({ target: { value: tag } })}
                  className={`px-3 py-1 rounded-full border text-sm transition ${
                    tags.includes(tag)
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-neutral-950 text-neutral-400 border-neutral-700 hover:bg-neutral-700 hover:text-neutral-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <input type="hidden" name="tags" value={tags.join(",")} />

          {/* Shorts Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="shorts"
              checked={isShort}
              onChange={() => setIsShort(!isShort)}
              className="w-4 h-4 cursor-pointer accent-neutral-200"
            />
            <label htmlFor="shorts" className="text-sm font-medium">
              This is a Short
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer hover:bg-neutral-300 bg-neutral-200  text-neutral-900 font-medium py-2 rounded-md  transition"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideoClient;
