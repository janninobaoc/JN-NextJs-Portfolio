import type { Metadata } from "next";
import { Lexend_Mega } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const lexendMega = Lexend_Mega({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${lexendMega.variable} font-sans text-gray-200`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#111",
              color: "#fff",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "12px",
              maxWidth: "95vw",
              textAlign: "center",
            },
          }}
        />
      </body>
    </html>
  );
}
