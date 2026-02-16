"use client";
import balanceContext from "@/app/context/BalanceContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

const BalanceProvider = ({ children }: Props) => {
  const [balance, setBalance] = React.useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [incomeId, setIncomeId] = useState<string>("");
  const [debounceSearch , setDebounceSearch] = useState("")
  const { data: session } = useSession();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchBalanceData = async () => {
    try {
      const params: any = {
        page,
        limit: 10,
        search:debounceSearch,
      };

      console.log(startDate, endDate);

      if (startDate) params.from = startDate;
      if (endDate) params.to = endDate;

      const res = await axios.get(
        `http://localhost:9000/api/balance/get-income-data/${session?.user?.email}`,
        {
          params,
          withCredentials: true,
        },
      );

      return res.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch balance data.");
    }
  };

  const fetchIncomeDataById = async (incomeId: string) => {
    try {
      const res = await axios.get(
        `http://localhost:9000/api/balance/get-income-by-id/${incomeId}`,
        {
          withCredentials: true,
        },
      );
      console.log(res, "income prov");
      return res.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch income data.");
    }
  };

  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    error: balanceDataError,
    refetch: refetchBalanceData,
  } = useQuery({
    queryKey: [
      "balanceData",
      session?.user?.email,
      page,
      startDate,
      endDate,
      debounceSearch,
    ],
    queryFn: () => fetchBalanceData(),
    enabled: !!session?.user?.email,
  });

  const {
    data: incomeDataById,
    isLoading: isIncomeDataByIdLoading,
    error: incomeDataByIdError,
    refetch: refetchIncomeDataById,
  } = useQuery({
    queryKey: ["incomeDataById", incomeId],
    queryFn: () => fetchIncomeDataById(incomeId),
    enabled: !!incomeId,
  });

  const data = {
    balance,
    setBalance,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    page,
    setPage,
    search,
    setSearch,
    balanceData,
    refetchBalanceData,
    isBalanceLoading,
    incomeId,
    setIncomeId,
    incomeDataById,
    refetchIncomeDataById,
    isIncomeDataByIdLoading,
  };

  return (
    <balanceContext.Provider value={data}>{children}</balanceContext.Provider>
  );
};

export default BalanceProvider;
