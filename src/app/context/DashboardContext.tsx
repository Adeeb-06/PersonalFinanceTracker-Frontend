"use client"
import React,{ createContext } from "react";

interface DashboardReport {
    balance: number;
    totalIncome: number;
    totalExpense: number;
    totalTransaction: number;
    topExpenseCategory: {
        category: string;
        amount: number;
    };
    surplusPercentage: number;
    budgetStatus: {
        status: boolean;
    };
    incomeExpenseChart: {
        month: string;
        income: number;
        expense: number;
    }[];
    savings: {
        passiveSavings: number;
        savingsRate: number;
    };
}

interface DashboardContextType {
    dashboardReport: DashboardReport;
    dashboardLoading: boolean;
    dashboardIsError: boolean;
    dashboardError: any;
    refetchDashboardData: () => void;
    month: number;
    setMonth: (month: number) => void;
    year: number;
    setYear: (year: number) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export default DashboardContext;