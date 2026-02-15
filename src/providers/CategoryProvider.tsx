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
  const [expenseMonth, setExpenseMonth] = useState<number>();
  const [expenseYear, setExpenseYear] = useState<number>();
  const [incomeMonth, setIncomeMonth] = useState<number>();
  const [incomeYear, setIncomeYear] = useState<number>();
  const [category, setCategory] = useState<string>();
  const [expenseCategory, setExpenseCategory] = useState<string>();
  const [incomeCategory, setIncomeCategory] = useState<string>();

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
      `http://localhost:9000/api/categories/analytics/${session.user.email}?category=${expenseCategory}&month=${expenseMonth}&year=${expenseYear}`,
      {
        withCredentials: true,
      },
    );
    console.log(res);
    return res.data;
  };

  const fetchIncomeCategoryAnalytics = async (
    category: string,
    month: number,
    year: number,
  ) => {
    if (!session?.user?.email) return [];
    const res = await axios.get(
      `http://localhost:9000/api/categories/analytics/${session.user.email}?category=${incomeCategory}&month=${incomeMonth}&year=${incomeYear}`,
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
    data: expenseCategoryAnalytics,
    isLoading: expenseCategoryAnalyticsLoading,
    refetch: refetchExpenseCategoryAnalytics,
    error: expenseCategoryAnalyticsError,
  } = useQuery({
    queryKey: [
      "expenseCategoryAnalytics",
      session?.user?.email,
      expenseMonth, 
      expenseYear,
      expenseCategory,
    ],
    queryFn: () =>
      fetchExpenseCategoryAnalytics(expenseCategory!, expenseMonth!, expenseYear!),
    enabled: !!session?.user?.email && !!expenseMonth && !!expenseYear && !!expenseCategory,
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
      incomeMonth,
      incomeYear,
      incomeCategory,
    ],
    queryFn: () => fetchIncomeCategoryAnalytics(incomeCategory!, incomeMonth!, incomeYear!),
    enabled: !!session?.user?.email && !!incomeMonth && !!incomeYear && !!incomeCategory,
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
