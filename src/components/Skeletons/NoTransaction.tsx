import { Wallet } from "lucide-react";
import React from "react";

export function NoTransactions() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-xl opacity-20"></div>
        <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-full animate-pulse">
          <Wallet className="w-16 h-16 text-white" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">No Transactions Yet</h3>
      <p className="text-gray-400 text-center max-w-md mb-6">
        You haven't recorded any transactions. Start tracking your income and expenses to manage your finances better.
      </p>
      <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
        Add Transaction
      </button>
    </div>
  );
}
