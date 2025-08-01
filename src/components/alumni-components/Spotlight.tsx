import React from 'react'

const Spotlight = () => {
    const spot=[
        {title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis velit a enim tincidunt, sed tincidunt nulla feugiat. Cras efficitur magna in metus.", name:"Ketia ISIMBI", job:"Tech Entrepreneur & VC Partner", year: 2015, photo:"person-f-5.webp", trophy: "Tech Visionary of the Year"},

        {title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis velit a enim tincidunt, sed tincidunt nulla feugiat. Cras efficitur magna in metus lacinia.", name:"Sophia Lin", job:"Tech Entrepreneur & VC Partner", year: 2025, photo:"person-f-2.webp", trophy: "The teacher of the Year"},

        {title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis velit a enim tincidunt, sed tincidunt nulla feugiat. Cras efficitur magna in metus.", name:"Sophia Lin", job:"Tech Entrepreneur & VC Partner", year: 2015, photo:"person-m-5.webp", trophy: "Tech Visionary of the Year"},

        {title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis velit a enim tincidunt, sed tincidunt nulla feugiat. Cras efficitur magna in metus.", name:"Sophia Lin", job:"Tech Entrepreneur & VC Partner", year: 2015, photo:"person-f-2.webp", trophy: "Tech Visionary of the Year"},

        {title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis velit a enim tincidunt, sed tincidunt nulla feugiat. Cras efficitur magna in metus", name:"Sophia Lin", job:"Tech Entrepreneur & VC Partner", year: 2015, photo:"person-m-11.webp", trophy: "Tech Visionary of the Year"},

        {title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis velit a enim tincidunt, sed tincidunt nulla feugiat. Cras efficitur magna in metus.", name:"Sophia Lin", job:"Tech Entrepreneur & VC Partner", year: 2015, photo:"person-m-6.webp", trophy: "Tech Visionary of the Year"},

    ]
  return (
    <div className="w-full  lg:px-30 px-4 text-[#0a0a40] text-center ">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Notable Alumni Spotlights</h2>
        <div className="w-40 h-1 bg-[#0F9255] mx-auto mb-5 rounded"></div>
        <p>Extraordinary graduates making an impact in their fields</p>
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 py-7">
            {spot.map((spot,index)=>(
                <div key={index} className="w-full grid grid-cols-1 rounded-md ">
                    <div style={{backgroundImage:`url(${spot.photo})`}} className="w-full h-80 p-3 bg-cover bg-no-repeat rounded-t-md">
                        <h1 className="bg-[#0F9255] text-white text-center font-bold text-xl rounded-full w-fit px-3 py-1"> {spot.year}</h1>
                    </div>
                    <div className="w-full p-3 flex flex-col gap-3 bg-white py-4 rounded-b-md">
                        <h1 className="text-2xl font-bold">{spot.name}</h1>
                        <p className="font-bold text-[#0F9255]">{spot.job}</p>
                        <p>{spot.title}</p>
                        <button className="text-[#0F9255]">View Profile </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Spotlight
