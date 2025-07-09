import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "../hooks/useLang"; // make sure path is correct
import CustomCursor from "./components/cursor";
import { Analytics } from "@vercel/analytics/next"
import { AudioProvider } from "@/context/AudioContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vineetnotfound",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vineet-k09/devicon@latest/devicon.min.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AudioProvider>
          <Analytics />
          <CustomCursor />
          <LangProvider>
            {children}
          </LangProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
