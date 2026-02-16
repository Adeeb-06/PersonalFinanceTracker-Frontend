"use client";
import React, { useContext, useState } from "react";
import {
  Menu,
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Wallet2,
  User,
  Receipt,
  PiggyBank,
} from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import UserContext from "@/app/context/UserContext";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { userData } = useContext(UserContext)!;

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: DollarSign, label: "Income", href: "/dashboard/income" },
    { icon: Wallet2, label: "Expense", href: "/dashboard/expense" },
    { icon: Receipt, label: "Budget", href: "/dashboard/budget" },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/dashboard/category-analytics",
    },
    {
      icon: PiggyBank,
      label: "Active Savings",
      href: "/dashboard/savings",
    },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-zinc-900 text-gray-100  transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 py-10 border-b border-zinc-800">
        {!isCollapsed && <Logo />}
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

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-3 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href || "#"}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                pathname === item.href
                  ? "bg-white text-zinc-900"
                  : "text-gray-300 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isCollapsed ? "mx-auto" : ""}`} />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-zinc-800 p-4">
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-3"}`}
        >
         
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-xl font-medium text-white">
                {userData?.username}
              </p>
              <p className="text-xs text-gray-400">{userData?.email}</p>
            </div>
          )}
        </div>
        <div className="flex items-center mt-3 space-x-3">
          <button
            onClick={() => signOut()}
            className="btn btn-sm btn-primary text-secondary"
          >
            <User className="w-3 h-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
