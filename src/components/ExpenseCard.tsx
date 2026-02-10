"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Minus,
  TrendingDown,
  Calendar,
  Clock,
  Eye,
  EyeOff,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import ExpenseAddModal from "./ExpenseAddModal";
import budgetContext from "@/app/context/BudgetContext";
import expenseContext from "@/app/context/ExpenseContext";

export default function ExpenseCard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showExpense, setShowExpense] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const {
    budgetByMonthData,
    isBudgetByMonthLoading,
    refetchBudgetByMonthData,
    setMonth,
  } = useContext(budgetContext)!;
  const {
    setMonthExpense,
    setYear,
    totalExpenseByMonthData,
    refetchExpenseData,
    isTotalExpenseByMonthLoading,
  } = useContext(expenseContext)!;

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();

    setMonth(`${month}/${year}`);
    setMonthExpense(month);
    setYear(year);

    refetchExpenseData();
    refetchBudgetByMonthData();
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month] = e.target.value.split("-").map(Number);
    setSelectedDate(new Date(year, month - 1, 1));
  };


  // console.log(totalExpenseByMonthData)

  // console.log(currentMonth , currentYear)


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // console.log(budgetByMonthData)

  // Mock data - replace with actual context/props
  const totalExpense = totalExpenseByMonthData?.total || 0;
  const monthlyBudget = budgetByMonthData?.amount || 0;
  const spent = budgetByMonthData?.spent || 0;
  const remaining = budgetByMonthData?.remaining || 0;

  const percentageUsed = monthlyBudget > 0 ? (spent / monthlyBudget) * 100 : 0;
  const isOverBudget = monthlyBudget > 0 && spent > monthlyBudget;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleAddExpense = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-full bg-secondary border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Side - Expense */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm md:text-base font-medium text-gray-400 uppercase tracking-wide">
              Total Expenses
            </h2>
            <button
              onClick={() => setShowExpense(!showExpense)}
              className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-400 hover:text-white"
            >
              {showExpense ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            {showExpense ? (
              <>
                {isTotalExpenseByMonthLoading ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  <>
                    <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-red-400 tracking-tight">
                      ${totalExpense?.toFixed(0)}
                    </span>
                    <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-red-500 opacity-70">
                      .{(totalExpense % 1)?.toFixed(2).split(".")[1]}
                    </span>
                  </>
                )}
              </>
            ) : (
              <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-600 tracking-tight">
                ••••••
              </span>
            )}
          </div>

          {/* Month Indicator */}
          <div className="relative flex items-center gap-2 mb-4 group w-fit">
            <Calendar className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors duration-300" />
            <span className="text-sm text-gray-400 font-medium group-hover:text-white transition-colors duration-300">
              {formatDate(selectedDate)}
            </span>
            <ChevronDown className="w-3 h-3 text-gray-600 group-hover:text-primary transition-colors duration-300 transform group-hover:rotate-180" />
            
            {/* Hidden Date Input */}
            <input
              type="month"
              value={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}`}
              onChange={handleDateChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              title="Select Month"
            />
          </div>

          {/* Budget Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Budget Usage
              </span>
              <span
                className={`text-xs font-bold ${isOverBudget ? "text-red-400" : "text-gray-400"}`}
              >
                {percentageUsed.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isOverBudget
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : percentageUsed > 75
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                      : "bg-gradient-to-r from-green-500 to-emerald-500"
                }`}
                style={{ width: `${Math.min(percentageUsed, 100)}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">
                ${remaining.toFixed(2)} remaining
              </span>
              <span className="text-xs text-gray-500">
                of ${monthlyBudget.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Warning if over budget */}
          {isOverBudget && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-500 bg-opacity-10 rounded-lg border border-red-500 border-opacity-30">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-xs font-semibold text-primary">
                Over budget by ${(totalExpense - monthlyBudget).toFixed(2)}
              </span>
            </div>
          )}
          {
            !budgetByMonthData && (
               <div className="flex items-center gap-2 px-3 py-2 bg-red-500 bg-opacity-10 rounded-lg border border-red-500 border-opacity-30">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-xs font-semibold text-primary">
                No Budget Set for This Month
              </span>
            </div>
            )
          }
        </div>

        {/* Right Side - Actions & Info */}
        <div className="flex flex-col gap-4 lg:items-end">
          {/* Add Expense Button */}
          <button
            onClick={handleAddExpense}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-secondary font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl w-full lg:w-auto"
          >
            <Minus className="w-5 h-5" />
            <span>Add Expense</span>
          </button>

          {/* Current Time */}
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium font-mono">
              {formatTime(currentTime)}
            </span>
          </div>

          {/* Expense Stats */}
          <div className="pt-2 border-t border-gray-800 w-full lg:w-auto space-y-2">
            <div className="flex items-center justify-between lg:flex-col lg:items-end gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                This Week
              </span>
              <span className="text-sm font-bold text-white">$842.30</span>
            </div>
            <div className="flex items-center justify-between lg:flex-col lg:items-end gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Transactions
              </span>
              <span className="text-sm font-bold text-white">47</span>
            </div>
          </div>
        </div>
      </div>

      {isOpen && <ExpenseAddModal setIsOpen={setIsOpen} />}
    </div>
  );
}
