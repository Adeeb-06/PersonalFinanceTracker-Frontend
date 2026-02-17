import ExpenseCategoryAnalytics from "@/components/Expense/ExpenseCategoryAnalytics";
import IncomeCategoryAnalytics from "@/components/Income/IncomeCategoryAnalytics";
import React from "react";

export default function AnalyticsPage() {
  return (
    <div>
      <div className="">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-secondary px-2">
              Income Analysis
            </h2>
            <IncomeCategoryAnalytics />
          </div>
          <div className="flex flex-col mt-5 gap-4">
            <h2 className="text-2xl font-semibold text-secondary px-2">
              Expense Analysis
            </h2>
            <ExpenseCategoryAnalytics />
          </div>
        </div>
    </div>
  );
}
