"use client"
import DashboardContext from '@/app/context/DashboardContext';
import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function IncomeExpenseChart() {
  // Simple data - each object represents one month (12 months)
  const {dashboardReport} = useContext(DashboardContext)!
  const data =  dashboardReport?.incomeExpenseChart

  return (
    <div className="w-full bg-secondary border border-gray-800 rounded-2xl p-6 shadow-xl">
      {/* Card Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-1">Income vs Expense</h3>
        <p className="text-sm text-gray-400">Monthly comparison for the year</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          {/* Grid lines in background */}
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          
          {/* X-axis (months) */}
          <XAxis 
            dataKey="month" 
            stroke="#9CA3AF"
            style={{ fontSize: '14px' }}
          />
          
          {/* Y-axis (amounts) */}
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '14px' }}
          />
          
          {/* Tooltip (shows on hover) */}
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value) => `${value}`}
          />
          
          {/* Legend (Income/Expense labels) */}
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          
          {/* Income line (green) */}
          <Line 
            type="monotone"
            dataKey="income" 
            stroke="#10B981" 
            strokeWidth={3}
            name="Income"
            dot={{ fill: '#10B981', r: 5 }}
            activeDot={{ r: 7 }}
          />
          
          {/* Expense line (red) */}
          <Line 
            type="monotone"
            dataKey="expense" 
            stroke="#EF4444" 
            strokeWidth={3}
            name="Expense"
            dot={{ fill: '#EF4444', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}