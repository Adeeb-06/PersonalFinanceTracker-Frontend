import React from "react";
import BalanceCard from "@/components/Income/BalanceCard";
import ExpenseCard from "@/components/Expense/ExpenseCard";
import IncomeCategoryAnalytics from "@/components/Income/IncomeCategoryAnalytics";
import ExpenseCategoryAnalytics from "@/components/Expense/ExpenseCategoryAnalytics";
import IncomeTable from "@/components/Income/IncomeTable";
import ExpenseTable from "@/components/Expense/ExpenseTable";
import DashboardOverviewCard from "@/components/DashboardCard";
import WelcomeCard from "@/components/WelcomeCard";
import IncomeExpenseChart from "@/components/IncomeExpenseChart";

const DashboardPage = () => {
  return (
    <div className="space-y-8 pb-10">
  

      {/* Summary Cards */}
      <WelcomeCard/>
      <div className="">
       <DashboardOverviewCard/>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-secondary px-2">
            Income Analysis
          </h2>
          <IncomeCategoryAnalytics />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-secondary px-2">
            Expense Analysis
          </h2>
          <ExpenseCategoryAnalytics />
        </div>
      </div>

      {/* Transactions */}
      <div className="">
       <IncomeExpenseChart/>
      </div>
    </div>
  );
};

export default DashboardPage;
