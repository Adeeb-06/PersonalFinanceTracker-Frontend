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
  month: number;
  year: number;
  categoryAnalytics: any;
  categoryAnalyticsLoading: boolean;
  refetchCategoryAnalytics: () => void;
  categoryAnalyticsError: unknown;
  setCategory: (category: string) => void;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
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
}

const CategoriesContext = createContext<CategoriesContextType | null>(null);

export default CategoriesContext;
