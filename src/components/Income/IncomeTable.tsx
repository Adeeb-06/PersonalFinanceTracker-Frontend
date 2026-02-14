"use client";
import React, { use, useContext, useEffect, useState } from "react";
import {
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Cross,
  XIcon,
  Edit2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { BalanceTableSkeleton } from "../Skeletons/BalanceTableSkeleton";
import { NoTransactions } from "../Skeletons/NoTransaction";
import balanceContext from "@/app/context/BalanceContext";
import DeleteConfirmationModal from "../Modals/ConfirmDelete";

interface Pagination {
  currentPage: string | number;
  totalPages: number;
  pageSize: number;
}

interface Transaction {
  _id: string;
  date: string;
  time: string;
  amount: number;
  category: string;
  description: string;
}

export default function IncomeTable() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState<string>("");
  const { data: session, status } = useSession();

  const {
    balanceData,
    setStartDate,
    setEndDate,
    refetchBalanceData,
    isBalanceLoading,
    page,
    startDate,
    endDate,
    setPage,
  } = useContext(balanceContext)!;

  const pagination = balanceData?.pagination || null;

  console.log(balanceData);

  const transactions = balanceData?.data ?? [];

  const showSkeleton =
    isBalanceLoading ||
    status === "loading" ||
    (status === "authenticated" && !balanceData);

  const handleDateFilter = () => {
    refetchBalanceData();
  };

  const handleView = (id: number) => {
    console.log("View transaction:", id);
    setOpenDropdown(null);
  };

  const handleEdit = (id: number) => {
    console.log("Edit transaction:", id);
    setOpenDropdown(null);
  };

  const handleDelete = (id: number) => {
    console.log("Delete transaction:", id);
    setOpenDropdown(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full mt-5 bg-secondary  border border-gray-800 rounded-2xl overflow-hidden">
      {/* Table Header */}
      <div className="px-6 flex justify-between gap-2 py-4 border-b border-gray-800">
        <div>
          <h2 className="text-xl font-bold text-white">
            Recent Income Transactions
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            View and manage your transactions
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <input
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            className="input"
          />
          <h1 className="text-primary font-bold">To</h1>
          <input
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            className="input"
          />
          <input
            type="button"
            value="Search"
            className="btn btn-primary text-secondary"
            onClick={handleDateFilter}
          />
        </div>
      </div>

      {/* Table Container with Scroll */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-primary/10 ">
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
                Category
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {showSkeleton && <BalanceTableSkeleton rows={10} />}
            {!showSkeleton && transactions.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  <NoTransactions />
                </td>
              </tr>
            )}
            {!showSkeleton &&
              transactions.length > 0 &&
              transactions.map((transaction: Transaction) => (
                <tr
                  key={transaction._id}
                  className="hover:bg-primary/5 hover:bg-opacity-50 transition-colors duration-150"
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
                      <ArrowDownRight className="w-4 h-4 text-green-400" />

                      <span className={`text-sm font-bold text-green-400 `}>
                        +$
                        {transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {transaction.category}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.description}
                      </p>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="relative flex justify-center gap-5">
                      <button
                        onClick={() => {
                          setIsOpen(true);
                          setName(transaction.category);
                          setId(transaction._id);
                        }}
                        className="btn btn-sm btn-error"
                      >
                        <XIcon size={15} />
                      </button>
                      <button className="btn btn-sm btn-success">
                        <Edit2 size={15} />
                      </button>
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
          Showing{" "}
          <span className="font-semibold text-white">
            {balanceData?.data.length}
          </span>{" "}
          transactions
        </p>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            Previous
          </button>

          {[...Array(pagination?.totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg transition-all ${
                pagination?.currentPage === i + 1
                  ? "bg-gray-500 text-white"
                  : "bg-gray-700 text-white hover:bg-gray-500"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === pagination?.totalPages}
            onClick={() =>
              setPage((p) => Math.min(pagination?.totalPages ?? p, p + 1))
            }
            className="px-4 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
      {isOpen && (
        <DeleteConfirmationModal
          setIsOpen={setIsOpen}
          name={name}
          id={id}
          isOpen={isOpen}
          itemType="income"
        />
      )}
    </div>
  );
}
