"use client";
import React, { useEffect, useState } from "react";
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  PieChart,
  Target,
} from "lucide-react";
import { useContext } from "react";
import DashboardContext from "@/app/context/DashboardContext";
import DashboardSkeleton from "./Skeletons/DashboardSkeleton";
import { useSession } from "next-auth/react";

export default function DashboardOverviewCard() {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );

  const { data: session, status } = useSession();



  const year: number = Number(selectedMonth.split("-")[0]);
  const month: number = Number(selectedMonth.split("-")[1]);

  console.log(year, month, "afd");

  const {
    dashboardReport,
    dashboardLoading,
    dashboardIsError,
    dashboardError,
    refetchDashboardData,
    setMonth,
    setYear,
  } = useContext(DashboardContext)!;

  console.log(dashboardReport, "report");
  const showSkeleton =
    dashboardLoading ||
    status === "loading" ||
    (status === "authenticated" && !dashboardReport);

  if (showSkeleton) {
    return <DashboardSkeleton />;
  }

  const handleDate = (date: string) => {
    const year = Number(date.split("-")[0]);
    const month = Number(date.split("-")[1]);
    setMonth(month);
    setYear(year);
    refetchDashboardData();
  };

  // Mock data - replace with actual data
  const monthData = {
    balance: 12450.5,
    income: 8240.0,
    expense: 3280.5,
    savings: 4959.5,
    savingsRate: 60.2,
    transactionCount: 47,
    topCategory: "Groceries",
    topCategoryAmount: 850.5,
    previousMonth: {
      balance: 11200.0,
      expense: 3580.0,
    },
  };

  const balanceChange = monthData.balance - monthData.previousMonth.balance;
  const balanceChangePercent = (
    (balanceChange / monthData.previousMonth.balance) *
    100
  ).toFixed(1);
  const isBalanceUp = balanceChange > 0;

  const expenseChange = monthData.expense - monthData.previousMonth.expense;
  const expenseChangePercent = (
    (expenseChange / monthData.previousMonth.expense) *
    100
  ).toFixed(1);
  const isExpenseUp = expenseChange > 0;

  const isDeficit = dashboardReport?.surplusPercentage < 0;

  return (
    <div className="w-full bg-secondary border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Financial Overview
            </h2>
            <p className="text-sm text-gray-400">Your monthly summary</p>
          </div>

          {/* Month Selector */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
            />
            <button
              onClick={() => handleDate(selectedMonth)}
              className="ml-2 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Top Row - Balance & Expense */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Balance Card */}
          <div className="bg-primary rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-secondary p-2 rounded-lg">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <span className="text-secondary text-sm font-semibold opacity-90">
                  Total Balance - Current
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-secondary">
                ${dashboardReport?.balance}
              </span>
              <span className="text-xl font-semibold text-secondary opacity-70">
                .{(dashboardReport?.balance % 1).toFixed(2).split(".")[1]}
              </span>
            </div>
          </div>

          {/* Expense Card */}
          <div className="bg-primary rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-secondary p-2 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-primary" />
                </div>
                <span className="text-secondary text-sm font-semibold opacity-90">
                  Total Expenses
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-secondary">
                ${dashboardReport?.totalExpense || 0}
              </span>
              <span className="text-xl font-semibold text-secondary opacity-70">
                .{(dashboardReport?.totalExpense % 1).toFixed(2).split(".")[1]}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Income */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                Income
              </span>
            </div>
            <p className="text-xl font-bold text-white">
              ${dashboardReport?.totalIncome || 0}
            </p>
          </div>

          {/* Savings */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                Savings
              </span>
            </div>
            <p className="text-xl font-bold text-white">
              ${dashboardReport?.balance - dashboardReport?.totalExpense}
            </p>
          </div>

          {/* Savings Rate */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <PieChart className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                Savings Rate
              </span>
            </div>
            <p className="text-xl font-bold text-white">
              {monthData.savingsRate}%
            </p>
          </div>

          {/* Transactions */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                Transactions
              </span>
            </div>
            <p className="text-xl font-bold text-white">
              {dashboardReport?.totalTransaction}
            </p>
          </div>
        </div>

        {/* Bottom Section - Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top Spending Category */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <h4 className="text-sm font-semibold text-gray-400 mb-3">
              Top Spending Category
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">
                {dashboardReport?.topExpenseCategory?.category}
              </span>
              <span className="text-lg font-bold text-red-400">
                ${dashboardReport?.topExpenseCategory?.amount}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
              <div
                className="bg-gradient-to-r from-red-500 to-rose-600 h-2 rounded-full"
                style={{
                  width: `${(dashboardReport?.topExpenseCategory?.amount / dashboardReport?.totalExpense) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {(
                (dashboardReport?.topExpenseCategory?.amount / dashboardReport?.totalExpense) *
                100
              ).toFixed(1)}
              % of total expenses
            </p>
          </div>

          {/* Financial Health */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
            <h4 className="text-sm font-semibold text-gray-400 mb-3">
              Financial Health
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Income vs Expense</span>
                <span className={`text-sm font-bold ${isDeficit ? "text-red-400" : "text-green-400"}`}>
                 {
                  isDeficit ? "Deficit " : "Surplus "
                 }
                 {dashboardReport?.surplusPercentage?.toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Avg. Daily Spend</span>
                <span className="text-sm font-bold text-white">
                  ${(dashboardReport?.totalExpense / 28).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Budget Status</span>
                <span className={`text-sm font-bold ${dashboardReport?.budgetStatus?.status ? "text-green-400" : "text-red-400"}`}>
                  {dashboardReport?.budgetStatus?.status  ? "On Track" : "Off Track"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
