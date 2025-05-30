import React from "react";
import { useBanking } from "../../contexts/BankingContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { maskAccountNumber } from "../../utils/maskAccountNumber";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import {
  ArrowUpRight,
  Wallet,
  PiggyBank,
  CreditCard,
  LineChart,
} from "lucide-react";
import { Link } from "react-router";
import { AccountType } from "../../lib/types";

export const AccountSummary: React.FC = () => {
  const { accounts } = useBanking();

  // Sample accounts if banking context doesn't have them
  const sampleAccounts = [
    {
      id: "1",
      name: "Primary Checking",
      balance: 2547.83,
      number: "1234567890123456",
      type: AccountType.CHECKING,
    },
    {
      id: "2",
      name: "High Yield Savings",
      balance: 15240.92,
      number: "9876543210987654",
      type: AccountType.SAVINGS,
    },
    {
      id: "3",
      name: "Rewards Credit Card",
      balance: -847.23,
      number: "4567890123456789",
      type: AccountType.CREDIT,
    },
  ];

  // Use sample accounts if none exist
  const displayAccounts =
    accounts && accounts.length > 0 ? accounts : sampleAccounts;

  const getTotalBalance = () => {
    return displayAccounts.reduce((sum, account) => {
      // Don't add credit card balances to total
      if (account.type !== AccountType.CREDIT) {
        return sum + account.balance;
      }
      return sum;
    }, 0);
  };

  const getAccountIcon = (type: AccountType) => {
    switch (type) {
      case AccountType.CHECKING:
        return <Wallet className="h-5 w-5 text-white" />;
      case AccountType.SAVINGS:
        return <PiggyBank className="h-5 w-5 text-white" />;
      case AccountType.CREDIT:
        return <CreditCard className="h-5 w-5 text-white" />;
      case AccountType.INVESTMENT:
        return <LineChart className="h-5 w-5 text-white" />;
    }
  };

  const getAccountColor = (type: AccountType) => {
    switch (type) {
      case AccountType.CHECKING:
        return "from-primary-500 to-primary-600";
      case AccountType.SAVINGS:
        return "from-success-500 to-success-600";
      case AccountType.CREDIT:
        return "from-error-500 to-error-600";
      case AccountType.INVESTMENT:
        return "from-secondary-500 to-secondary-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Account Summary</CardTitle>
            <Link
              to="/accounts"
              className="text-sm font-medium text-primary-500 hover:text-primary-600 inline-flex items-center"
            >
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-neutral-500">
                    Total Balance
                  </p>
                  <div className="flex items-center text-success-500">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span className="text-xs">2.4%</span>
                  </div>
                </div>
                <p className="text-2xl font-semibold mt-2">
                  {formatCurrency(getTotalBalance())}
                </p>
              </div>

              {displayAccounts.map((account) => (
                <Link
                  key={account.id}
                  to={`/accounts/${account.id}`}
                  className="block"
                >
                  <div
                    className={`rounded-lg p-4 bg-gradient-to-r ${getAccountColor(
                      account.type
                    )} hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-md bg-white bg-opacity-20 flex items-center justify-center">
                          {getAccountIcon(account.type)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-white">
                            {account.name}
                          </p>
                          <p className="text-xs text-white text-opacity-80">
                            {maskAccountNumber(account.number)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xl font-semibold mt-3 text-white">
                      {formatCurrency(account.balance)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
