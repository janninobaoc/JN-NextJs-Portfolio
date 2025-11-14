import type { Metadata } from "next";
import { Lexend_Mega } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

const lexendMega = Lexend_Mega({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-lexend-mega",
});


export const metadata: Metadata = {
  title: "JN | Portfolio",
  description: "Portfolio website built with Next.js",
    icons: {
    icon: "/img/profile.png",       // Favicon for browser tab
    apple: "/img/profile.png",      // Optional for Apple devices
    shortcut: "/img/profile.png",   // Optional shortcut icon
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lexendMega.variable} font-sans bg-[#0a192f] text-gray-200`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
