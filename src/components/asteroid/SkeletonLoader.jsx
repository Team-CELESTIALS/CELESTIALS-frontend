import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-lg animate-pulse">
      <div className="h-6 bg-gray-600 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-600 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-600 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-600 rounded w-1/3 mb-2"></div>
    </div>
  );
};

export default SkeletonLoader;
