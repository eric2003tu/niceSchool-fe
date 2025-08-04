'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { name: 'Tennis', src: 'education-1.webp' },
  { name: 'Volleyball', src: 'education-2.webp' },
  { name: 'Swimming', src: 'education-3.webp' },
  { name: 'Basketball', src: 'blog-post-3.webp' },
  { name: 'Scouts', src: 'blog-post-4.webp' },
  { name: 'Drama', src: 'blog-post-5.webp' },
  { name: 'Track', src: 'blog-post-6.webp' },
  { name: 'Hiking', src: 'blog-post-7.webp' },
  { name: 'Coding', src: 'blog-post-9.webp' },
  { name: 'Campus Life', src: 'campus.webp' },
  { name: 'Leadership', src: 'education-9.webp' },
];

const itemsPerSlide = 4;

const Athletics = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(images.length / itemsPerSlide);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getVisibleItems = () => {
    const start = currentSlide * itemsPerSlide;
    return images.slice(start, start + itemsPerSlide);
  };

  // Auto-play
  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000); // 5 seconds
  };

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div
      className="px-6 py-10 max-w-screen-xl"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <h2 className="text-3xl font-bold mb-2">Athletics & Recreation Programs</h2>
      <p className="mb-6 text-gray-600 max-w-2xl">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      {/* Carousel */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 transition-all duration-500 ease-in-out">
          {getVisibleItems().map((item, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-md group"
            >
              <img
                src={item.src}
                alt={item.name}
                className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-3 text-white">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span className="text-sm bg-green-600 px-2 py-1 rounded mt-1 inline-block">Varsity</span>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-green-500 hover:text-white transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-green-500 hover:text-white transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'bg-green-600 scale-110' : 'bg-gray-300'
            }`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Athletics;
