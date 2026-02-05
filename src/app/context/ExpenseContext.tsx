"use client"
import { QueryObserverResult } from "@tanstack/react-query";
import React ,{ createContext } from "react";

interface ExpenseItem {
   _id: string | number;
  date: string;
  time: string;
  amount: number;
  category: string;
  description: string;
}

interface ExpenseResponse {
  data: ExpenseItem[];
  pagination: {
    currentPage:number;
    page: number;
    totalPages: number;
  };
}

interface ExpenseContextType {
   expenseData: ExpenseResponse;
   refetchExpenseData: () => Promise<QueryObserverResult<ExpenseItem[], Error>>;
   isExpenseLoading: boolean;
   setPage: React.Dispatch<React.SetStateAction<number>>;
   setLimit: React.Dispatch<React.SetStateAction<number>>;
   page: number;
}


const expenseContext = createContext<ExpenseContextType | null>(null);

export default expenseContext;