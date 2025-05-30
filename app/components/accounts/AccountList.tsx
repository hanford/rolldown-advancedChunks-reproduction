import React from "react";
import { useBanking } from "../../contexts/BankingContext";
import { formatCurrency } from "../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import {
  CreditCard,
  Wallet,
  PiggyBank,
  LineChart,
  ChevronRight,
  Plus,
  Search,
} from "lucide-react";
import { Link } from "react-router";
import { AccountType } from "../../lib/types";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export const AccountList: React.FC = () => {
  const { accounts } = useBanking();
  const [searchTerm, setSearchTerm] = React.useState("");

  const getAccountIcon = (type: AccountType) => {
    switch (type) {
      case AccountType.CHECKING:
        return <Wallet className="h-5 w-5" />;
      case AccountType.SAVINGS:
        return <PiggyBank className="h-5 w-5" />;
      case AccountType.CREDIT:
        return <CreditCard className="h-5 w-5" />;
      case AccountType.INVESTMENT:
        return <LineChart className="h-5 w-5" />;
    }
  };

  const getAccountColor = (type: AccountType) => {
    switch (type) {
      case AccountType.CHECKING:
        return "bg-primary-100 text-primary-600";
      case AccountType.SAVINGS:
        return "bg-success-100 text-success-600";
      case AccountType.CREDIT:
        return "bg-error-100 text-error-600";
      case AccountType.INVESTMENT:
        return "bg-secondary-100 text-secondary-600";
    }
  };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.number.includes(searchTerm)
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Accounts</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input
              type="text"
              placeholder="Search accounts..."
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Account
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredAccounts.map((account) => (
            <Link
              key={account.id}
              to={`/accounts/${account.id}`}
              className="block"
            >
              <div className="rounded-lg border border-neutral-200 p-4 hover:border-primary-300 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`h-10 w-10 rounded-full ${getAccountColor(
                        account.type
                      )} flex items-center justify-center mr-4`}
                    >
                      {getAccountIcon(account.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {account.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {account.number}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-4">
                      <p
                        className={`text-lg font-semibold ${
                          account.balance < 0
                            ? "text-error-600"
                            : "text-neutral-900"
                        }`}
                      >
                        {formatCurrency(account.balance)}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {account.currency}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-neutral-400" />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {filteredAccounts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-neutral-500">No accounts found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
