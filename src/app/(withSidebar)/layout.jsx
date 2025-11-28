

import Navbar from "./Navbar";
import HeaderWithSidebar from "./HeaderWithSidebar";

export default function WithSidebarLayout({ children }) {

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
    <HeaderWithSidebar></HeaderWithSidebar>
      {/* Page Content */}
      <main className="flex-1 lg:ml-64 mt-5 bg-neutral-800">
        {children}
      </main>
    </div>
  );
}
