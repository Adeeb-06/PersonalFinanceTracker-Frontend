import React from "react";
import { TrendingUp } from "lucide-react";

export function NoBudget() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-zinc-50 rounded-2xl border border-zinc-200">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-full blur-xl opacity-20"></div>
        <div className="relative bg-gradient-to-br from-zinc-700 to-zinc-900 p-6 rounded-full">
          <TrendingUp className="w-16 h-16 text-white" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-zinc-900 mb-2">No Budget Set</h3>
      <p className="text-zinc-600 text-center max-w-md mb-6">
        Create your first budget to start managing your monthly spending and reach your financial goals.
      </p>
      <button className="px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
        Create Budget
      </button>
    </div>
  );
}