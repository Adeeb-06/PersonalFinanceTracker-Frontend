"use client";
import { Mail, Save, Shield, User } from "lucide-react";
import { useAuth } from "@/providers/FirebaseAuthProvider";
import React, { useState } from "react";

const Profile = () => {
  const { firebaseUser } = useAuth();
  const [username, setUsername] = useState(firebaseUser?.displayName || "");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Profile Form */}
      <div className="md:col-span-2 bg-secondary border border-gray-800 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {firebaseUser?.displayName?.[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Public Profile</h2>
            <p className="text-gray-400 text-sm">
              Update your public information
            </p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">
                Username
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={firebaseUser?.displayName as string}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={firebaseUser?.email as string}
                  readOnly
                  className="w-full bg-gray-900/30 border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-gray-500 cursor-not-allowed"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Shield className="w-4 h-4 text-green-500/50" />
                </div>
              </div>
              <p className="text-xs text-gray-500 ml-1">
                Email cannot be changed securely.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-secondary px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
