import HeaderWithSidebar from "./HeaderWithSidebar";
import { getCachedProfilePhoto, getCachedUsername } from "../utils/cache";
import { cookies } from "next/headers";
import { logout } from "../actions/users";
import { redirect } from "next/navigation";

export default async function WithSidebarLayout({ children }) {
  let userId=(await cookies()).get('id')
  if(!userId)redirect('/login')
  userId=Number(userId.value)
  let profilePhoto=await getCachedProfilePhoto(userId)
  let username=await getCachedUsername(userId)

  return (
    <div className="flex min-h-screen">
      {/* Mobile Header */}
            {/* <header className="fixed top-0 left-0 w-full bg-white flex items-center p-3 border-b z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 cursor-pointer"
        >
          <Menu size={24} className="text-white" />
        </button>
      </header>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    <HeaderWithSidebar userId={userId} profilePhoto={profilePhoto} username={username} logout={logout}/>
      <main className="flex-1 lg:ml-64 mt-5 bg-neutral-800">
        {children}
      </main>
    </div>
  );
}
