import React from "react";
import { Link } from "react-router";
import { formatCurrency } from "../utils/formatCurrency";
import { maskAccountNumber } from "../utils/maskAccountNumber";

export default function Accounts() {
  // Sample account data
  const accounts = [
    {
      id: "1",
      name: "Checking Account",
      balance: 2547.83,
      accountNumber: "1234567890123456",
    },
    {
      id: "2",
      name: "Savings Account",
      balance: 15240.92,
      accountNumber: "9876543210987654",
    },
    {
      id: "3",
      name: "Credit Card",
      balance: -847.23,
      accountNumber: "4567890123456789",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-900">Your Accounts</h1>

      <div className="grid gap-4">
        {accounts.map((account) => (
          <Link
            key={account.id}
            to={`/accounts/${account.id}`}
            className="block p-6 bg-white rounded-lg border border-neutral-200 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-neutral-900">
                  {account.name}
                </h3>
                <p className="text-sm text-neutral-500">
                  Account: {maskAccountNumber(account.accountNumber)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-neutral-900">
                  {formatCurrency(account.balance)}
                </p>
                <p className="text-sm text-neutral-500">Available Balance</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
