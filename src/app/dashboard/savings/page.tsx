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
import { useAuth } from "@/providers/FirebaseAuthProvider";
import SavingsCardSkeleton from "@/components/Skeletons/SavingsCardSkeleton";
import NoSavingsFound from "@/components/Skeletons/NoSavings";

interface Goal {
  _id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  deadline: string;
}

export default function SavingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { firebaseUser, authLoading } = useAuth();

  const { savingsData, isSavingsLoading } = useContext(savingsContext)!;

  const showSkeleton =
    isSavingsLoading || authLoading || (!!firebaseUser && !savingsData);

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  console.log(savingsData);
  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen bg- p- md:p-2">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex bg-secondary rounded-2xl px-8 py-5 items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Savings Goals
            </h1>
            <p className="text-primary">
              Track and achieve your financial goals
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:opacity-90 text-secondary font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span className="sm:inline">Create Goal</span>
          </button>
        </div>

        {/* Savings Goals Grid */}
        <div
          className={` ${!showSkeleton && savingsData?.data?.length > 0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex"}`}
        >
          {showSkeleton &&
            Array.from({ length: 6 }).map((_, i) => (
              <SavingsCardSkeleton key={i} />
            ))}
          {!showSkeleton && savingsData?.data?.length === 0 && (
            <NoSavingsFound />
          )}
          {!showSkeleton &&
            savingsData?.data?.length > 0 &&
            savingsData?.data?.map((goal: Goal) => {
              const progress = getProgressPercentage(
                goal.currentAmount,
                goal.targetAmount,
              );
              const daysLeft = getDaysRemaining(goal.deadline);

              return (
                <SavingsCard
                  key={goal._id}
                  goal={goal}
                  progress={progress}
                  daysLeft={daysLeft}
                />
              );
            })}
        </div>

        {/* Create Goal Modal */}
        {isModalOpen && <SavingsAddModal setIsModalOpen={setIsModalOpen} />}
      </div>
    </div>
  );
}
