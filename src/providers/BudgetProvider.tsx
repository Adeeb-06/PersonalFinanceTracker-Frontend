"use client"
import React from 'react'
import budgetContext from '@/app/context/BudgetContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'




interface Props {
  children: React.ReactNode;
}

const BudgetProvider = ({children}:Props) => {
    const [page, setPage] = React.useState<number>(1);
    const [limit, setLimit] = React.useState<number>(6);

    const fetchBudgetData = async () => {
        try {
            const params: any = {
                page,
                limit: 6,
            };

            const res = await axios.get(
                `http://localhost:9000/api/budget/get-budget/${session?.user?.email}`,
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
    const {data: session} = useSession()


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

    const data = {
        budgetData,
        refetchBudgetData,
        isBudgetLoading,
    }
  return (
  <budgetContext.Provider value={data}>
      {children}
  </budgetContext.Provider>
  )
}

export default BudgetProvider