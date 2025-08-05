import React from 'react'

const LifeOnCampus = () => {
  const blogs =[
    {photo: "blog-post-1.webp", title: "image-1"},
    {photo: "blog-post-2.webp", title: "image-2"},
    {photo: "blog-post-3.webp", title: "image-3"},
    {photo: "blog-post-4.webp", title: "image-4"},
    {photo: "blog-post-5.webp", title: "image-5"},
    {photo: "blog-post-6.webp", title: "image-6"}
  ]
  return (
    <div className="w-full lg:px-30 px-4 text-[#0a0a40] justify-items-center my-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 ">Life On Campus</h2>
      <div className="w-20 h-1 bg-[#0F9255] mx-auto mb-5 rounded"></div>
      <p>Take a glimpse into our vibrant student community</p>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mt-3'>
        {blogs.map((blog, index)=>(
          <div key={index} className="w-full rounded-md">
            <img src={blog.photo} alt={blog.title} className="w-full rounded-md"/>
          </div>
        ))}
      </div>
<div className="w-full mx-auto p-8 text-center bg-gradient-to-r from-[#0F9255] via-gray-500 to-green-500 rounded-lg shadow-lg font-sans mt-5 text-white">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">
    Ready to Join Our Community?
  </h2>
  <p className="mb-8 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius felis nec sem viverra, nec tincidunt felis mollis.
  </p>
  <div className="flex flex-wrap justify-center gap-4">
    <button
      className="px-6 py-3 bg-white/20 hover:bg-white/30 hover:ring-2 hover:ring-white/60 text-white font-semibold rounded-md transition-all duration-700 ease-in-out backdrop-blur-md min-w-[150px] text-sm sm:text-base shadow-md transform hover:scale-105"
    >
      Schedule a Visit
    </button>
    <button
      className="px-6 py-3 bg-white/20 hover:bg-white/30 hover:ring-2 hover:ring-white/60 text-white font-semibold rounded-md transition-all duration-700 ease-in-out backdrop-blur-md min-w-[150px] text-sm sm:text-base shadow-md transform hover:scale-105"
    >
      Apply Now
    </button>
  </div>
</div>


    </div>
  )
}

export default LifeOnCampus
