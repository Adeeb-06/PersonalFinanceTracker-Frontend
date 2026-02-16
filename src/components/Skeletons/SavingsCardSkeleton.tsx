"use client";
import React from "react";

const SavingsCardSkeleton = () => {
  return (
    <div className="bg-secondary border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gray-800 p-5 flex justify-between items-center">
        <div className="h-6 w-32 bg-gray-700 rounded"></div>
        <div className="h-6 w-12 bg-gray-700 rounded-full"></div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-5">
        {/* Amount */}
        <div>
          <div className="h-8 w-40 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-700 rounded"></div>
        </div>

        {/* Progress bar */}
        <div className="h-3 w-full bg-gray-700 rounded-full"></div>

        {/* Deadline box */}
        <div className="p-3 bg-gray-800 rounded-xl space-y-2">
          <div className="h-4 w-20 bg-gray-700 rounded"></div>
          <div className="h-4 w-28 bg-gray-700 rounded"></div>
        </div>

        {/* Button */}
        <div className="h-12 w-full bg-gray-700 rounded-xl"></div>
      </div>
    </div>
  );
};

export default SavingsCardSkeleton;
