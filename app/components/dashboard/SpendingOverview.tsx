import React from 'react';
import { useBanking } from '../../contexts/BankingContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TransactionCategory, TransactionType } from '../../lib/types';
import { formatCurrency } from '../../lib/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

export const SpendingOverview: React.FC = () => {
  const { transactions } = useBanking();
  
  // Only include spending transactions (withdrawals and payments)
  const spendingTransactions = transactions.filter(
    t => t.type === TransactionType.WITHDRAWAL || t.type === TransactionType.PAYMENT
  );
  
  const getCategorySpending = () => {
    const categories: Record<string, number> = {};
    
    spendingTransactions.forEach(transaction => {
      const category = transaction.category;
      if (!categories[category]) {
        categories[category] = 0;
      }
      categories[category] += transaction.amount;
    });
    
    return categories;
  };
  
  const categorySpending = getCategorySpending();
  
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      [TransactionCategory.FOOD]: '#F59E0B',
      [TransactionCategory.HOUSING]: '#0EA5E9',
      [TransactionCategory.TRANSPORTATION]: '#8B5CF6',
      [TransactionCategory.UTILITIES]: '#10B981',
      [TransactionCategory.ENTERTAINMENT]: '#EC4899',
      [TransactionCategory.PERSONAL]: '#6366F1',
      [TransactionCategory.HEALTHCARE]: '#EF4444',
      [TransactionCategory.EDUCATION]: '#14B8A6',
      [TransactionCategory.INSURANCE]: '#7C3AED',
      [TransactionCategory.OTHER]: '#9CA3AF',
    };
    
    return colorMap[category] || '#9CA3AF';
  };
  
  const chartData = {
    labels: Object.keys(categorySpending),
    datasets: [
      {
        data: Object.values(categorySpending),
        backgroundColor: Object.keys(categorySpending).map(getCategoryColor),
        borderWidth: 1,
        borderColor: '#fff',
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${formatCurrency(value)}`;
          }
        }
      }
    },
  };
  
  const totalSpending = Object.values(categorySpending).reduce((a, b) => a + b, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="h-64 w-full md:w-1/2">
            <Pie data={chartData} options={chartOptions} />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="bg-neutral-50 rounded-lg p-4">
              <p className="text-sm font-medium text-neutral-500">Total Spending</p>
              <p className="text-2xl font-semibold mt-1">{formatCurrency(totalSpending)}</p>
            </div>
            <div className="space-y-2">
              {Object.entries(categorySpending)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: getCategoryColor(category) }}
                      />
                      <span className="text-sm text-neutral-700">{category}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};