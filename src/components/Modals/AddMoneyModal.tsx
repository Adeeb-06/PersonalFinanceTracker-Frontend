"use client";
import React, { useContext, useState } from "react";
import { X, DollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import savingsContext from "@/app/context/SavingsContext";

interface AddMoneyForm {
  amount: number;
}

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  savingsId: string;
  goalTitle: string;
  currentAmount: number;
  targetAmount: number;
}

const AddMoneyModal = ({
  isOpen,
  onClose,
  savingsId,
  goalTitle,
  currentAmount,
  targetAmount,
}: AddMoneyModalProps) => {


  const {refetchSavingsData} =  useContext(savingsContext)!
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddMoneyForm>();

  const onSubmit = async (data: AddMoneyForm) => {
    try {
      const res = await axios.put(
        `http://localhost:9000/api/savings/add-money/${savingsId}`,
        { amount: Number(data.amount) },
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        toast.success("Money added successfully!");
        reset();
        refetchSavingsData()
        onClose();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add money");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-secondary border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-white">Add Money</h2>
            <p className="text-sm text-gray-400 mt-1">
              Add funds to{" "}
              <span className="text-primary font-medium">{goalTitle}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Modal Body */}
          <div className="p-6 space-y-5">
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Current Progress</span>
                <span className="text-white font-medium">
                  ${currentAmount.toLocaleString()} / $
                  {targetAmount.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((currentAmount / targetAmount) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Amount Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Amount to Add
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("amount", {
                    required: "Amount is required",
                    min: {
                      value: 0.01,
                      message: "Amount must be greater than 0",
                    },
                    max:{
                      value:targetAmount-currentAmount,
                      message:`Amount must be less than or equal to ${targetAmount-currentAmount}`
                    }
                  })}
                  className="block w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary hover:opacity-90 text-secondary font-semibold rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? "Adding..." : "Add Money"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMoneyModal;
