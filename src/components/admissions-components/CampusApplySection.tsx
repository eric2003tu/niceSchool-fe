"use client";

import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import Link from "next/link";

const CampusApplySection = () => {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 gap-6 max-w-7xl mx-auto p-6">
      {/* Visit Our Campus */}
      <div className="bg-gray-200 rounded-lg p-8 text-center space-y-4">
        <HiOutlineOfficeBuilding className="w-12 h-12 mx-auto text-green-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Visit Our Campus</h2>
        <p className="text-gray-600">
          Nulla porttitor accumsan tincidunt. Vivamus suscipit tortor eget felis
          porttitor volutpat.
        </p>
        <button className="bg-slate-700 text-white font-semibold py-2 px-6 rounded hover:bg-slate-800 transition">
          SCHEDULE A TOUR
        </button>
      </div>

      {/* Ready to Apply */}
      <div className="bg-green-100 rounded-lg p-8 text-center space-y-4">
        <HiOutlineDocumentCheck className="w-12 h-12 mx-auto text-green-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Ready to Apply?</h2>
        <p className="text-gray-600">
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur non
          nulla sit amet.
        </p>
        <Link href="/login" className="bg-green-600 text-white font-semibold py-2 px-6 rounded hover:bg-green-700 transition">
          START APPLICATION
        </Link>
      </div>
    </div>
  );
};

export default CampusApplySection;
