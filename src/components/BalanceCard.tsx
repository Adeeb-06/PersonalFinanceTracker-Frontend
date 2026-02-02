"use client";
import React, { useState, useEffect, useContext } from "react";
import { Plus, TrendingUp, Calendar, Clock, Eye, EyeOff } from "lucide-react";
import BalanceAddModal from "./BalanceAddModal";
import { useSession } from "next-auth/react";
import UserContext from "@/app/context/UserContext";

export default function BalanceCard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showBalance, setShowBalance] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { userData , isUserLoading } = useContext(UserContext)!;

  

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleAddBalance = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-full bg-secondary rounded-2xl p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Side - Balance */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm md:text-base font-medium text-gray-400 uppercase tracking-wide">
              Total Balance
            </h2>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-400 hover:text-white"
            >
              {showBalance ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            {showBalance ? (
              <>
                <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary tracking-tight">
{isUserLoading ? <span className="loading loading-dots loading-md"></span> : ( `${userData?.balance || "0"}`)}
                  
                </span>
                <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-500">
                  .00
                </span>
              </>
            ) : (
              <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-600 tracking-tight">
                ••••••
              </span>
            )}
          </div>

          {/* Balance Change Indicator */}
        </div>

        {/* Right Side - Actions & Info */}
        <div className="flex flex-col gap-4 lg:items-end">
          {/* Add Balance Button */}
          <button
            onClick={handleAddBalance}
            className="flex items-center justify-center cursor-pointer gap-2 px-6 py-3 bg-primary hover:bg-primary/70 text-gray-900 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl w-full lg:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Add Balance</span>
          </button>

          {/* Date and Time */}
          <div className="flex flex-col gap-2 lg:items-end">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">
                {formatDate(currentTime)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium font-mono">
                {formatTime(currentTime)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isOpen && <BalanceAddModal setIsOpen={setIsOpen} />}
    </div>
  );
}
