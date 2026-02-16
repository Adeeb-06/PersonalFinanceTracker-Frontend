"use client";
import axios from "axios";
import { Plus, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import UserContext from "@/app/context/UserContext";
import CategoriesContext from "@/app/context/CategoriesContext";
import BalanceAddModal from "./Income/BalanceAddModal";
import balanceContext from "@/app/context/BalanceContext";
import expenseContext from "@/app/context/ExpenseContext";

const AddCategories = () => {
  const { userData } = useContext(UserContext)!;
  const {refetchBalanceData} = useContext(balanceContext)!
  const {refetchExpenseData} = useContext(expenseContext)!
  const {
    incomeCategories,
    refetchIncomeCategories,
    expenseCategories,
    refetchExpenseCategories,
  } = useContext(CategoriesContext)!;

  const [newIncomeCat, setNewIncomeCat] = useState("");
  const [newExpenseCat, setNewExpenseCat] = useState("");
  console.log(incomeCategories);

  const addCategory = async (type: "income" | "expense") => {
    if (type === "income") {
      try {
        const res = await axios.post(
          "http://localhost:9000/api/categories/create-category",
          {
            name: newIncomeCat,
            type: "income",
            userEmail: userData?.email,
          },
          {
            withCredentials: true,
          },
        );
        console.log(res);
        if (res.status === 201) {
            refetchIncomeCategories()
            refetchBalanceData()
          toast.success("Income category added");
        }
      } catch (error) {
        toast.error("Failed to add category");
      }
    } else {
      if (!newExpenseCat.trim()) return;
      try {
        const res = await axios.post(
          "http://localhost:9000/api/categories/create-category",
          {
            name: newExpenseCat,
            type: "expense",
            userEmail: userData?.email,
          },
          {
            withCredentials: true,
          },
        );
       if(res.status == 201){
        refetchExpenseCategories()
        refetchExpenseData()
        toast.success("Expense category added");
       }
      } catch (error) {
        toast.error("Failed to add category");
      }
    }
  };

  const removeCategory = async(type: "income" | "expense", cat: string) => {
     try{
      const res = await axios.delete(
        `http://localhost:9000/api/categories/${cat}`,
        {
          withCredentials: true,
        },
      );
      console.log(res);
      if (res.status === 200) {
        if (type === "income") {
          
          refetchIncomeCategories();
        } else {
          refetchExpenseCategories();
        }
        toast.info("Category removed");
      }
     }catch(error:any){
      console.log(error);
      toast.error(error.response.data.message || "Failed to remove category");
     }
  };
  return (
    <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Income Card */}
      <div className="bg-secondary border border-gray-800 rounded-3xl flex flex-col overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-800 bg-gray-800/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Income</h2>
                <p className="text-xs text-gray-400">Manage income sources</p>
              </div>
            </div>
            <span className="text-xs font-mono bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
              {incomeCategories?.length}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4 flex-1">
          <div className="flex gap-2">
            <input
              type="text"
              value={newIncomeCat}
              onChange={(e) => setNewIncomeCat(e.target.value)}
              placeholder="Add new source..."
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-green-500 transition-colors"
              onKeyDown={(e) => e.key === "Enter" && addCategory("income")}
            />
            <button
              onClick={() => addCategory("income")}
              className="bg-green-500 hover:bg-green-600 text-white p-2.5 rounded-xl transition-colors shadow-lg shadow-green-500/20"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="h-[350px] overflow-y-auto custom-scrollbar pr-2 space-y-2">
            {incomeCategories?.map((cat, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-between p-3 bg-gray-800 border border-transparent hover:border-gray-700 rounded-xl transition-all"
              >
                <span className="text-primary font-medium">{cat.name}</span>
                <button
                  onClick={() => removeCategory("income", cat._id)}
                  className="text-primary hover:text-red-400  transition-all p-2 hover:bg-red-500/10 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expense Card */}
      <div className="bg-secondary border border-gray-800 rounded-3xl flex flex-col overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-800 bg-gray-800/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Expenses</h2>
                <p className="text-xs text-gray-400">Manage spending types</p>
              </div>
            </div>
            <span className="text-xs font-mono bg-red-500/10 text-red-400 px-3 py-1 rounded-full border border-red-500/20">
              {expenseCategories?.length}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4 flex-1">
          <div className="flex gap-2">
            <input
              type="text"
              value={newExpenseCat}
              onChange={(e) => setNewExpenseCat(e.target.value)}
              placeholder="Add new category..."
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
              onKeyDown={(e) => e.key === "Enter" && addCategory("expense")}
            />
            <button
              onClick={() => addCategory("expense")}
              className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-xl transition-colors shadow-lg shadow-red-500/20"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="h-[350px] overflow-y-auto custom-scrollbar pr-2 space-y-2">
            {expenseCategories?.map((cat, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-between p-3 bg-gray-800 border border-transparent hover:border-gray-700 rounded-xl transition-all"
              >
                <span className="text-primary font-medium">{cat.name}</span>
                <button
                  onClick={() => removeCategory("expense", cat._id)}
                  className="text-primary hover:text-red-400  transition-all p-2 hover:bg-red-500/10 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
