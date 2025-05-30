import React from 'react';
import { useBanking } from '../../contexts/BankingContext';
import { formatCurrency, formatDate } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { 
  Clock, 
  Download, 
  Filter, 
  Search,
  ArrowUp,
  ArrowDown,
  Wallet,
  PiggyBank,
  CreditCard,
  LineChart,
} from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { AccountType, Transaction, TransactionType } from '../../lib/types';

interface AccountDetailsProps {
  accountId: string;
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({ accountId }) => {
  const { getAccountById, fetchAccountTransactions } = useBanking();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  
  const account = getAccountById(accountId);
  
  React.useEffect(() => {
    if (accountId) {
      const accountTransactions = fetchAccountTransactions(accountId);
      setTransactions(accountTransactions);
    }
  }, [accountId, fetchAccountTransactions]);

  if (!account) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">Account not found</p>
      </div>
    );
  }

  const getAccountIcon = (type: AccountType) => {
    switch (type) {
      case AccountType.CHECKING:
        return <Wallet className="h-6 w-6 text-primary-500" />;
      case AccountType.SAVINGS:
        return <PiggyBank className="h-6 w-6 text-success-500" />;
      case AccountType.CREDIT:
        return <CreditCard className="h-6 w-6 text-error-500" />;
      case AccountType.INVESTMENT:
        return <LineChart className="h-6 w-6 text-secondary-500" />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.merchant?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center">
            {getAccountIcon(account.type)}
            <CardTitle className="ml-2">{account.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-neutral-500">Current Balance</p>
              <p className={`text-3xl font-semibold ${account.balance < 0 ? 'text-error-500' : ''}`}>
                {formatCurrency(account.balance)}
              </p>
              <p className="text-xs text-neutral-500">Last updated: {formatDate(new Date())}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-neutral-500">Account Number</p>
              <p className="text-lg font-medium">{account.number}</p>
              <p className="text-xs text-neutral-500">Active since {formatDate(account.createdAt)}</p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <ArrowUp className="h-4 w-4 mr-2" />
                Transfer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <Input
                type="text"
                placeholder="Search transactions..."
                className="pl-9 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-4 text-sm text-neutral-500">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-neutral-900">
                            {transaction.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-neutral-500">
                        {transaction.category}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className={`text-sm font-medium flex items-center justify-end ${
                          transaction.type === TransactionType.DEPOSIT 
                            ? 'text-success-600' 
                            : transaction.type === TransactionType.WITHDRAWAL || transaction.type === TransactionType.PAYMENT
                              ? 'text-error-600'
                              : 'text-neutral-900'
                        }`}>
                          {transaction.type === TransactionType.DEPOSIT && <ArrowDown className="h-3 w-3 mr-1" />}
                          {(transaction.type === TransactionType.WITHDRAWAL || transaction.type === TransactionType.PAYMENT) && 
                            <ArrowUp className="h-3 w-3 mr-1" />
                          }
                          {formatCurrency(transaction.amount)}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-neutral-500">
                      {searchTerm 
                        ? 'No transactions found matching your search'
                        : 'No transactions found for this account'
                      }
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length > 10 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-neutral-500">
                Showing 10 of {filteredTransactions.length} transactions
              </p>
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                Load More
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};