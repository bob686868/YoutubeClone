import HeaderWithSidebar from "./HeaderWithSidebar";
import { getCachedProfilePhoto, getCachedUsername } from "../utils/cache";
import { cookies } from "next/headers";
import { logout } from "../actions/users";
import { redirect } from "next/navigation";

export default async function WithSidebarLayout({ children }) {
  const cookieStore = await cookies();
  const userIdCookie = cookieStore.get("id");
  if (!userIdCookie) redirect("/login");

  const userId = Number(userIdCookie.value);
  const profilePhoto = await getCachedProfilePhoto(userId);
  const username = await getCachedUsername(userId);

  return (
    <HeaderWithSidebar
      userId={userId}
      profilePhoto={profilePhoto}
      username={username}
      logout={logout}
    >
      {children}
    </HeaderWithSidebar>
  );
}
