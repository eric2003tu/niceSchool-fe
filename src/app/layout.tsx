import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NiceSchool",
  description: "School app",
  icons: {
    icon: "favicon.ico",}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <header className="fixed top-0 w-full h-full z-50 mb-6">
        <Header/>
      </header>
        {children}

      <footer>
        <Footer/>
      </footer>
      </body>
    </html>
  );
}
