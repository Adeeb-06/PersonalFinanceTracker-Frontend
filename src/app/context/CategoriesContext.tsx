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
}

const CategoriesContext = createContext<CategoriesContextType | null>(null);

export default CategoriesContext;
