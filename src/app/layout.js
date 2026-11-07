import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "YouTube",
  description: "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
  icons: {
    icon: "/youtube.png",
  },
};

export const viewport = {
  themeColor: "#0f0f0f",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0f0f0f] text-[#f1f1f1] min-h-screen selection:bg-red-600/40 selection:text-white">
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: "#212121",
              color: "#f1f1f1",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              fontSize: "14px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
