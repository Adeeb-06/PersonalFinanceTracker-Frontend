"use client";
import React, { useState } from "react";
import expenseContext from "@/app/context/ExpenseContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

const ExpenseProvider = ({ children }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [monthExpense, setMonthExpense] = useState<number>()
  const [year , setYear] = useState<number>()

  const { data: session } = useSession();

  const fetchExpenseData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9000/api/expense/get-expense/${session?.user?.email}?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        },
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTotalExpenseByMonth = async () => {
    if (!monthExpense || !year) return { total: 0 };
    try {
      const res = await axios.get(
        `http://localhost:9000/api/expense/get-total-expense-by-month/${session?.user?.email}?month=${monthExpense}&year=${year}`,
        {
          withCredentials: true,
        },
      );
      console.log(res.data)
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: expenseData,
    isLoading: isExpenseLoading,
    error: expenseDataError,
    refetch: refetchExpenseData,
  } = useQuery({
    queryKey: ["expenseData", session?.user?.email, page],
    queryFn: () => fetchExpenseData(),
    enabled: !!session?.user?.email,
  });

  const {
    data: totalExpenseByMonthData,
    isLoading: isTotalExpenseByMonthLoading,
    error: totalExpenseByMonthDataError,
    refetch: refetchTotalExpenseByMonthData,
  } = useQuery({
    queryKey: ["totalExpenseByMonthData", session?.user?.email, monthExpense, year],
    queryFn: () => fetchTotalExpenseByMonth(),
    enabled: !!session?.user?.email,
  });
  

  const data = {
    expenseData,
    refetchExpenseData,
    isExpenseLoading,
    setPage,
    setLimit,
    page,
    setMonthExpense,
    setYear,
    totalExpenseByMonthData,
    refetchTotalExpenseByMonthData,
    isTotalExpenseByMonthLoading,
    
  };
  return (
    <expenseContext.Provider value={data}>{children}</expenseContext.Provider>
  );
};

export default ExpenseProvider;
