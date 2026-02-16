"use client";
import React from "react";
import savingsContext from "@/app/context/SavingsContext";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const SavingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const fetchSavings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9000/api/savings/get/${session?.user?.email}`,
        {
          withCredentials: true,
        },
      );
      return res.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  const {
    data: savingsData,
    refetch: refetchSavingsData,
    isLoading: isSavingsLoading,
    error: isSavingsError,
  } = useQuery({
    queryKey: ["savingsData", session?.user?.email],
    queryFn: () => fetchSavings(),
    enabled: !!session?.user?.email,
  });

  const data = {
    savingsData,
    refetchSavingsData,
    isSavingsLoading,
    isSavingsError,
  };
  return (
    <savingsContext.Provider value={data}>{children}</savingsContext.Provider>
  );
};

export default SavingsProvider;
