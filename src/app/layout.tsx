import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { Toaster } from "sonner"; 

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const laviossa = localFont({
  src: "../../public/fonts/Laviossa-Medium.otf",
  variable: "--font-laviossa",
});

const moonget = localFont({
  src: "../../public/fonts/moon_get-Heavy.otf",
  variable: "--font-moonget",
});

export const metadata: Metadata = {
  title: "Kairo",
  description: "Workspace to manage notes and study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${laviossa.variable} ${moonget.variable} h-full dark antialiased`}
    >
      <body className={`${inter.className} ${laviossa.variable} ${moonget.variable} min-h-full flex flex-col`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
