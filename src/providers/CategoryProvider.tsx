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

  const data = {
    incomeCategories,
    expenseCategories,
    refetchExpenseCategories,
    refetchIncomeCategories,
    incomeCategoriesLoading,
    expenseCategoriesLoading,
    incomeCategoriesError,
    expenseCategoriesError,
  };
  return (
    <CategoriesContext.Provider value={data}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoryProvider;
