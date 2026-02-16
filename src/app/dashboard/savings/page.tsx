"use client";
import React, { useContext, useState } from "react";
import {
  Plus,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  X,
} from "lucide-react";
import SavingsAddModal from "@/components/Modals/SavingsAddModal";
import SavingsCard from "@/components/SavingsCard";
import savingsContext from "@/app/context/SavingsContext";

export default function SavingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {savingsData , isSavingsLoading} = useContext(savingsContext)!

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

  console.log(savingsData)
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
          {savingsData?.data?.map((goal) => {
            const progress = getProgressPercentage(
              goal.currentAmount,
              goal.targetAmount,
            );
            const daysLeft = getDaysRemaining(goal.deadline);

            return (
             <SavingsCard goal={goal} progress={progress} daysLeft={daysLeft} />
            );
          })}
        </div>

        {/* Create Goal Modal */}
        {isModalOpen && <SavingsAddModal setIsModalOpen={setIsModalOpen} />}
      </div>
    </div>
  );
}
