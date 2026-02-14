import React from "react";
import ExpenseCard from "@/components/Expense/ExpenseCard";
import ExpenseTable from "@/components/Expense/ExpenseTable";
import CategoryAnalytics from "@/components/Income/IncomeCategoryAnalytics";

const ExpensePage = () => {
  return (
    <div>
      <ExpenseCard />
      <ExpenseTable />
    </div>
  );
};

export default ExpensePage;
