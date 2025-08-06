import React from 'react'

const DeadLines = () => {
  return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Key Admission Deadlines
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {[
            { name: "Fall Semester", date: "March 15, 2023" },
            { name: "Spring Semester", date: "October 1, 2023" },
            { name: "Summer Session", date: "January 30, 2024" },
            { name: "Early Decision", date: "November 15, 2023" },
          ].map((item) => (
            <div
              key={item.name}
              className="border border-gray-200 shadow-sm rounded-lg p-4 bg-white hover:shadow-md transition"
            >
              <h3 className="text-base font-semibold text-gray-700">{item.name}</h3>
              <p className="text-green-600 font-bold">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default DeadLines
