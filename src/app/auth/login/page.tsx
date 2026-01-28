"use client";
import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const {register , handleSubmit , formState: { errors }} = useForm<FormData>()


  const onsubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
     const res = signIn("credentials" , {
        redirect: true,
        callbackUrl: "/",
        email: data.email,
        password: data.password
     })
    } catch (error: unknown) {
    
  }
  }



  return (
    <div className="min-h-screen bg-[#EFEEEA] flex items-center justify-center px-4 py-12">
      <div className="relative max-w-md w-full">
        {/* Soft background glow */}
        <div className="absolute -inset-1 rounded-3xl bg-[#273F4F]/20 blur-xl"></div>

        {/* Card */}
        <div className="relative bg-[#273F4F] rounded-3xl p-8 shadow-2xl border border-white/10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Login 
            </h2>
            <p className="text-[#EFEEEA]/70 text-sm">
              Start tracking your finances today
            </p>
          </div>

          {/* Google Button */}
          <button className="w-full flex items-center justify-center gap-3 py-3 bg-white text-[#273F4F] font-semibold rounded-xl hover:scale-[1.02] active:scale-100 transition-all mb-6 shadow">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-xs text-white/60">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onsubmit)}>
          <div className="space-y-5">
            {/* Input wrapper */}
     
              <div>
                <label className="block text-sm text-white/80 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="john@example.com"
                    {...register("email" , {required: "Email is required"})}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-white/30 focus:ring-2  outline-none transition"
                  />
                </div>
              </div>
   

            {/* Password */}
            <div>
              <label className="block text-sm text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password" , {required: "Password is required", minLength: {value: 3 , message: "Password must be at least 6 characters"}})}
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/10 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* CTA */}
            <button type="submit" className="w-full cursor-pointer py-3 rounded-xl bg-white text-[#273F4F] font-bold hover:scale-[1.02] active:scale-100 transition-all shadow-lg">
              Create Account
            </button>

            {
              Object.keys(errors).length > 0 && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 text-center py-2 rounded">
                  {errors.username && <p>{errors.username.message}</p>}
                  {errors.email && <p>{errors.email.message}</p>}
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              )
            }
          </div>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-white/70">
            Don&apost have an account?{" "}
            <Link href="/auth/register" className="text-white font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
