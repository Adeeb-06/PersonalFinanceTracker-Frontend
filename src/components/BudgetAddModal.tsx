import { useContext, useState } from "react";
import { X, DollarSign, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import budgetContext from "@/app/context/BudgetContext";

interface Budget {
  amount: number;
  month: string;
}

export default function BudgetAddModal({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { register, handleSubmit } = useForm<Budget>();
  const { data: session } = useSession();

  const {refetchBudgetData} = useContext(budgetContext)!

  const onSubmit = async (data: Budget) => {
    const newData = {
      ...data,
      userEmail: session?.user?.email,
    };
    try {
      const res = await axios.post(
        "http://localhost:9000/api/budget/add-budget",
        newData,
        {
          withCredentials: true,
        },
      );

      if (res.status === 201) {
        toast.success("Budget added successfully!");
        setIsOpen(false);
        refetchBudgetData()
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error(error.response?.data?.message || "Creation failed!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0  bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Modal Container */}
        <div className="bg-secondary rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-200">
            <div>
              <h2 className="text-2xl font-bold text-primary">Create Budget</h2>
              <p className="text-sm text-primary-500 mt-1">
                Set your monthly spending limit
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-primary hover:text-primary hover:bg-zinc-100 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 space-y-5">
              {/* Amount Field */}
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-semibold text-primary mb-2"
                >
                  Budget Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-secondary" />
                  </div>
                  <input
                    id="amount"
                    {...register("amount", {
                      required: { value: true, message: "Amount is required" },
                    })}
                    className="block w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-secondary placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-all duration-200 text-lg font-semibold"
                    placeholder="5000.00"
                  />
                </div>
                <p className="mt-2 text-xs text-primary">
                  Enter the total amount you want to budget for the month
                </p>
              </div>

              {/* Month Field */}
              <div>
                <label
                  htmlFor="month"
                  className="block text-sm font-semibold text-primary mb-2"
                >
                  Budget Month
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-secondary" />
                  </div>
                  <input
                    id="month"
                    type="month"
                    {...register("month", {
                      required: { value: true, message: "Month is required" },
                    })}
                    className="block w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-secondary focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-all duration-200 text-lg font-semibold"
                  />
                </div>
                <p className="mt-2 text-xs text-primary">
                  Select the month for this budget
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-200 bg-secondary rounded-b-2xl">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-white hover:bg-zinc-100 text-primary-700 font-semibold rounded-xl transition-colors duration-200 border border-zinc-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Budget
              </button>
            </div>
          </form>
          {/* Modal Body */}
        </div>
      </div>
    </>
  );
}
