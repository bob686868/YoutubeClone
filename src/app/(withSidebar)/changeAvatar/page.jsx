import React from "react";
import ClientPage from "./ClientPage";
import { cookies } from "next/headers";
import { getProfilePhoto } from "@/app/actions/users";
const page = async () => {
  const userId = Number((await cookies()).get("id").value);
  const { profilePhoto } = await getProfilePhoto(userId);
  console.log(profilePhoto);

  return (
    <div>
      <ClientPage profilePhoto={profilePhoto} userId={userId} />
    </div>
  );
};

export default page;
