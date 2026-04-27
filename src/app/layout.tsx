import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "@/lib/context";
import Navigation from "@/components/Navigation";
import Background3D from "@/components/Background3D";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oldtimer = localFont({
  src: "./fonts/Oldtimer.woff2",
  variable: "--font-oldtimer",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Egrabar - Scientific & Educational Portal",
  description: "A comprehensive educational platform preserving Armenian heritage and scientific knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oldtimer.variable} min-h-screen`}>
        <Background3D />
        <AppProvider>
          <Navigation />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
