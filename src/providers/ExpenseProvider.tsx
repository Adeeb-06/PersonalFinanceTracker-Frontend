"use client";
import React, { useState } from "react";
import expenseContext from "@/app/context/ExpenseContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuth } from "./FirebaseAuthProvider";

interface Props {
  children: React.ReactNode;
}

const ExpenseProvider = ({ children }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [monthExpense, setMonthExpense] = useState<number>();
  const [year, setYear] = useState<number>();
  const [expenseId, setExpenseId] = useState<string>();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [debounceSearch, setDebounceSearch] = useState<string>("");

  const { firebaseUser } = useAuth();

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchExpenseData = async () => {
    try {
      const params: any = {
        page,
        limit,
        search: debounceSearch,
      };

      if (startDate) params.from = startDate;
      if (endDate) params.to = endDate;

      const res = await api.get(
        `/api/expense/get-expense/${firebaseUser?.email}`,
        {
          params,
          withCredentials: true,
        },
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return { data: [] };
      throw error;
    }
  };

  const fetchTotalExpenseByMonth = async () => {
    if (!monthExpense || !year) return { total: 0 };
    try {
      const res = await api.get(
        `/api/expense/get-total-expense-by-month/${firebaseUser?.email}?month=${monthExpense}&year=${year}`,
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return { total: 0 };
      throw error;
    }
  };

  const {
    data: expenseData,
    isLoading: isExpenseLoading,
    error: expenseDataError,
    refetch: refetchExpenseData,
  } = useQuery({
    queryKey: [
      "expenseData",
      firebaseUser?.email,
      page,
      startDate,
      endDate,
      debounceSearch,
    ],
    queryFn: () => fetchExpenseData(),
    enabled: !!firebaseUser?.email,
  });

  const {
    data: totalExpenseByMonthData,
    isLoading: isTotalExpenseByMonthLoading,
    error: totalExpenseByMonthDataError,
    refetch: refetchTotalExpenseByMonthData,
  } = useQuery({
    queryKey: [
      "totalExpenseByMonthData",
      firebaseUser?.email,
      monthExpense,
      year,
    ],
    queryFn: () => fetchTotalExpenseByMonth(),
    enabled: !!firebaseUser?.email && !!monthExpense && !!year,
  });

  const fetchExpenseById = async (id: string) => {
    try {
      const res = await api.get(`/api/expense/get-expense-by-id/${expenseId}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: expenseDataById,
    isLoading: isExpenseDataByIdLoading,
    error: expenseDataByIdError,
    refetch: refetchExpenseDataById,
  } = useQuery({
    queryKey: ["expenseDataById", firebaseUser?.email],
    queryFn: () => fetchExpenseById(expenseId!),
    enabled: !!firebaseUser?.email && !!expenseId,
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
    expenseDataById,
    refetchExpenseDataById,
    isExpenseDataByIdLoading,
    expenseDataByIdError,
    setExpenseId,
    expenseId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    search,
    setSearch,
  };
  return (
    <expenseContext.Provider value={data}>{children}</expenseContext.Provider>
  );
};

export default ExpenseProvider;
