import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "Smart Bookmark App",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">

  {/* Background */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')"
,
    }}
  />

    
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content */}
  <div className="relative z-10">
    {children}
    <Toaster position="top-center" />
  </div>

</body>

    </html>
  );
}
