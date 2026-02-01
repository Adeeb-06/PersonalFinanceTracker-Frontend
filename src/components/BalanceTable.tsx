"use client"
import React,{ useState } from 'react';
import { MoreVertical, Edit, Trash2, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function BalanceTable() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const transactions = [
    {
      id: 1,
      date: '2026-01-31',
      time: '14:30:25',
      amount: 1250.00,
      type: 'income',
      category: 'Salary',
      description: 'Monthly Salary'
    },
    {
      id: 2,
      date: '2026-01-30',
      time: '09:15:42',
      amount: 85.50,
      type: 'expense',
      category: 'Groceries',
      description: 'Supermarket'
    },
    {
      id: 3,
      date: '2026-01-29',
      time: '18:45:10',
      amount: 45.00,
      type: 'expense',
      category: 'Entertainment',
      description: 'Movie Tickets'
    },
    {
      id: 4,
      date: '2026-01-28',
      time: '11:20:33',
      amount: 500.00,
      type: 'income',
      category: 'Freelance',
      description: 'Project Payment'
    },
    {
      id: 5,
      date: '2026-01-27',
      time: '16:55:18',
      amount: 120.75,
      type: 'expense',
      category: 'Utilities',
      description: 'Electric Bill'
    },
    {
      id: 6,
      date: '2026-01-26',
      time: '13:10:05',
      amount: 65.00,
      type: 'expense',
      category: 'Transportation',
      description: 'Gas Station'
    },
    {
      id: 7,
      date: '2026-01-25',
      time: '10:30:50',
      amount: 200.00,
      type: 'income',
      category: 'Investment',
      description: 'Dividend Payment'
    },
    {
      id: 8,
      date: '2026-01-24',
      time: '15:40:22',
      amount: 35.99,
      type: 'expense',
      category: 'Subscription',
      description: 'Netflix Monthly'
    }
  ];

  const handleView = (id : number) => {
    console.log('View transaction:', id);
    setOpenDropdown(null);
  };

  const handleEdit = (id : number) => {
    console.log('Edit transaction:', id);
    setOpenDropdown(null);
  };

  const handleDelete = (id : number) => {
    console.log('Delete transaction:', id);
    setOpenDropdown(null);
  };

  const formatDate = (dateString : string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full mt-5 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
        <p className="text-sm text-gray-400 mt-1">View and manage your transactions</p>
      </div>

      {/* Table Container with Scroll */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 bg-opacity-50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-800 hover:bg-opacity-50 transition-colors duration-150"
              >
                {/* Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-white">
                    {formatDate(transaction.date)}
                  </span>
                </td>

                {/* Time */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-400 font-mono">
                    {transaction.time}
                  </span>
                </td>

                {/* Amount */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {transaction.type === 'income' ? (
                      <ArrowDownRight className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-red-400" />
                    )}
                    <span
                      className={`text-sm font-bold ${
                        transaction.type === 'income'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}$
                      {transaction.amount.toFixed(2)}
                    </span>
                  </div>
                </td>

                {/* Type */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.type === 'income'
                        ? 'bg-green-500 bg-opacity-10 text-white'
                        : 'bg-red-500 bg-opacity-10 text-white'
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </span>
                </td>

                {/* Category */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-white">{transaction.category}</p>
                    <p className="text-xs text-gray-500">{transaction.description}</p>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="relative inline-block">
                    <button
                        onClick={() => setOpenDropdown(openDropdown === transaction.id ? null : transaction.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdown === transaction.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleView(transaction.id)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-150"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleEdit(transaction.id)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-150"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(transaction.id)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors duration-150"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Showing <span className="font-semibold text-white">{transactions.length}</span> transactions
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            Previous
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}