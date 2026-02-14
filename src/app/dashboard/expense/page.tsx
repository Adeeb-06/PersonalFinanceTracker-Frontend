import React from "react";
import ExpenseCard from "@/components/ExpenseCard";
import ExpenseTable from "@/components/ExpenseTable";
import CategoryAnalytics from "@/components/IncomeCategoryAnalytics";

const ExpensePage = () => {
  return (
    <div>
      <ExpenseCard />
      <ExpenseTable />
    </div>
  );
};

export default ExpensePage;
