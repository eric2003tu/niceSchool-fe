import Card from "@/components/ui/Card";
import Event from "@/components/ui/Events";
import Excellency from "@/components/ui/Excellency";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import Life from "@/components/ui/Life";
import Main from "@/components/ui/Main";
import News from "@/components/ui/News";
import Program from "@/components/ui/Program";
import Testimanial from "@/components/ui/Testimanial";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen max-w-screen  overflow-x-hidden ">
      <header className="fixed top-0 w-full z-50 mb-6">
        <Header />
      </header>

      <section className="relative h-screen max-w-full">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover z-0"
          poster="/video-poster.jpg"
        >
          <source src="/video.mp4" type="video/mp4" />
          <source src="/video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Content overlay - Hero section */}
        <div className="absolute inset-0 bg-gray-900/40 flex flex-col pt-[header-height] h-full">
          <Hero />
        </div>
      </section>

      {/* Main content section */}
      <section className="w-full pt-[header-height]">
        <Main />
        <Card/>
        <Program/>
        <Life/>
        <Testimanial/>
        <Excellency/>
        <News/>
        <Event/>
      </section>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}