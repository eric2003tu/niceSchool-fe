import React from 'react'
import Link from "next/link";

const News = () => {
    const blog =[
        {photo: 'blog-post-1.webp', field:"Entertainment", title:"Possimus soluta ut id suscipit ea ut in quo quia et soluta", profile:"person-f-10.webp",name:"Mark Dower", date: "Jun 22,2022"},
        {photo: 'blog-post-2.webp', field:"Politics", title:"Dolorum optio tempore voluptas dignissimos", profile:"person-m-11.webp",name:"Maria Doe", date: "Jan 1,2022"},
        {photo: 'blog-post-3.webp', field:"Sports", title:"Nisi magni odit consequatur autem nulla dolorem", profile:"person-m-13.webp",name:"Eric Tuyishime", date: "Jun 5,2022"}
    ]
  return (
    <div className="text-[#0a0a40] lg:px-30 px-4 w-full lg:justify-items-center">
      <h1 className='text-4xl font-bold'>Recent News</h1>
      <p className=''>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mt-5 rounded-lg py-3">
        {blog.map((blo,index)=>(
            <div key={index} className="w-full grid grid-cols-1 shadow-2xl group transition duration-700 transform hover:scale-[1.02]">
            <div style={{backgroundImage: `url(${blo.photo})`}} className="w-full bg-cover bg-no-repeat rounded-t-lg h-64"></div>
            <div className="w-full p-3  flex flex-col gap-3 rounded-b-lg">
                <p className="text-gray-500">{blo.field}</p>
                <h1>{blo.title}</h1>
                <div className="flex flex-row gap-4">
                    <img src={blo.profile} alt={blo.title} className="w-10 h-10 rounded-full"/>
                    <div className="flex flex-col "><p className="font-bold">{blo.name} </p><span className="text-gray-500"> {blo.date}</span></div>
                </div>
            </div>
            </div>
        ))}
        <Link href="/news" className="text-center text-xl bg-[#0F9255] rounded-lg p-3 text-white font-semibold"> View More</Link>
      </div>
      
    </div>
  )
}

export default News
