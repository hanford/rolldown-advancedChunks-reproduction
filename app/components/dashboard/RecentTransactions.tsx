import React from "react";
import { useBanking } from "../../contexts/BankingContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { getAmountColor } from "../../utils/getAmountColor";
import { getTransactionCategory } from "../../utils/getTransactionCategory";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { TransactionCategory } from "../../lib/types";

export const RecentTransactions: React.FC = () => {
  const { transactions } = useBanking();

  // Sample transactions if banking context doesn't have them
  const sampleTransactions = [
    {
      id: "1",
      description: "Whole Foods Market",
      amount: -87.34,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      type: "purchase",
      category: TransactionCategory.FOOD,
      merchant: "Whole Foods",
    },
    {
      id: "2",
      description: "Salary Deposit",
      amount: 3200.0,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      type: "deposit",
      category: TransactionCategory.INCOME,
      merchant: "Company Inc",
    },
    {
      id: "3",
      description: "Shell Gas Station",
      amount: -45.67,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      type: "purchase",
      category: TransactionCategory.TRANSPORTATION,
      merchant: "Shell",
    },
    {
      id: "4",
      description: "Electric Bill",
      amount: -123.45,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      type: "payment",
      category: TransactionCategory.UTILITIES,
      merchant: "Electric Company",
    },
    {
      id: "5",
      description: "Transfer to Savings",
      amount: -500.0,
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      type: "transfer",
      category: TransactionCategory.PERSONAL,
      merchant: "Internal Transfer",
    },
  ];

  // Use sample transactions if none exist
  const recentTransactions =
    transactions && transactions.length > 0
      ? [...transactions]
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 5)
      : sampleTransactions;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Link
          to="/accounts"
          className="text-sm font-medium text-primary-500 hover:text-primary-600 inline-flex items-center"
        >
          View All
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => {
            const category = getTransactionCategory(
              transaction.type,
              transaction.description
            );
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center">
                  <div
                    className={`h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center mr-3 text-lg`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {formatDate(transaction.date, "relative")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${getAmountColor(
                      transaction.amount
                    )}`}
                  >
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className={`text-xs ${category.color}`}>
                    {category.label}
                  </p>
                </div>
              </div>
            );
          })}

          {recentTransactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-neutral-500 text-sm">No recent transactions</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
