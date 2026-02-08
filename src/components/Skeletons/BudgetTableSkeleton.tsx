"use client";
import React from "react";

const BudgetSkeleton = () => {
  return (
    <div className="bg-primary rounded-xl p-6 shadow-sm animate-pulse border border-zinc-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Section - Month */}
        <div className="flex items-center gap-4">
          <div className="bg-zinc-400 h-12 w-12 rounded-xl"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-zinc-400 rounded"></div>
            <div className="h-3 w-20 bg-zinc-300 rounded"></div>
          </div>
        </div>

        {/* Middle Section - Amount & Progress */}
        <div className="flex-1 md:mx-8 space-y-2">
          <div className="h-6 w-24 bg-zinc-400 rounded"></div>
          <div className="h-2 w-full bg-zinc-300 rounded"></div>
        </div>

        {/* Right Section - Update Button */}
        <div className="h-10 w-24 bg-zinc-400 rounded"></div>
      </div>
    </div>
  );
};

export default BudgetSkeleton;
