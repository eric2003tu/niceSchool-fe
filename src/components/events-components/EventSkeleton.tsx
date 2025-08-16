export const EventSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="flex">
      <div className="w-24 h-32 bg-gradient-to-br from-gray-200 to-gray-300"></div>
      <div className="flex-1 p-6 space-y-3">
        <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-8 bg-gray-200 rounded-lg w-24"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-32"></div>
        </div>
      </div>
    </div>
  </div>
);