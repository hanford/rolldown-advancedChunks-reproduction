import React from "react";
import { useParams } from "react-router";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
import { maskAccountNumber } from "../utils/maskAccountNumber";
import { getAmountColor } from "../utils/getAmountColor";
import { getTransactionCategory } from "../utils/getTransactionCategory";

export default function AccountDetails() {
  const { accountId } = useParams<{ accountId: string }>();

  if (!accountId) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">Account not found</p>
      </div>
    );
  }

  // Sample account data
  const account = {
    id: accountId,
    name: "Primary Checking Account",
    balance: 2547.83,
    accountNumber: "1234567890123456",
    routingNumber: "021000021",
    type: "Checking",
  };

  // Sample transactions for this account
  const transactions = [
    {
      id: "1",
      description: "Coffee Shop Downtown",
      amount: -4.5,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      type: "purchase",
    },
    {
      id: "2",
      description: "Direct Deposit - Salary",
      amount: 2800.0,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      type: "deposit",
    },
    {
      id: "3",
      description: "Grocery Store",
      amount: -67.89,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      type: "purchase",
    },
    {
      id: "4",
      description: "Online Transfer",
      amount: -200.0,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      type: "transfer",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h1 className="text-2xl font-semibold text-neutral-900">
          {account.name}
        </h1>
        <p className="text-neutral-500">
          Account: {maskAccountNumber(account.accountNumber)}
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-neutral-600">
              Available Balance
            </label>
            <p className="text-2xl font-semibold text-neutral-900 mt-1">
              {formatCurrency(account.balance)}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-600">
              Account Type
            </label>
            <p className="text-lg text-neutral-900 mt-1">{account.type}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-600">
              Routing Number
            </label>
            <p className="text-lg text-neutral-900 mt-1">
              {account.routingNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">
            Recent Transactions
          </h2>
        </div>
        <div className="divide-y divide-neutral-200">
          {transactions.map((transaction) => {
            const category = getTransactionCategory(
              transaction.type,
              transaction.description
            );
            return (
              <div
                key={transaction.id}
                className="p-6 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center mr-4 text-lg">
                    {category.icon}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {formatDate(transaction.date, "long")} • {category.label}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${getAmountColor(
                      transaction.amount
                    )}`}
                  >
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {formatDate(transaction.date, "relative")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
