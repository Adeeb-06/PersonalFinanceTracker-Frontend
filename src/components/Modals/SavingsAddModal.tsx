"use client";
import savingsContext from "@/app/context/SavingsContext";
import axios from "axios";
import { Calendar, DollarSign, Target, X } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type SavingsGoalInputs = {
  title: string;
  currentAmount: string;
  targetAmount: string;
  deadline: string;
};

const SavingsAddModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (value: boolean) => void;
}) => {

  const {data:session} = useSession()
  const {refetchSavingsData} = useContext(savingsContext)!
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SavingsGoalInputs>();

  const onSubmit = async (data: SavingsGoalInputs) => {
    console.log(data);
    try {
      const email = session?.user?.email
      const res = await axios.post(
        "http://localhost:9000/api/savings/add",
        {...data,email},
        { withCredentials: true },
      );
      toast.success(res.data.message);
      setIsModalOpen(false);
      refetchSavingsData()
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-secondary border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Create Savings Goal
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Set a new financial target
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Goal Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                placeholder="e.g., Emergency Fund"
                className="block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
              />
            </div>

            {/* Current Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Current Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register("currentAmount", {
                    required: "Current amount is required",
                  })}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="block w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
                />
              </div>
            </div>

            {/* Target Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Target Amount
              </label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register("targetAmount", {
                    required: "Target amount is required",
                  })}
                  type="number"
                  step="0.01"
                  placeholder="10000.00"
                  className="block w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
                />
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Deadline
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  {...register("deadline", {
                    required: { value: true, message: "Deadline is required" },
                    validate: (value) => {
                      const today = new Date();
                      const deadline = new Date(value);
                      return (
                        deadline > today || "Deadline must be in the future"
                      );
                    },
                  })}
                  type="date"
                  className="block w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary hover:opacity-90 text-secondary font-semibold rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Goal
            </button>
          </div>
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 text-center py-2 rounded">
              {errors.title && <p>{errors.title.message}</p>}
              {errors.currentAmount && <p>{errors.currentAmount.message}</p>}
              {errors.targetAmount && <p>{errors.targetAmount.message}</p>}
              {errors.deadline && <p>{errors.deadline.message}</p>}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SavingsAddModal;
