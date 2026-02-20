"use client";
import React, { useContext, useState } from "react";
import { Calendar, DollarSign, Edit2, Plus } from "lucide-react";
import BudgetAddModal from "./BudgetAddModal";
import budgetContext from "@/app/context/BudgetContext";
import { useAuth } from "@/providers/FirebaseAuthProvider";
import BudgetSkeleton from "./Skeletons/BudgetTableSkeleton";
import { NoBudget } from "./Skeletons/NoBudget";

export default function BudgetTable() {
  const { firebaseUser, authLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { budgetData, isBudgetLoading, refetchBudgetData } =
    useContext(budgetContext)!;

  console.log(budgetData);

  const getProgressPercentage = (spent: number, total: number) => {
    return (spent / total) * 100;
  };

  const showSkeleton =
    isBudgetLoading || authLoading || (!!firebaseUser && !budgetData);

  const handleAddBudget = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-full bg-zinc rounded-2xl overflow-hidden shadow-lg">
      {/* Table Header */}
      <div className="px-8 py-6 bg-secondary">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary">Budget Overview</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Manage your monthly budgets
            </p>
          </div>
          <button
            onClick={handleAddBudget}
            className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary/90 text-secondary  font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Budget</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="p-6 space-y-4 bg-primary/20  ">
        {showSkeleton &&
          Array.from({ length: 5 }).map((_, idx) => (
            <BudgetSkeleton key={idx} />
          ))}
        {!showSkeleton && budgetData?.data?.length === 0 && <NoBudget />}
        {!showSkeleton &&
          budgetData?.data?.length! > 0 &&
          budgetData?.data?.map((budget, index) => (
            <div
              key={budget._id}
              className="bg-primary rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-zinc-200"
              style={{
                animation: `slideIn 0.3s ease-out ${index * 0.05}s backwards`,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left Section - Month */}
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-xl">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">
                      {budget.month}
                    </h3>
                    <p className="text-sm text-zinc-500">Monthly Budget</p>
                  </div>
                </div>

                {/* Middle Section - Amount & Progress */}
                <div className="flex-1 md:mx-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-zinc-600" />
                    <span className="text-3xl font-bold text-zinc-900">
                      {budget.amount.toFixed(0)}
                    </span>
                    <span className="text-xl font-semibold text-zinc-500">
                      .{(budget.amount % 1).toFixed(2).split(".")[1]}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {budget.spent > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-zinc-600">
                          ${budget.spent.toFixed(2)} spent
                        </span>
                        <span className="text-xs font-medium text-zinc-600">
                          ${budget.remaining.toFixed(2)} left
                        </span>
                      </div>
                      <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            getProgressPercentage(budget.spent, budget.amount) >
                            90
                              ? "bg-gradient-to-r from-red-500 to-red-600"
                              : getProgressPercentage(
                                    budget.spent,
                                    budget.amount,
                                  ) > 75
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                : "bg-gradient-to-r from-emerald-500 to-green-500"
                          }`}
                          style={{
                            width: `${getProgressPercentage(budget.spent, budget.amount)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Section - Update Button */}
                <div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <Edit2 className="w-4 h-4" />
                    <span>Update</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Table Footer */}
      <div className="px-8 py-4 bg-white border-t border-zinc-200">
        <div className="flex items-center justify-between text-sm">
          <p className="text-zinc-600">
            Showing{" "}
            <span className="font-semibold text-zinc-900">
              {budgetData?.data.length}
            </span>{" "}
            budget periods
          </p>
          <button className="px-4 py-2 text-zinc-700 hover:text-zinc-900 font-medium hover:bg-zinc-100 rounded-lg transition-colors duration-200">
            View All
          </button>
        </div>
      </div>

      {isOpen && <BudgetAddModal setIsOpen={setIsOpen} />}
    </div>
  );
}
