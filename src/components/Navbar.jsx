"use client";
import React, { useState, useEffect } from "react";
import { User, BarChart3, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/providers/FirebaseAuthProvider";
import Link from "next/link";
import Logo from "./Logo";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { firebaseUser, authLoading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = "firebase-auth=; path=/; max-age=0";
    router.push("/auth/login");
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`
          pointer-events-auto
          flex items-center justify-between 
          pl-5 pr-5 py-3
          w-auto min-w-[340px] max-w-xl
           backdrop-blur-xl 
          border border-white/5 
          rounded-full shadow-2xl shadow-black/20
          transition-all duration-500 ease-out
          "py-2.5 bg-zinc-900/90 shadow-black/40"
        `}
      >
        {/* Logo Section */}
        <div className="mr-12">
          <Logo />
        </div>

        {/* Links Section */}
        <div className="flex items-center gap-1">
          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className="group cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full text-md font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <BarChart3 className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            <span>Dashboard</span>
          </Link>

          {/* Divider */}
          <div className="h-6 w-px bg-white/10 mx-2"></div>

          {/* Auth Section */}
          {authLoading ? (
            <div className="h-9 w-20 rounded-full bg-zinc-800 animate-pulse"></div>
          ) : firebaseUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center cursor-pointer gap-2 bg-white/10 hover:bg-red-500/10 hover:text-red-400 text-zinc-200 text-md font-semibold px-4 py-2 rounded-full transition-all border border-white/5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-2 cursor-pointer bg-white text-black hover:bg-zinc-200 text-md font-bold px-5 py-2 rounded-full transition-all shadow-lg shadow-white/5"
            >
              <User className="w-3.5 h-3.5" />
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
