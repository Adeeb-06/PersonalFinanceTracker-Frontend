"use client";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { createContext, Dispatch, SetStateAction } from "react";

export interface Category {
  _id: string;
  name: string;
  type: "income" | "expense";
  userEmail: string;
}

export interface CategoriesContextType {
  incomeCategories: Category[];
  expenseCategories: Category[];
  refetchIncomeCategories: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
  refetchExpenseCategories: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
  incomeCategoriesLoading: boolean;
  expenseCategoriesLoading: boolean;
  incomeCategoriesError: unknown;
  expenseCategoriesError: unknown;
  setCategory: Dispatch<SetStateAction<string | undefined>>; 
  expenseCategory: string | undefined;
  setExpenseCategory: Dispatch<SetStateAction<string | undefined>>;
  incomeCategory: string | undefined;
  setIncomeCategory: Dispatch<SetStateAction<string | undefined>>;
  expenseCategoryAnalytics: any;
  expenseCategoryAnalyticsLoading: boolean;
  refetchExpenseCategoryAnalytics: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
  expenseCategoryAnalyticsError: unknown;
  incomeCategoryAnalytics: any;
  incomeCategoryAnalyticsLoading: boolean;
  refetchIncomeCategoryAnalytics: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
  incomeCategoryAnalyticsError: unknown;
  expenseMonth: number | undefined;
  expenseYear: number | undefined;
  setExpenseMonth: Dispatch<SetStateAction<number | undefined>>;
  setExpenseYear: Dispatch<SetStateAction<number | undefined>>;
  incomeMonth: number | undefined;
  incomeYear: number | undefined;
  setIncomeMonth: Dispatch<SetStateAction<number | undefined>>;
  setIncomeYear: Dispatch<SetStateAction<number | undefined>>;
}

const CategoriesContext = createContext<CategoriesContextType | null>(null);

export default CategoriesContext;
