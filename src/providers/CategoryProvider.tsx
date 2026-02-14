"use client";
import CategoriesContext from "@/app/context/CategoriesContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface CategoryProviderProps {
  children: React.ReactNode;
}

const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const { data: session } = useSession();
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();
  const [category, setCategory] = useState<string>();
  const [expenseCategory , setExpenseCategory] = useState<string>();
  const [incomeCategory , setIncomeCategory] = useState<string>();

  const fetchIncomeCategories = async () => {
    if (!session?.user?.email) return [];
    const res = await axios.get(
      `http://localhost:9000/api/categories/income/${session.user.email}`,
      {
        withCredentials: true,
      },
    );
    return res.data.data;
  };

  const fetchExpenseCategories = async () => {
    if (!session?.user?.email) return [];
    const res = await axios.get(
      `http://localhost:9000/api/categories/expense/${session.user.email}`,
      {
        withCredentials: true,
      },
    );
    return res.data.data;
  };

  const fetchCategoryAnalytics = async (
    category: string,
    month: number,
    year: number,
  ) => {
    if (!session?.user?.email) return [];
    const res = await axios.get(
      `http://localhost:9000/api/categories/analytics/${session.user.email}?category=${category}&month=${month}&year=${year}`,
      {
        withCredentials: true,
      },
    );
    return res.data;
  };

  const fetchExpenseCategoryAnalytics = async (
    category: string,
    month: number,
    year: number,
  ) => {
    if (!session?.user?.email) return [];
    const res = await axios.get(
      `http://localhost:9000/api/categories/analytics/${session.user.email}?category=${expenseCategory}&month=${month}&year=${year}`,
      {
        withCredentials: true,
      },
    );
    console.log(res)
    return res.data;
  };

  const fetchIncomeCategoryAnalytics = async (
    category: string,
    month: number,
    year: number,
  ) => {
    if (!session?.user?.email) return [];
    const res = await axios.get(
      `http://localhost:9000/api/categories/analytics/${session.user.email}?category=${incomeCategory}&month=${month}&year=${year}`,
      {
        withCredentials: true,
      },
    );
    return res.data;
  };

  const {
    data: incomeCategories,
    isLoading: incomeCategoriesLoading,
    refetch: refetchIncomeCategories,
    error: incomeCategoriesError,
  } = useQuery({
    queryKey: ["incomeCategories", session?.user?.email],
    queryFn: fetchIncomeCategories,
    enabled: !!session?.user?.email,
  });

  const {
    data: expenseCategories,
    isLoading: expenseCategoriesLoading,
    refetch: refetchExpenseCategories,
    error: expenseCategoriesError,
  } = useQuery({
    queryKey: ["expenseCategories", session?.user?.email],
    queryFn: fetchExpenseCategories,
    enabled: !!session?.user?.email,
  });

  const {
    data: categoryAnalytics,
    isLoading: categoryAnalyticsLoading,
    refetch: refetchCategoryAnalytics,
    error: categoryAnalyticsError,
  } = useQuery({
    queryKey: [
      "categoryAnalytics",
      session?.user?.email,
      month,
      year,
      category,
    ],
    queryFn: () => fetchCategoryAnalytics(category!, month!, year!),
    enabled: !!session?.user?.email && !!month && !!year && !!category,
  });


  const {
    data: expenseCategoryAnalytics,
    isLoading: expenseCategoryAnalyticsLoading,
    refetch: refetchExpenseCategoryAnalytics,
    error: expenseCategoryAnalyticsError,
  } = useQuery({
    queryKey: [
      "expenseCategoryAnalytics",
      session?.user?.email,
      month,
      year,
      expenseCategory,
    ],
    queryFn: () => fetchExpenseCategoryAnalytics(expenseCategory!, month!, year!),
    enabled: !!session?.user?.email && !!month && !!year && !!expenseCategory,
  });

  const {
    data: incomeCategoryAnalytics,
    isLoading: incomeCategoryAnalyticsLoading,
    refetch: refetchIncomeCategoryAnalytics,
    error: incomeCategoryAnalyticsError,
  } = useQuery({
    queryKey: [
      "incomeCategoryAnalytics",
      session?.user?.email,
      month,
      year,
      incomeCategory,
    ],
    queryFn: () => fetchIncomeCategoryAnalytics(incomeCategory!, month!, year!),
    enabled: !!session?.user?.email && !!month && !!year && !!incomeCategory,
  });

  const data = {
    setCategory,
    setMonth,
    setYear,
    category,
    month,
    year,
    categoryAnalytics,
    categoryAnalyticsLoading,
    refetchCategoryAnalytics,
    categoryAnalyticsError,
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
