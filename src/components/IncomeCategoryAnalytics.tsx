"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  TrendingDown,
  Calendar,
  ShoppingCart,
  Utensils,
  Car,
  Home,
  Heart,
  Film,
  CreditCard,
} from "lucide-react";
import CategoriesContext from "@/app/context/CategoriesContext";

export default function IncomeCategoryAnalytics() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    incomeCategoryAnalytics,
    incomeCategoryAnalyticsLoading,
    refetchIncomeCategoryAnalytics,
    incomeCategoryAnalyticsError,
    setIncomeCategory,
    setMonth,
    setYear,
    incomeCategories,
  } = useContext(CategoriesContext)!;

  // Use expense categories for spending breakdown
  const categoriesToDisplay = incomeCategories || [];

  // Auto-select first category if none selected
  useEffect(() => {
    if (!selectedCategory && categoriesToDisplay.length > 0) {
      setSelectedCategory(categoriesToDisplay[0].name);
    }
  }, [categoriesToDisplay, selectedCategory]);

  // Sync state with context
  useEffect(() => {
    if (selectedCategory) {
      console.log(selectedCategory)
      setIncomeCategory(selectedCategory);
    }
  }, [selectedCategory, setIncomeCategory]);

  useEffect(() => {
    const m = selectedDate.getMonth() + 1; // 1-based month
    const y = selectedDate.getFullYear();
    setMonth(m);
    setYear(y);
  }, [selectedDate, setMonth, setYear]);

  const currentCategory = categoriesToDisplay?.find(
    (cat) => cat.name === selectedCategory,
  );
  const data = incomeCategoryAnalytics?.data;

  // Safety checks for data
  const totalAmount = data?.totalAmount || 0;
  const lastMonthAmount = data?.lastMonthAmount || 0;

  const percentageChange =
    lastMonthAmount !== 0
      ? (((totalAmount - lastMonthAmount) / lastMonthAmount) * 100).toFixed(1)
      : "0.0";

  const isIncrease = totalAmount > lastMonthAmount;

  const PIE_COLORS = ["#FCFAF1", "#374151"];

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const [y, m] = e.target.value.split("-");
      // Create date at start of month to avoid overflow issues (e.g. Feb 30)
      const newDate = new Date(parseInt(y), parseInt(m) - 1, 1);
      setSelectedDate(newDate);
    }
  };

  // Format date for input value (YYYY-MM)
  const monthInputValue = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1,
  ).padStart(2, "0")}`;

  return (
    <div className="w-full space-y-3">
      {/* Category Tabs */}
      <div className="flex bg-secondary p-4 rounded-xl flex-wrap gap-2">
        {categoriesToDisplay?.map((category) => {
          const isActive = selectedCategory === category.name;

          return (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category.name)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200
                ${
                  isActive
                    ? "bg-primary border border-gray-800 text-secondary shadow-lg scale-105"
                    : "bg-primary/90 text-secondary hover:bg-primary/70 hover:text-primary"
                }
              `}
            >
              <span className="text-sm">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Analytics Card */}
      <div className="bg-secondary border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Left Side - Pie Chart */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              {selectedCategory && (
                <>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">
                      {selectedCategory} Analytics
                    </h3>
                    <p className="text-sm text-primary/80">
                      Income breakdown
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Pie Chart */}
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data?.pieData || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data?.pieData?.map((entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FCFAF1",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value: number) => `$${value.toFixed(2)}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary"></div>
                <span className="text-sm text-gray-400">
                  {currentCategory?.name || "Category"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-700"></div>
                <span className="text-sm text-gray-400">Other Categories</span>
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="flex flex-col gap-6">
            {/* Month Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Select Month
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="month"
                  value={monthInputValue}
                  onChange={handleMonthChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
                />
              </div>
            </div>

            {/* Current Month Spend */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5 border border-gray-700">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                Current Month Income
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">
                  ${totalAmount.toFixed(0)}
                </span>
                <span className="text-xl font-semibold text-gray-500">
                  .{(totalAmount % 1).toFixed(2).split(".")[1]}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Last Month Comparison */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5 border border-gray-700">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                Last Month Income
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-gray-300">
                  ${lastMonthAmount.toFixed(2)}
                </span>
              </div>

              {/* Change Indicator */}
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  isIncrease
                    ? "bg-green-500 bg-opacity-10"
                    : "bg-red-500 bg-opacity-10"
                }`}
              >
                <TrendingDown
                  className={`w-4 h-4 ${
                    isIncrease ? "text-primary  " : "text-primary rotate-180"
                  }`}
                />
                <span
                  className={`text-sm font-semibold ${
                    isIncrease ? "text-primary" : "text-primary"
                  }`}
                >
                  {isIncrease ? "+" : ""}
                  {percentageChange}% vs last month
                </span>
              </div>
            </div>

            {/* Category Details */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5 border border-gray-700">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                Category Details
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Total Transactions
                  </span>
                  <span className="text-sm font-bold text-white">
                    {data?.totalTransactions || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Average per Transaction
                  </span>
                  <span className="text-sm font-bold text-white">
                    $
                    {(
                      (data?.totalAmount || 0) / (data?.totalTransactions || 1)
                    ).toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    % of Total Expenses
                  </span>
                  <span className="text-sm font-bold text-white">
                     {data?.percentageOfTotal?.toFixed(2) || 0}%
                  </span>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
