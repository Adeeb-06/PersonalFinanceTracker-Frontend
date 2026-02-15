"use client";
import { createContext } from "react";

export interface Category {
  _id: string;
  name: string;
  type: "income" | "expense";
  userEmail: string;
}

export interface CategoriesContextType {
  incomeCategories: Category[];
  expenseCategories: Category[];
  refetchIncomeCategories: () => void;
  refetchExpenseCategories: () => void;
  incomeCategoriesLoading: boolean;
  expenseCategoriesLoading: boolean;
  incomeCategoriesError: unknown;
  expenseCategoriesError: unknown;
  category: string;
  categoryAnalytics: any;
  categoryAnalyticsLoading: boolean;
  refetchCategoryAnalytics: () => void;
  categoryAnalyticsError: unknown;
  setCategory: (category: string) => void;
  expenseCategory: string;
  setExpenseCategory: (category: string) => void;
  incomeCategory: string;
  setIncomeCategory: (category: string) => void;
  expenseCategoryAnalytics: any;
  expenseCategoryAnalyticsLoading: boolean;
  refetchExpenseCategoryAnalytics: () => void;
  expenseCategoryAnalyticsError: unknown;
  incomeCategoryAnalytics: any;
  incomeCategoryAnalyticsLoading: boolean;
  refetchIncomeCategoryAnalytics: () => void;
  incomeCategoryAnalyticsError: unknown;
  expenseMonth: number;
  expenseYear: number;
  setExpenseMonth: (month: number) => void;
  setExpenseYear: (year: number) => void;
  incomeMonth: number;
  incomeYear: number;
  setIncomeMonth: (month: number) => void;
  setIncomeYear: (year: number) => void;
}

const CategoriesContext = createContext<CategoriesContextType | null>(null);

export default CategoriesContext;
