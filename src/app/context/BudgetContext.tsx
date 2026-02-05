"use client"
import { QueryObserverResult } from "@tanstack/react-query";
import { createContext } from "react";

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
  budgetData: BudgetResponse;
  refetchBudgetData: () => Promise<QueryObserverResult<BudgetItem[], Error>>;
  isBudgetLoading: boolean;
}

const budgetContext = createContext<BudgetContextType | null>(null);

export default budgetContext;