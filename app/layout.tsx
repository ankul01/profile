import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CrossSiteNav from "@/components/CrossSiteNav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ankul Choudhry — Engineering Leader",
  description:
    "Engineering Leader. Architecture decisions and operating practices that hold up in production.",
  authors: [{ name: "Ankul Choudhary" }],
  openGraph: {
    title: "Ankul Choudhry — Engineering Leader",
    description:
      "Engineering Leader. Architecture decisions and operating practices that hold up in production.",
    type: "website",
    url: "https://ankul.co.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 min-h-screen flex flex-col`}
      >
        <CrossSiteNav />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
