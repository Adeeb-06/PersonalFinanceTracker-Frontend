"use client";
import { Calendar, Plus, MoreVertical, Edit2, Trash2 } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import AddMoneyModal from "@/components/Modals/AddMoneyModal";

const SavingsCard = ({
  goal,
  progress,
  daysLeft,
}: {
  goal: any;
  progress: number;
  daysLeft: number;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    <div className="bg-secondary border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Card Header */}
      <div className="bg-gray-800 flex justify-between items-center p-5 relative">
        <h3 className="text-2xl font-bold text-primary">{goal.title}</h3>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-secondary bg-primary px-3 py-1 rounded-full">
            {progress.toFixed(0)}%
          </span>

          {/* Three Dot Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="p-2 hover:bg-gray-700 rounded-lg transition"
            >
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => {
                    console.log("Update goal:", goal.id);
                    setOpenMenu(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-gray-800 transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Update
                </button>

                <button
                  onClick={() => {
                    console.log("Delete goal:", goal.id);
                    setOpenMenu(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
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
            ${(goal.targetAmount - goal.currentAmount).toLocaleString()}{" "}
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
              className={`text-xs ${
                daysLeft < 30 ? "text-red-400" : "text-gray-500"
              }`}
            >
              {daysLeft} days left
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddMoneyModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:opacity-90 text-secondary font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span>Add Money</span>
        </button>
      </div>

     
    </div>
    {isAddMoneyModalOpen && (
        <AddMoneyModal
          isOpen={isAddMoneyModalOpen}
          onClose={() => setIsAddMoneyModalOpen(false)}
          savingsId={goal.id || goal._id}
          goalTitle={goal.title}
          currentAmount={goal.currentAmount}
          targetAmount={goal.targetAmount}
          onSuccess={() => {
            // Optional: Add logic to refresh data here
            console.log("Money added successfully");
          }}
        />
      )}
      </>
  );
};

export default SavingsCard;
