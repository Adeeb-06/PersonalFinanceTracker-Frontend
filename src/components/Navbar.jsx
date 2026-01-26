"use client";
import React,{ useState } from 'react';
import { Menu, X, Wallet, BarChart3, PiggyBank, Settings, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: BarChart3, href: '#dashboard' },
    { name: 'Transactions', icon: Wallet, href: '#transactions' },
    { name: 'Budget', icon: PiggyBank, href: '#budget' },
    { name: 'Settings', icon: Settings, href: '#settings' },
  ];

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Wallet className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">FinanceTracker</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>

          {/* User Profile (Desktop) */}
          <div className="hidden md:flex items-center">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200">
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200">
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}