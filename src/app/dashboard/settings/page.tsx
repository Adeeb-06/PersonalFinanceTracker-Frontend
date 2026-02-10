"use client";
import React, { useState } from "react";
import {
  User,
  Grid,
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  Save,
  Mail,
  Shield,
  Bell
} from "lucide-react";
import { toast } from "react-toastify";
import Profile from "@/components/Profile";
import AddCategories from "@/components/AddCategories";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "categories" | "notifications">("profile");
  
  // Mock Data / State
  const [username, setUsername] = useState("johndoe");
  const [email] = useState("johndoe@example.com");
  



  // Handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };



  return (
    <div className="max-w- mx-auto p-2 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-secondary tracking-tight">Settings</h1>
        <p className="text-secondary/60 text-lg">
          Manage your account preferences and financial categories.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-800 bg-secondary rounded-3xl w-fit   ">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-6 py-3 rounded-t- text-xl font-medium transition-all duration-200 relative
            ${activeTab === "profile" 
              ? "text-primary bg-primary/10 rounded-l-3xl border- " 
              : "text-gray-400 "
            }`}
        >
          <User className="w-4 h-4" />
          Profile
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`flex items-center gap-2 px-6 py-3 rounded-t- text-xl font-medium transition-all duration-200 relative
            ${activeTab === "categories" 
              ? "text-primary bg-primary/10 border- " 
              : "text-gray-400 "
            }`}
        >
          <Grid className="w-4 h-4" />
          Categories
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        
        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <Profile/>
        )}
        {/* CATEGORIES TAB */}
        {activeTab === "categories" && (
          <AddCategories/>
        )}
      </div>
    </div>
  );
}
