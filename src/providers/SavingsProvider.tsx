"use client";
import React, { useState } from "react";
import savingsContext from "@/app/context/SavingsContext";
import { useSession } from "next-auth/react";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const SavingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [savingsId, setSavingsId] = useState<string>("");

  const fetchSavings = async () => {
    try {
      const res = await api.get(`api/savings/get/${session?.user?.email}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  const fetchSavingsByID = async () => {
    try {
      const res = await api.get(
        `/api/savings/get/${savingsId}/${session?.user?.email}`,
        {
          withCredentials: true,
        },
      );
      console.log(res);
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

  const {
    data: savingsDataByID,
    refetch: refetchSavingsDataByID,
    isLoading: isSavingsLoadingByID,
    error: isSavingsErrorByID,
  } = useQuery({
    queryKey: ["savingsDataByID", savingsId],
    queryFn: () => fetchSavingsByID(),
    enabled: !!savingsId,
  });

  const data = {
    savingsData,
    refetchSavingsData,
    isSavingsLoading,
    isSavingsError,
    savingsDataByID,
    refetchSavingsDataByID,
    isSavingsLoadingByID,
    isSavingsErrorByID,
    setSavingsId,
  };
  return (
    <savingsContext.Provider value={data}>{children}</savingsContext.Provider>
  );
};

export default SavingsProvider;
