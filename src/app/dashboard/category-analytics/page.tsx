import ExpenseCategoryAnalytics from "@/components/Expense/ExpenseCategoryAnalytics";
import IncomeCategoryAnalytics from "@/components/Income/IncomeCategoryAnalytics";
import React from "react";

export default function AnalyticsPage() {
  return (
    <div>
      <div className="w-full h-full p-2">
        <h1 className="text-3xl font-bold mb-3 text-secondary">
          Income Category Analytics
        </h1>
        <IncomeCategoryAnalytics />
      </div>

      <div className="w-full h-full p-2">
        <h1 className="text-3xl font-bold mb-3 text-secondary">
          Expense Category Analytics
        </h1>
        <ExpenseCategoryAnalytics />
      </div>
    </div>
  );
}
