"use client";
import React, { useState } from "react";
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

export default function CategoryAnalytics() {
  const [selectedCategory, setSelectedCategory] = useState("groceries");
  const [selectedMonth, setSelectedMonth] = useState("2026-02");

  // Categories with icons
  const categories = [
    {
      id: "groceries",
      name: "Groceries",
      icon: ShoppingCart,
      color: "#10b981",
    },
    { id: "dining", name: "Dining", icon: Utensils, color: "#f59e0b" },
    { id: "transport", name: "Transport", icon: Car, color: "#3b82f6" },
    { id: "utilities", name: "Utilities", icon: Home, color: "#8b5cf6" },
    { id: "healthcare", name: "Healthcare", icon: Heart, color: "#ef4444" },
    {
      id: "entertainment",
      name: "Entertainment",
      icon: Film,
      color: "#ec4899",
    },
    { id: "shopping", name: "Shopping", icon: CreditCard, color: "#06b6d4" },
  ];

  // Mock data - replace with actual data
  const categoryData = {
    groceries: {
      currentMonthSpend: 850.5,
      lastMonthSpend: 920.3,
      pieData: [
        { name: "Groceries", value: 850.5, color: "#10b981" },
        { name: "Others", value: 2430.0, color: "#FCFAF1" },
      ],
    },
    dining: {
      currentMonthSpend: 420.75,
      lastMonthSpend: 385.6,
      pieData: [
        { name: "Dining", value: 420.75, color: "#f59e0b" },
        { name: "Others", value: 2859.75, color: "#374151" },
      ],
    },
    transport: {
      currentMonthSpend: 380.0,
      lastMonthSpend: 410.5,
      pieData: [
        { name: "Transport", value: 380.0, color: "#3b82f6" },
        { name: "Others", value: 2900.5, color: "#374151" },
      ],
    },
    utilities: {
      currentMonthSpend: 520.25,
      lastMonthSpend: 515.0,
      pieData: [
        { name: "Utilities", value: 520.25, color: "#8b5cf6" },
        { name: "Others", value: 2760.25, color: "#374151" },
      ],
    },
    healthcare: {
      currentMonthSpend: 265.0,
      lastMonthSpend: 180.0,
      pieData: [
        { name: "Healthcare", value: 265.0, color: "#ef4444" },
        { name: "Others", value: 3015.5, color: "#374151" },
      ],
    },
    entertainment: {
      currentMonthSpend: 345.8,
      lastMonthSpend: 290.5,
      pieData: [
        { name: "Entertainment", value: 345.8, color: "#ec4899" },
        { name: "Others", value: 2934.7, color: "#374151" },
      ],
    },
    shopping: {
      currentMonthSpend: 498.2,
      lastMonthSpend: 625.4,
      pieData: [
        { name: "Shopping", value: 498.2, color: "#06b6d4" },
        { name: "Others", value: 2782.3, color: "#374151" },
      ],
    },
  };

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);
  const data = categoryData[selectedCategory];
  const percentageChange = (
    ((data.currentMonthSpend - data.lastMonthSpend) / data.lastMonthSpend) *
    100
  ).toFixed(1);
  const isIncrease = data.currentMonthSpend > data.lastMonthSpend;

  const PIE_COLORS = ["#FCFAF1", "#374151"];

  return (
    <div className="w-full space-y-3 mt-8">
      {/* Category Tabs */}
      <div className="flex bg-secondary p-4 rounded-xl flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200
                ${
                  isActive
                    ? "bg-primary border border-gray-800 text-secondary shadow-lg scale-105"
                    : "bg-primary/90 text-secondary hover:bg-primary/70 hover:text-primary"
                }
              `}
            >
              <Icon className="w-4 h-4" />
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
              {currentCategory && (
                <>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">
                      {currentCategory.name} Analytics
                    </h3>
                    <p className="text-sm text-primary/80">
                      Spending breakdown
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
                    data={data.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.pieData.map((entry: any, index: number) => (
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
                  {currentCategory?.name}
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
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200"
                />
              </div>
            </div>

            {/* Current Month Spend */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5 border border-gray-700">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                Current Month Spend
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">
                  ${data.currentMonthSpend.toFixed(0)}
                </span>
                <span className="text-xl font-semibold text-gray-500">
                  .{(data.currentMonthSpend % 1).toFixed(2).split(".")[1]}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(selectedMonth + "-01").toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Last Month Comparison */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5 border border-gray-700">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                Last Month Spend
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-gray-300">
                  ${data.lastMonthSpend.toFixed(2)}
                </span>
              </div>

              {/* Change Indicator */}
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  isIncrease
                    ? "bg-red-500 bg-opacity-10"
                    : "bg-green-500 bg-opacity-10"
                }`}
              >
                <TrendingDown
                  className={`w-4 h-4 ${
                    isIncrease ? "text-primary rotate-180" : "text-primary"
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
                  <span className="text-sm font-bold text-white">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Average per Transaction
                  </span>
                  <span className="text-sm font-bold text-white">
                    ${(data.currentMonthSpend / 23).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    % of Total Expenses
                  </span>
                  <span className="text-sm font-bold text-white">
                    {((data.currentMonthSpend / 3280.5) * 100).toFixed(1)}%
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
