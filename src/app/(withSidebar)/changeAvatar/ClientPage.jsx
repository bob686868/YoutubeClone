"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { uploadPhoto, getPhoto } from "./actions.js";

const page = ({ profilePhoto, userId }) => {
  const [photo, setPhoto] = useState(null);
  const [swiitch, setSwitch] = useState(false);
  const fileRef = useRef(null);
  const uploadPhotoHandler = async (formData) => {
  await uploadPhoto(formData, userId);
    setSwitch((prev) => !prev);
  };
  function handleClick() {
    fileRef.current.click();
  }
  function handeChange(e) {
    let file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setPhoto(fileUrl);
  }
  useEffect(() => {
    const fetchPhoto = async () => {
      const data = await getPhoto();
      setPhoto(data.profilePhoto);
    };
    fetchPhoto();
  }, [swiitch]);

  return (
    <div className="p-2 text-neutral-200">
      <h1 className="p-2 ">Channel Customization</h1>
      <div>
        <div className="text-2xl font-bold">Profile</div>
        <div className="text-neutral-500 text-sm mb-2">
          Your profile picture will appear where your channel is presented on
          YouTube, like next to your videos and comments
        </div>
      </div>
      <div className="flex gap-x-2">
        <div className="w-[30%] bg-neutral-900 py-4 rounded-md">
          <Image
            width={150}
            height={150}
            src={photo ? photo : profilePhoto}
            className="rounded-full w-35 h-35 mx-auto"
          />
        </div>
        <form action={uploadPhotoHandler} className="w-[40%] ml-2">
          <p className="text-neutral-500 text-sm mb-2">
            It’s recommended to use a picture that’s at least 98 x 98 pixels and
            4MB or less. Use a PNG or GIF (no animations) file.
          </p>
          {!photo && (
            <button
              type="button"
              className="bg-neutral-700 hover:bg-neutral-600 cursor-pointer rounded-full px-2 py-1"
              onClick={handleClick}
            >
              upload
            </button>
          )}
          <input
            type="file"
            name="file"
            className="bg-neutral-600 hidden"
            ref={fileRef}
            onChange={handeChange}
          />

          {photo && (
            <div>
              <button className="bg-neutral-700 hover:bg-neutral-600 cursor-pointer rounded-full px-2 py-1 mr-3">
                Change
              </button>
              <button
                className="bg-neutral-700 hover:bg-neutral-600 cursor-pointer rounded-full px-2 py-1"
                type="button"
                onClick={() => setPhoto(null)}
              >
                Remove
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default page;
