"use client"
import { createContext } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface SavingsContext {
  savingsData: any;
  refetchSavingsData: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<any, Error>>;
  isSavingsLoading: boolean;
  isSavingsError: Error|null;
}

const savingsContext = createContext<SavingsContext | null>(null);

export default savingsContext;
