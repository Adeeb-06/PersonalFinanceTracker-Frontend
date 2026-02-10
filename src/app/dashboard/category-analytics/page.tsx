import CategoryAnalytics from "@/components/CategoryAnalytics";
import React from "react";

export default function AnalyticsPage() {
  return (
    <div className="w-full h-full p-2">
      <h1 className="text-3xl font-bold mb-3 text-secondary">
        Category Analytics
      </h1>
      <CategoryAnalytics />
    </div>
  );
}
