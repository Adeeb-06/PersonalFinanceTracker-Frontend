"use client"
import React, { useContext, useState } from "react";
import DashboardContext from "../app/context/DashboardContext";
import UserContext from "@/app/context/UserContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useContext(UserContext)!;
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const fetchDashboardData = async () => {
    const response = await axios.get(
      `http://localhost:9000/api/dashboard/report/${userData?.email}?month=${month}&year=${year}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  };

  const {
    data: dashboardReport,
    isLoading: dashboardLoading,
    isError: dashboardIsError,
    error: dashboardError,
    refetch: refetchDashboardData,
  } = useQuery({
    queryKey: ["dashboardReport"],
    queryFn: () => fetchDashboardData(),
    enabled: !!userData?.email && !!month && !!year,
  });



  return (
    <DashboardContext.Provider
      value={{
        dashboardReport,
        dashboardLoading,
        dashboardIsError,
        dashboardError,
        refetchDashboardData,
        month,
        setMonth,
        year,
        setYear,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
