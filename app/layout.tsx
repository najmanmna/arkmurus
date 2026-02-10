import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
// IMPORT THE NEW COMPONENT
import SmoothScrolling from "@/components/SmoothScrolling"; 
import Navbar from "@/components/Navbar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arkmurus Group | Strategic Advisory",
  description: "Navigating the intersection of government, defence, and commerce.",
  icons: {
    icon: '/favicon.png', // <--- ADD THIS LINE
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased bg-ark-bg text-white`}>
        
        {/* WRAP EVERYTHING INSIDE SMOOTH SCROLLING */}
        <SmoothScrolling>
          <Navbar />
          <main className="relative z-10 flex flex-col min-h-screen">
            {children}
          </main>
        </SmoothScrolling>
        
      </body>
    </html>
  );
}