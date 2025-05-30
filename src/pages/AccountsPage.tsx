import React from 'react';
import { AccountList } from '../components/accounts/AccountList';

export const AccountsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Your Accounts</h1>
        <p className="text-neutral-500">View and manage all your accounts</p>
      </div>

      <AccountList />
    </div>
  );
};