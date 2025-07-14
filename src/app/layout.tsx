'use client'
import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/hooks/useLang"; // make sure path is correct
import CustomCursor from "./components/render/cursor";
import { Analytics } from "@vercel/analytics/next"
import { AudioProvider } from "@/context/AudioContext";
import { ThemeProvider } from '@/context/ThemeContext';
import { LocationProvider } from "@/context/LocationProvider";

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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <AudioProvider>
            <Analytics />
            <CustomCursor />
            <LangProvider>
              <LocationProvider>{children}</LocationProvider>
            </LangProvider>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
