import { QueryObserverResult } from "@tanstack/react-query";
import React,{ createContext , ReactNode, Dispatch, SetStateAction} from "react";

interface BalanceItem {
   _id: string | number;
  date: string;
  time: string;
  amount: number;
  category: string;
  description: string;
}

interface BalanceResponse {
  data: BalanceItem[];
  pagination: {
    currentPage:number;
    page: number;
    totalPages: number;
  };
}


interface BalanceContextType {
  balance: number;
  setBalance: Dispatch<SetStateAction<number>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  balanceData?: BalanceResponse;
  refetchBalanceData: () => Promise<QueryObserverResult<BalanceItem[], Error>>;
  isBalanceLoading: boolean;


}

// Context initialized as null; real value comes from Provider
const balanceContext = createContext<BalanceContextType | null>(null);

export default balanceContext;
