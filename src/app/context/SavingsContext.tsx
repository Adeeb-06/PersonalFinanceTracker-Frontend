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
  savingsDataByID: any;
  refetchSavingsDataByID: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<any, Error>>;
  isSavingsLoadingByID: boolean;
  isSavingsErrorByID: Error|null;
  setSavingsId: (id: string) => void;
}

const savingsContext = createContext<SavingsContext | null>(null);

export default savingsContext;
