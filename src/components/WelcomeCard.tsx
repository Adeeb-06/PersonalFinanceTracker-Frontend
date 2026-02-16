"use client";
import React, { useState, useEffect, useContext } from "react";
import { Sparkles, TrendingUp, Target, Zap } from "lucide-react";
import UserContext from "@/app/context/UserContext";

export default function WelcomeCard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const {userData} = useContext(UserContext)!
  // Mock user data - replace with actual user data from context/props
  const userName = userData?.username;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Let's make today financially productive!",
      "Every penny saved is a penny earned!",
      "Your financial goals are within reach!",
      "Track smart, spend wisely!",
      "Building wealth, one day at a time!",
    ];

    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div className="relative w-full bg-secondary border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
      {/* Content */}
      <div className="relative p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left Side - Greeting */}
          <div className="flex-1">
            {/* Greeting Text */}
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              <span className="text-lg md:text-xl font-semibold text-gray-400">
                {getGreeting()},
              </span>
            </div>

            {/* User Name - Big Font */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight">
              {userName}!
            </h1>

            {/* Motivational Quote */}
            <p className="text-base md:text-lg text-gray-400 mb-6 max-w-xl">
              {getMotivationalQuote()}
            </p>
          </div>

          {/* Right Side - Date & Time */}
          <div className="flex flex-col items-start md:items-end gap-4">
            {/* Current Date */}
            <div className="text-right">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                Today
              </p>
              <p className="text-2xl font-bold text-white">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Current Time */}
            <div className="text-right">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                Time
              </p>
              <p className="text-3xl font-bold text-white font-mono">
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
