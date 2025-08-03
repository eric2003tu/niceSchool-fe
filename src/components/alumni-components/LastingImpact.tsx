"use client";
import React from "react";
import Image from "next/image";

const LastingImpact = () => {
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-8">
      <div className="max-w-7xl mx-auto bg-gray-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-md">
        {/* Left - Text */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Make a Lasting Impact
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus, velit vel fringilla venenatis, urna risus volutpat nisi, ac commodo dolor nulla quis lorem. In mattis dictum malesuada. Vestibulum non mi eu justo rutrum tempus.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition"
            >
              Donate Now
            </a>
            <a
              href="#"
              className="border border-emerald-600 text-emerald-700 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition flex items-center gap-1"
            >
              Learn About Impact →
            </a>
          </div>
        </div>

        {/* Right - Image */}
        <div className="relative flex-1 w-full max-w-lg">
          <Image
            src="/education-8.webp"
            alt="Education"
            width={500}
            height={300}
            className="rounded-xl shadow-lg object-cover w-full h-auto"
          />
          <div className="absolute bottom-4 right-4 bg-emerald-600 text-white rounded-xl px-4 py-3 shadow-md text-sm w-56">
            <div className="text-xl font-bold">$2.4M</div>
            in scholarships funded by alumni last year
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastingImpact;
