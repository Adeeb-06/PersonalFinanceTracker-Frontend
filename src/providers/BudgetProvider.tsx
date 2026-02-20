"use client";
import React from "react";
import budgetContext from "@/app/context/BudgetContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuth } from "./FirebaseAuthProvider";

interface Props {
  children: React.ReactNode;
}

interface BudgetByMonth {
  _id: string;
  amount: number;
  spent: number;
  remaining: number;
  month: string;
  year: number;
}

const BudgetProvider = ({ children }: Props) => {
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(6);
  const [month, setMonth] = React.useState<string>("");
  const { firebaseUser } = useAuth();

  const getBudgetByMonth = async (userEmail: string, month: string) => {
    try {
      const res = await api.get(
        `api/budget/get-budget-by-month/${userEmail}?month=${month}`,
        { withCredentials: true },
      );

      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBudgetData = async () => {
    try {
      const params: any = {
        page,
        limit: 6,
      };

      const res = await api.get(
        `api/budget/get-budget/${firebaseUser?.email}`,
        {
          params,
          withCredentials: true,
        },
      );

      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: budgetData,
    isLoading: isBudgetLoading,
    error: budgetDataError,
    refetch: refetchBudgetData,
  } = useQuery({
    queryKey: ["budgetData", firebaseUser?.email, page],
    queryFn: () => fetchBudgetData(),
    enabled: !!firebaseUser?.email,
  });

  const {
    data: budgetByMonthData,
    isLoading: isBudgetByMonthLoading,
    error: budgetByMonthDataError,
    refetch: refetchBudgetByMonthData,
  } = useQuery<BudgetByMonth>({
    queryKey: ["budgetByMonthData", firebaseUser?.email, month],
    queryFn: () => getBudgetByMonth(firebaseUser?.email!, month),
    enabled: !!firebaseUser?.email && !!month,
  });

  const data = {
    budgetData,
    refetchBudgetData,
    isBudgetLoading,
    budgetByMonthData,
    refetchBudgetByMonthData,
    isBudgetByMonthLoading,
    month,
    setMonth,
  };

  return (
    <budgetContext.Provider value={data}>{children}</budgetContext.Provider>
  );
};

export default BudgetProvider;
