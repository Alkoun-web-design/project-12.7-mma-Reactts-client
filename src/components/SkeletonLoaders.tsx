// SkeletonLoaders.tsx
import React from 'react';

// Skeleton for test prep options
export const TestPrepOptionSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-primary-600 text-white px-6 py-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      </div>
      <div className="p-6">
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
          <div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="flex items-start">
            <div className="h-3 w-3 bg-gray-200 rounded-full mt-1 mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12"></div>
          </div>
          <div className="flex items-start">
            <div className="h-3 w-3 bg-gray-200 rounded-full mt-1 mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-10/12"></div>
          </div>
          <div className="flex items-start">
            <div className="h-3 w-3 bg-gray-200 rounded-full mt-1 mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-9/12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton for coaching area cards
export const CoachingAreaSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="flex items-start">
            <div className="h-3 w-3 bg-gray-200 rounded-full mt-1 mr-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse"></div>
          </div>
          <div className="flex items-start">
            <div className="h-3 w-3 bg-gray-200 rounded-full mt-1 mr-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-10/12 animate-pulse"></div>
          </div>
          <div className="flex items-start">
            <div className="h-3 w-3 bg-gray-200 rounded-full mt-1 mr-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-9/12 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add other skeleton loaders as needed