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

const googlesans = localFont({
  src: [
    { path: "./fonts/GoogleSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GoogleSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-googlesans",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'eGrabar | իԳրաբար',
  description: 'Preserving Armenian scientific heritage and cultural knowledge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${googlesans.variable} min-h-screen`}>
        <Background3D />
        <AppProvider>
          <Navigation />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
