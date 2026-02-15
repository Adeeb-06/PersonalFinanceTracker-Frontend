"use client";
import React, { useState } from "react";
import {
  Plus,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  X,
} from "lucide-react";
import SavingsAddModal from "@/components/Modals/SavingsAddModal";

export default function SavingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock savings goals data
  const savingsGoals = [
    {
      id: 1,
      title: "Emergency Fund",
      currentAmount: 3500,
      targetAmount: 10000,
      deadline: "2026-12-31",
    },
    {
      id: 2,
      title: "New Car",
      currentAmount: 8200,
      targetAmount: 25000,
      deadline: "2027-06-30",
    },
    {
      id: 3,
      title: "Vacation",
      currentAmount: 1800,
      targetAmount: 5000,
      deadline: "2026-08-15",
    },
    {
      id: 4,
      title: "Home Down Payment",
      currentAmount: 15000,
      targetAmount: 50000,
      deadline: "2028-01-01",
    },
  ];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen bg- p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
              Savings Goals
            </h1>
            <p className="text-secondary">
              Track and achieve your financial goals
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-secondary hover:opacity-90 text-primary font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span className="sm:inline">Create Goal</span>
          </button>
        </div>

        {/* Savings Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savingsGoals.map((goal) => {
            const progress = getProgressPercentage(
              goal.currentAmount,
              goal.targetAmount,
            );
            const daysLeft = getDaysRemaining(goal.deadline);

            return (
              <div
                key={goal.id}
                className="bg-secondary border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="bg-gray-800 flex justify-between items-center p-5">
                  <h3 className="text-2xl font-bold text-primary">
                    {goal.title}
                  </h3>
                  <span className="text-xs font-semibold text-secondary bg-primary px-3 py-1 rounded-full">
                    {progress.toFixed(0)}%
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  {/* Amount Info */}
                  <div className="mb-5">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-white">
                        ${goal.currentAmount.toLocaleString()}
                      </span>
                      <span className="text-gray-500">of</span>
                      <span className="text-xl font-semibold text-gray-400">
                        ${goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      $
                      {(
                        goal.targetAmount - goal.currentAmount
                      ).toLocaleString()}{" "}
                      remaining
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-5">
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Deadline Info */}
                  <div className="flex items-center justify-between p-3 bg-gray-800 bg-opacity-50 rounded-xl mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Deadline</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">
                        {new Date(goal.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p
                        className={`text-xs ${daysLeft < 30 ? "text-red-400" : "text-gray-500"}`}
                      >
                        {daysLeft} days left
                      </p>
                    </div>
                  </div>

                  {/* Add Money Button */}
                  <button
                    onClick={() => console.log("Add money to goal:", goal.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:opacity-90 text-secondary font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Money</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Goal Modal */}
        {isModalOpen && <SavingsAddModal setIsModalOpen={setIsModalOpen} />}
      </div>
    </div>
  );
}
