"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  X,
  Calendar,
  Clock,
  DollarSign,
  Tag,
  FileText,
  Mail,
  TrendingUp,
  TrendingDown,
  Axis3DIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import balanceContext from "@/app/context/BalanceContext";
import UserContext from "@/app/context/UserContext";
import expenseContext from "@/app/context/ExpenseContext";
import budgetContext from "@/app/context/BudgetContext";
import CategoriesContext from "@/app/context/CategoriesContext";
import DashboardContext from "@/app/context/DashboardContext";


interface Balance {
  date: string;
  time: string;
  amount: number;
  type: "income";
  category: string;
  description: string;
}

export default function IncomeUpdateModal({
  setIsOpen,
  incomeId,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  incomeId: string;
}) {
  const { refetchBalanceData } = useContext(balanceContext)!;
  const { refetchUser } = useContext(UserContext)!;
  const {
    setIncomeId,
    incomeDataById,
    refetchIncomeDataById,
    isIncomeDataByIdLoading,
  } = useContext(balanceContext)!;
  const { refetchBudgetByMonthData, refetchBudgetData } =
    useContext(budgetContext)!;
  const { incomeCategories } = useContext(CategoriesContext)!;
  const { refetchDashboardData } = useContext(DashboardContext)!;

  useEffect(() => {
    if (incomeId) {
      setIncomeId(incomeId);
    }
  }, [incomeId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Balance>();
  const { data: session } = useSession();

  useEffect(() => {
    reset({
      date: incomeDataById?.date?.split("T")[0],
      time: incomeDataById?.time,
      amount: incomeDataById?.amount,
      category: incomeDataById?.category,
      description: incomeDataById?.description,
    });
  }, [incomeDataById]);

  const onSubmit = async (data: Balance) => {
    const newData = {
      ...data,
      userEmail: session?.user?.email,
    };
    console.log(newData);
    try {
      const res = await api.put(`api/balance/update-income/${incomeId}`, newData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        refetchBalanceData();
        refetchUser();
        refetchBudgetByMonthData();
        refetchBudgetData();
        refetchDashboardData();
        toast.success("Transaction updated successfully!");
        setIsOpen(false);
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.log(error);
        toast.error(error.message || "Updation failed!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0  bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center ">
        {/* Modal Container */}
        <div className="bg-secondary border border-gray-800 rounded-2xl p-4 w-full max-w-2xl shadow-2xl transform transition-all">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div>
              <h2 className="text-2xl font-bold text-white">Update Income</h2>
              <p className="text-sm text-gray-400 mt-1">
                Update your income entry
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-3">
              {/* Transaction Type Toggle */}

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Date Field */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="date"
                      {...register("date", {
                        required: { value: true, message: "Date is required" },
                      })}
                      type="date"
                      className="block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Time Field */}
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="time"
                      type="time"
                      {...register("time", {
                        required: { value: true, message: "Time is required" },
                      })}
                      className="block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Amount Field */}
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="amount"
                      type="number"
                      {...register("amount", {
                        required: {
                          value: true,
                          message: "Amount is required",
                        },
                      })}
                      placeholder="0.00"
                      className="block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Category Field */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-500" />
                    </div>
                    <select
                      id="category"
                      {...register("category", {
                        required: {
                          value: true,
                          message: "Category is required",
                        },
                      })}
                      className="block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="">Select category</option>

                      {incomeCategories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Description Field - Full Width */}
              <div className="mt-5">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Description
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="description"
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Description is required",
                      },
                    })}
                    placeholder="Add transaction details..."
                    className="block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-200 resize-none"
                  ></input>
                </div>
              </div>
            </div>

            <div>
              {Object.keys(errors).length > 0 && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 text-center py-2 rounded">
                  {errors.date && <p>{errors.date.message}</p>}
                  {errors.time && <p>{errors.time.message}</p>}
                  {errors.amount && <p>{errors.amount.message}</p>}
                  {errors.category && <p>{errors.category.message}</p>}
                  {errors.description && <p>{errors.description.message}</p>}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg transition-colors duration-200 shadow-lg"
              >
                Save Transaction
              </button>
            </div>
          </form>
          {/* Modal Body */}
        </div>
      </div>
    </>
  );
}
