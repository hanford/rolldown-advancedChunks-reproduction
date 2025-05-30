import React from "react";
import { SpendingOverview } from "../components/dashboard/SpendingOverview";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
import { getAmountColor } from "../utils/getAmountColor";

export default function Dashboard() {
  // Sample dashboard data
  const totalBalance = 17940.52;
  const monthlyIncome = 5230.0;
  const monthlyExpenses = -2847.63;
  const lastUpdated = new Date();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500">
          Last updated: {formatDate(lastUpdated, "relative")}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500">
            Total Balance
          </h3>
          <p className="text-2xl font-semibold text-neutral-900 mt-2">
            {formatCurrency(totalBalance)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500">
            Monthly Income
          </h3>
          <p
            className={`text-2xl font-semibold mt-2 ${getAmountColor(
              monthlyIncome
            )}`}
          >
            {formatCurrency(monthlyIncome)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500">
            Monthly Expenses
          </h3>
          <p
            className={`text-2xl font-semibold mt-2 ${getAmountColor(
              monthlyExpenses
            )}`}
          >
            {formatCurrency(Math.abs(monthlyExpenses))}
          </p>
        </div>
      </div>

      <SpendingOverview />
      <RecentTransactions />
    </div>
  );
}
