import React from 'react'
import { FaGraduationCap } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { RiFileList3Line } from 'react-icons/ri';
import { MdOutlineChecklist } from 'react-icons/md';

const AdmissionRequirements = () => {
  return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Admission Requirements
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Academic Records",
                icon: <FaGraduationCap size={20}/>,
                desc: "Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed.",
              },
              {
                title: "Recommendation Letters",
                icon: <HiOutlineDocumentText size={20}/>,
                desc: "Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus.",
              },
              {
                title: "Personal Statement",
                icon: <RiFileList3Line size={20}/>,
                desc: "Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat.",
              },
              {
                title: "Standardized Tests",
                icon: <MdOutlineChecklist size={20}/>,
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default AdmissionRequirements
