"use client";
import React from "react";
import budgetContext from "@/app/context/BudgetContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

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
        `api/budget/get-budget/${session?.user?.email}`,
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
    queryKey: ["budgetData", session?.user?.email, page],
    queryFn: () => fetchBudgetData(),
    enabled: !!session?.user?.email,
  });

  const {
    data: budgetByMonthData,
    isLoading: isBudgetByMonthLoading,
    error: budgetByMonthDataError,
    refetch: refetchBudgetByMonthData,
  } = useQuery<BudgetByMonth>({
    queryKey: ["budgetByMonthData", session?.user?.email, month],
    queryFn: () => getBudgetByMonth(session?.user?.email!, month),
    enabled: !!session?.user?.email && !!month,
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
