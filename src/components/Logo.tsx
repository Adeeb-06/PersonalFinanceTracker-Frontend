import React from "react";
import { Wallet, TrendingUp } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      {/* Icon Container with Gradient Background */}
      <div className="relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-primary to-secondary rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Icon wrapper */}
        <div className="relative bg-linear-to-br from-primary to-secondary p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300">
          <Wallet className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        
        {/* Small trending indicator */}
        <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-md">
          <TrendingUp className="w-3 h-3 text-green-500" strokeWidth={3} />
        </div>
      </div>

      {/* App Name with Gradient Text */}
      <div className="flex flex-col">
        <span className="text-2xl font-black text-primary  tracking-tight">
          TrackIt
        </span>
        <span className="text-[13px] font-semibold text-gray-500 uppercase tracking-widest -mt-1">
          Finance
        </span>
      </div>
    </div>
  );
};

export default Logo;