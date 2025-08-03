"use client";
import React from 'react'
import Link from "next/link";

interface currentPage{
  name: string;
}

const AlumniHero = ({name}: currentPage) => {
  return (
    <div className="h-full w-full ">
    <div style={{backgroundImage: `url(${'showcase-1.webp'})`}} className="w-full h-70  text-white flex justify-center bg-cover bg-no-repeat">
        <div className="w-full h-full pt-24 lg:px-30 px-4 py-10  bg-gray-900/70 flex flex-col gap-2 text-center">
        <h1 className="font-bold text-4xl">{name}</h1>
        <p>Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat quibusdam quia assumenda numquam molestias.</p>
        <p>
            <Link href="/" className="text-[#0F9255]">Home</Link>
            <span> / {name}</span>
            </p>
        </div>
      </div>
    </div>
  )
}

export default AlumniHero
