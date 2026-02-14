"use client"
import { QueryObserverResult } from "@tanstack/react-query";
import React ,{ createContext } from "react";

interface ExpenseItem {
   _id: string;
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

interface TotalExpenseByMonth {
  total: number;
  monthName: string;
  monthNumber: number;
}

interface ExpenseContextType {
   expenseData: ExpenseResponse;
   refetchExpenseData: () => Promise<QueryObserverResult<ExpenseItem[], Error>>;
   isExpenseLoading: boolean;
   setPage: React.Dispatch<React.SetStateAction<number>>;
   setLimit: React.Dispatch<React.SetStateAction<number>>;
   page: number;
   setMonthExpense: React.Dispatch<React.SetStateAction<number | undefined>>;
   setYear: React.Dispatch<React.SetStateAction<number| undefined>>;
   totalExpenseByMonthData: TotalExpenseByMonth;
   refetchTotalExpenseByMonthData: () => Promise<QueryObserverResult<TotalExpenseByMonth[], Error>>;
   isTotalExpenseByMonthLoading: boolean;
   expenseDataById: ExpenseItem;
   refetchExpenseDataById: () => Promise<QueryObserverResult<ExpenseItem[], Error>>;
   isExpenseDataByIdLoading: boolean;
   expenseDataByIdError: Error;
   setExpenseId: React.Dispatch<React.SetStateAction<string | undefined>>;
   expenseId: string | undefined;
}


const expenseContext = createContext<ExpenseContextType | null>(null);

export default expenseContext;