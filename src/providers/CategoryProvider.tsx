"use client";
import CategoriesContext from "@/app/context/CategoriesContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuth } from "./FirebaseAuthProvider";
import React, { useState } from "react";

interface CategoryProviderProps {
  children: React.ReactNode;
}

const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const { firebaseUser } = useAuth();
  const [expenseMonth, setExpenseMonth] = useState<number>();
  const [expenseYear, setExpenseYear] = useState<number>();
  const [incomeMonth, setIncomeMonth] = useState<number>();
  const [incomeYear, setIncomeYear] = useState<number>();
  const [category, setCategory] = useState<string>();
  const [expenseCategory, setExpenseCategory] = useState<string>();
  const [incomeCategory, setIncomeCategory] = useState<string>();

  const fetchIncomeCategories = async () => {
    if (!firebaseUser?.email) return [];
    const res = await api.get(`api/categories/income/${firebaseUser.email}`, {
      withCredentials: true,
    });
    return res.data.data;
  };

  const fetchExpenseCategories = async () => {
    if (!firebaseUser?.email) return [];
    const res = await api.get(`api/categories/expense/${firebaseUser.email}`, {
      withCredentials: true,
    });
    return res.data.data;
  };

  const fetchCategoryAnalytics = async (
    category: string,
    month: number,
    year: number,
  ) => {
    if (!firebaseUser?.email) return [];
    const res = await api.get(
      `api/categories/analytics/${firebaseUser.email}?category=${category}&month=${month}&year=${year}`,
      { withCredentials: true },
    );
    return res.data;
  };

  const fetchExpenseCategoryAnalytics = async (
    category: string,
    month: number,
    year: number,
  ) => {
    if (!firebaseUser?.email) return [];
    const res = await api.get(
      `api/categories/analytics/${firebaseUser.email}?category=${expenseCategory}&month=${expenseMonth}&year=${expenseYear}`,
      { withCredentials: true },
    );
    console.log(res);
    return res.data;
  };

  const fetchIncomeCategoryAnalytics = async (
    category: string,
    month: number,
    year: number,
  ) => {
    if (!firebaseUser?.email) return [];
    const res = await api.get(
      `api/categories/analytics/${firebaseUser.email}?category=${incomeCategory}&month=${incomeMonth}&year=${incomeYear}`,
      { withCredentials: true },
    );
    return res.data;
  };

  const {
    data: incomeCategories,
    isLoading: incomeCategoriesLoading,
    refetch: refetchIncomeCategories,
    error: incomeCategoriesError,
  } = useQuery({
    queryKey: ["incomeCategories", firebaseUser?.email],
    queryFn: fetchIncomeCategories,
    enabled: !!firebaseUser?.email,
  });

  const {
    data: expenseCategories,
    isLoading: expenseCategoriesLoading,
    refetch: refetchExpenseCategories,
    error: expenseCategoriesError,
  } = useQuery({
    queryKey: ["expenseCategories", firebaseUser?.email],
    queryFn: fetchExpenseCategories,
    enabled: !!firebaseUser?.email,
  });

  const {
    data: expenseCategoryAnalytics,
    isLoading: expenseCategoryAnalyticsLoading,
    refetch: refetchExpenseCategoryAnalytics,
    error: expenseCategoryAnalyticsError,
  } = useQuery({
    queryKey: [
      "expenseCategoryAnalytics",
      firebaseUser?.email,
      expenseMonth,
      expenseYear,
      expenseCategory,
    ],
    queryFn: () =>
      fetchExpenseCategoryAnalytics(
        expenseCategory!,
        expenseMonth!,
        expenseYear!,
      ),
    enabled:
      !!firebaseUser?.email &&
      !!expenseMonth &&
      !!expenseYear &&
      !!expenseCategory,
  });

  const {
    data: incomeCategoryAnalytics,
    isLoading: incomeCategoryAnalyticsLoading,
    refetch: refetchIncomeCategoryAnalytics,
    error: incomeCategoryAnalyticsError,
  } = useQuery({
    queryKey: [
      "incomeCategoryAnalytics",
      firebaseUser?.email,
      incomeMonth,
      incomeYear,
      incomeCategory,
    ],
    queryFn: () =>
      fetchIncomeCategoryAnalytics(incomeCategory!, incomeMonth!, incomeYear!),
    enabled:
      !!firebaseUser?.email &&
      !!incomeMonth &&
      !!incomeYear &&
      !!incomeCategory,
  });

  const data = {
    setCategory,
    category,
    setExpenseMonth,
    setExpenseYear,
    setIncomeMonth,
    setIncomeYear,
    expenseMonth,
    expenseYear,
    incomeMonth,
    incomeYear,
    incomeCategories,
    expenseCategories,
    refetchExpenseCategories,
    refetchIncomeCategories,
    incomeCategoriesLoading,
    expenseCategoriesLoading,
    incomeCategoriesError,
    expenseCategoriesError,
    expenseCategory,
    setExpenseCategory,
    incomeCategory,
    setIncomeCategory,
    expenseCategoryAnalytics,
    expenseCategoryAnalyticsLoading,
    refetchExpenseCategoryAnalytics,
    expenseCategoryAnalyticsError,
    incomeCategoryAnalytics,
    incomeCategoryAnalyticsLoading,
    refetchIncomeCategoryAnalytics,
    incomeCategoryAnalyticsError,
  };
  return (
    <CategoriesContext.Provider value={data}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoryProvider;
