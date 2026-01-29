"use client"
import React, { useState } from 'react';
import { Menu, Home, Users, Settings, BarChart3, FileText, Bell, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Users, label: 'Team' },
    { icon: FileText, label: 'Documents' },
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
   
      <div
        className={`${
          isCollapsed ? 'w-20' : 'w-64'
        } bg-zinc-900 text-gray-100 transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Menu className="w-5 h-5 text-zinc-900" />
              </div>
              <span className="text-xl font-bold">Dashboard</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="px-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-zinc-800 text-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 placeholder-gray-500"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href="#"
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  item.active
                    ? 'bg-white text-zinc-900'
                    : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''}`} />
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-zinc-800 p-4">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-400">john@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>


  );
}