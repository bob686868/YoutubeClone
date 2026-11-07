// "use client";
// import Image from "next/image";
// import React, { useEffect, useState, useRef } from "react";
// import { uploadPhoto, getPhoto } from "./actions.js";

// const page = ({ profilePhoto, userId }) => {
//   const [photo, setPhoto] = useState(null);
//   const [swiitch, setSwitch] = useState(false);
//   const fileRef = useRef(null);
//   const uploadPhotoHandler = async (formData) => {
//   await uploadPhoto(formData, userId);
//     setSwitch((prev) => !prev);
//   };
//   function handleClick() {
//     fileRef.current.click();
//   }
//   function handeChange(e) {
//     let file = e.target.files[0];
//     const fileUrl = URL.createObjectURL(file);
//     setPhoto(fileUrl);
//   }
//   useEffect(() => {
//     const fetchPhoto = async () => {
//       const data = await getPhoto();
//       setPhoto(data.profilePhoto);
//     };
//     fetchPhoto();
//   }, [swiitch]);

//   return (
//     <div className="p-2 text-neutral-200">
//       <h1 className="p-2 ">Channel Customization</h1>
//       <div>
//         <div className="text-2xl font-bold">Profile</div>
//         <div className="text-neutral-500 text-sm mb-2">
//           Your profile picture will appear where your channel is presented on
//           YouTube, like next to your videos and comments
//         </div>
//       </div>
//       <div className="flex gap-x-2">
//         <div className="w-[30%] bg-neutral-900 py-4 rounded-md">
//           <Image
//             width={150}
//             height={150}
//             src={photo ? photo : profilePhoto}
//             className="rounded-full w-35 h-35 mx-auto"
//           />
//         </div>
//         <form action={uploadPhotoHandler} className="w-[40%] ml-2">
//           <p className="text-neutral-500 text-sm mb-2">
//             It’s recommended to use a picture that’s at least 98 x 98 pixels and
//             4MB or less. Use a PNG or GIF (no animations) file.
//           </p>
//           {!photo && (
//             <button
//               type="button"
//               className="bg-neutral-700 hover:bg-neutral-600 cursor-pointer rounded-full px-2 py-1"
//               onClick={handleClick}
//             >
//               upload
//             </button>
//           )}
//           <input
//             type="file"
//             name="file"
//             className="bg-neutral-600 hidden"
//             ref={fileRef}
//             onChange={handeChange}
//           />

//           {photo && (
//             <div>
//               <button className="bg-neutral-700 hover:bg-neutral-600 cursor-pointer rounded-full px-2 py-1 mr-3">
//                 Change
//               </button>
//               <button
//                 className="bg-neutral-700 hover:bg-neutral-600 cursor-pointer rounded-full px-2 py-1"
//                 type="button"
//                 onClick={() => setPhoto(null)}
//               >
//                 Remove
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default page;

"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef, useTransition } from "react";
import { uploadPhoto, getPhoto } from "./actions.js";
import { BiCloudUpload, BiTrash, BiUserCircle } from "react-icons/bi";
import toast from "react-hot-toast";

const ChannelCustomization = ({ profilePhoto, userId }) => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPending, startTransition] = useTransition();
  const fileRef = useRef(null);

  // Fetch actual photo on mount
  useEffect(() => {
    const fetchPhoto = async () => {
      const data = await getPhoto();
      if (data?.profilePhoto) setPreview(data.profilePhoto);
    };
    fetchPhoto();
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("File is too large (Max 4MB)");
        return;
      }
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!photo) return;
    const formData = new FormData();
    formData.append("file", photo);

    startTransition(async () => {
      try {
        await uploadPhoto(formData, userId);
        toast.success("Profile picture updated!");
        setPhoto(null); // Clear selection state but keep preview
      } catch (err) {
        toast.error("Upload failed");
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 text-white min-h-screen">
      {/* Header Area */}
      <div className="border-b border-white/10 pb-6 mb-8">
        <h1 className="text-3xl font-black tracking-tight">
          Channel Customization
        </h1>
        <p className="text-neutral-400 mt-2">
          Manage your channel's public identity and branding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Navigation Sidebar (Visual only for now) */}
        <div className="lg:col-span-3 space-y-2">
          <nav className="flex flex-col space-y-1">
            {["Layout", "Branding", "Basic Info"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-left rounded-lg text-sm font-bold transition-all ${
                  tab === "Branding"
                    ? "bg-white/10 text-white"
                    : "text-neutral-500 hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-8">
          <section className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Picture</h2>
              <p className="text-neutral-500 text-sm mt-1">
                Your profile picture will appear where your channel is presented
                on the platform.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Preview Circle */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-neutral-800 bg-neutral-800 flex items-center justify-center shadow-2xl relative">
                  {preview || profilePhoto ? (
                    <Image
                      src={preview || profilePhoto}
                      fill
                      className="object-cover"
                      alt="Avatar"
                    />
                  ) : (
                    <BiUserCircle className="text-neutral-600 size-24" />
                  )}
                </div>
              </div>

              {/* Action Buttons & Specs */}
              <div className="flex-1 space-y-4">
                <p className="text-neutral-500 text-xs leading-relaxed max-w-sm">
                  Recommended: Use a picture that’s at least 98 x 98 pixels. PNG
                  or GIF (no animations) files only. Max size 4MB.
                </p>

                <div className="flex flex-wrap gap-3">
                  <input
                    type="file"
                    name="file"
                    className="hidden"
                    ref={fileRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                  />

                  <button
                    onClick={() => fileRef.current.click()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full font-bold text-sm transition-all active:scale-95"
                  >
                    <BiCloudUpload className="text-xl" />
                    {preview ? "Change" : "Upload"}
                  </button>

                  {preview && (
                    <button
                      onClick={() => {
                        setPreview(null);
                        setPhoto(null);
                      }}
                      className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-5 py-2 rounded-full font-bold text-sm transition-all"
                    >
                      <BiTrash />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Sticky Footer for Saving */}
          {photo && (
            <div className="fixed bottom-8 right-8 left-8 md:left-auto md:w-96 bg-blue-600 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom-10 duration-500 flex items-center justify-between gap-4 border border-white/20">
              <span className="text-sm font-bold">
                You have unsaved changes
              </span>
              <button
                onClick={handleUpload}
                disabled={isPending}
                className="bg-white text-blue-600 px-6 py-2 rounded-full font-black text-sm hover:bg-neutral-100 disabled:opacity-50 transition-all"
              >
                {isPending ? "Publishing..." : "Publish"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelCustomization;
