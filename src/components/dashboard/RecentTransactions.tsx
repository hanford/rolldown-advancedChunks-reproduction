import React from 'react';
import { useBanking } from '../../contexts/BankingContext';
import { formatCurrency, formatDate } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { 
  ArrowUpRight, 
  ShoppingBag, 
  Coffee, 
  Home, 
  Car, 
  Utensils, 
  Wifi, 
  Briefcase, 
  Landmark 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Transaction, TransactionCategory, TransactionType } from '../../lib/types';

export const RecentTransactions: React.FC = () => {
  const { transactions } = useBanking();
  
  // Sort transactions by date (newest first) and take first 5
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const getCategoryIcon = (category: TransactionCategory) => {
    switch (category) {
      case TransactionCategory.FOOD:
        return <Utensils className="h-4 w-4" />;
      case TransactionCategory.HOUSING:
        return <Home className="h-4 w-4" />;
      case TransactionCategory.TRANSPORTATION:
        return <Car className="h-4 w-4" />;
      case TransactionCategory.UTILITIES:
        return <Wifi className="h-4 w-4" />;
      case TransactionCategory.INCOME:
        return <Briefcase className="h-4 w-4" />;
      case TransactionCategory.PERSONAL:
        return <ShoppingBag className="h-4 w-4" />;
      default:
        return <ShoppingBag className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case TransactionType.DEPOSIT:
        return 'text-success-500 bg-success-50';
      case TransactionType.WITHDRAWAL:
        return 'text-error-500 bg-error-50';
      case TransactionType.PAYMENT:
        return 'text-error-500 bg-error-50';
      case TransactionType.TRANSFER:
        return 'text-primary-500 bg-primary-50';
      default:
        return 'text-neutral-500 bg-neutral-50';
    }
  };

  const getAmountPrefix = (type: TransactionType) => {
    switch (type) {
      case TransactionType.DEPOSIT:
        return '+';
      case TransactionType.WITHDRAWAL:
        return '-';
      case TransactionType.PAYMENT:
        return '-';
      case TransactionType.TRANSFER:
        return '';
      default:
        return '';
    }
  };

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
          {recentTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center">
                <div className={`h-10 w-10 rounded-full ${getTransactionColor(transaction.type)} flex items-center justify-center mr-3`}>
                  {getCategoryIcon(transaction.category)}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{transaction.description}</p>
                  <p className="text-xs text-neutral-500">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${transaction.type === TransactionType.DEPOSIT ? 'text-success-600' : 'text-neutral-900'}`}>
                  {getAmountPrefix(transaction.type)}{formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-neutral-500">{transaction.merchant || transaction.category}</p>
              </div>
            </div>
          ))}
          
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