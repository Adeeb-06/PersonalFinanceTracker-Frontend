"use client"
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { createContext, Dispatch, SetStateAction } from "react";

interface BudgetItem {
  _id: string | number;
  month: string;
  amount: number;
  spent: number;
  remaining: number;
}

interface BudgetResponse {
  data: BudgetItem[];
  pagination: {
    currentPage: number;
    page: number;
    totalPages: number;
  };
}

interface BudgetContextType {
  budgetData: BudgetResponse | undefined;
  refetchBudgetData: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
  isBudgetLoading: boolean;
  budgetByMonthData: BudgetItem | undefined;
  refetchBudgetByMonthData: (options?: RefetchOptions) => Promise<QueryObserverResult<BudgetItem, Error>>;
  isBudgetByMonthLoading: boolean;
  month: string | undefined;
  setMonth: Dispatch<SetStateAction<string>>; 
}

const budgetContext = createContext<BudgetContextType | null>(null);

export default budgetContext;