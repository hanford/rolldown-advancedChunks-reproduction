import React from 'react';
import { AccountSummary } from '../components/dashboard/AccountSummary';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { SpendingOverview } from '../components/dashboard/SpendingOverview';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500">Monitor your accounts and transactions</p>
      </div>

      <AccountSummary />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingOverview />
        <RecentTransactions />
      </div>
    </div>
  );
};