"use client";
import React, { useContext, useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import expenseContext from "@/app/context/ExpenseContext";
import budgetContext from "@/app/context/BudgetContext";
import UserContext from "@/app/context/UserContext";

export default function DeleteConfirmationModal({
  isOpen,
  setIsOpen,
  itemType,
  name,
  id,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  itemType: string;
  name: string;
  id: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const { refetchExpenseData , refetchTotalExpenseByMonthData} = useContext(expenseContext)!
  const {refetchBudgetByMonthData , refetchBudgetData} = useContext(budgetContext)!
  const {refetchUser} = useContext(UserContext)!

  // Item details - pass these as props in real implementat

  const handleCancel = () => {
    setIsOpen(false);
  };


  const deleteTransaction = async (id : string , type : string) =>{
    if(type === "expense"){
      const res = await axios.delete(`http://localhost:9000/api/expense/delete-expense/${id}`, {
        withCredentials: true
      })
      if(res.status === 200){
      toast.success("Transaction deleted successfully")
      setIsOpen(false)
      refetchExpenseData()
      refetchTotalExpenseByMonthData()
      refetchBudgetByMonthData()
      refetchBudgetData()
      refetchUser()
    }
    else{
      toast.error("Failed to delete transaction")
    }
    }
    else{
      const res = await axios.delete(`http://localhost:3000/api/income/${id}`,{
        withCredentials: true
      })
      if(res.status === 200){
      toast.success("Transaction deleted successfully")
      setIsOpen(false)
      refetchExpenseData()
      refetchBudgetByMonthData()
      refetchBudgetData()
      refetchUser()
    }
    else{
      toast.error("Failed to delete transaction")
    }
    }

    
  }

  return (
    <>
      <div className="fixed inset-0 bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
        {/* Modal Container */}
        <div
          className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl transform transition-all"
          style={{
            animation: "scaleIn 0.3s ease-out",
          }}
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-start gap-4">
              {/* Warning Icon */}
              <div className="bg-red-500 bg-opacity-10 p-3 rounded-xl border-2 border-red-500">
                <AlertTriangle
                  className="w-6 h-6 text-primary"
                  strokeWidth={2.5}
                />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-1">
                  Confirm Deletion
                </h2>
                <p className="text-sm text-gray-400">
                  This action cannot be undone
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleCancel}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                disabled={isDeleting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete this {itemType}?
            </p>

            {/* Item Preview */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700 mb-4">
              <p className="text-sm text-gray-400 mb-1">
                You are about to delete:
              </p>
              <p className="text-white font-semibold">{name}</p>
            </div>

            {/* Warning Message */}
            <div className="flex items-start gap-3 p-4 bg-red-400 bg-opacity-5 border border-red-500 border-opacity-20 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-primary font-medium mb-1">Warning</p>
                <p className="text-sm text-primary">
                  This will permanently remove this {itemType} from your
                  records. This action cannot be reversed.
                </p>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800 bg-gray-800 bg-opacity-30 rounded-b-2xl">
            <button
              onClick={handleCancel}
              disabled={isDeleting}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteTransaction(id , itemType)}
              disabled={isDeleting}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-5 h-5" />
                  <span>Delete</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
