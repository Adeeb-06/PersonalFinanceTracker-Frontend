import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowRight, BarChart3, PieChart, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-zinc-900 select-none">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-zinc-200/50 blur-[100px] mix-blend-multiply"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-zinc-300/30 blur-[120px] mix-blend-multiply"></div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            {/* Tagline Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-zinc-900/5 border border-zinc-900/10 text-zinc-700 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500/80 mr-2.5 animate-pulse"></span>
              Smart Money Management
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 leading-[0.9] text-balance">
              Financial clarity, <br />
              <span className="text-zinc-400 font-bold tracking-tight">
                simplified.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xl md:text-2xl text-zinc-600 max-w-2xl mx-auto leading-relaxed font-light text-balance">
              Stop guessing where your money goes. Track income, expenses, and
              savings with a dashboard designed for peace of mind.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
              <Link
                href="/dashboard"
                className="group px-8 py-4 bg-zinc-900 text-white rounded-2xl font-semibold hover:bg-zinc-800 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 shadow-xl shadow-zinc-900/10"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/auth/register"
                className="px-8 py-4 bg-transparent text-zinc-900 border-2 border-zinc-200 rounded-2xl font-semibold hover:bg-zinc-50 hover:border-zinc-300 transition-all active:scale-[0.98]"
              >
                Create Account
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-24 max-w-5xl mx-auto">
              <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-zinc-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6 text-zinc-900" />
                </div>
                <h3 className="font-bold text-xl text-zinc-900 mb-3">
                  Real-time Analytics
                </h3>
                <p className="text-zinc-500 leading-relaxed">
                  Visualize your spending patterns instantly with beautiful,
                  interactive charts.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-zinc-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-zinc-900" />
                </div>
                <h3 className="font-bold text-xl text-zinc-900 mb-3">
                  Secure & Private
                </h3>
                <p className="text-zinc-500 leading-relaxed">
                  Your financial data is encrypted and safe. We prioritize your
                  privacy above all.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-zinc-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6">
                  <PieChart className="w-6 h-6 text-zinc-900" />
                </div>
                <h3 className="font-bold text-xl text-zinc-900 mb-3">
                  Smart Budgeting
                </h3>
                <p className="text-zinc-500 leading-relaxed">
                  Set custom limits for categories and stick to your goals with
                  smart alerts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="py-8 text-center text-zinc-400 text-sm">
        © {new Date().getFullYear()} TrackIt. All rights reserved.
      </footer>
    </div>
  );
}
