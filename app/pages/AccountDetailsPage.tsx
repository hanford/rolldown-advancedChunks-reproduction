import React from "react";
import { useParams } from "react-router";
import { AccountDetails } from "../components/accounts/AccountDetails";

export const AccountDetailsPage: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();

  if (!accountId) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">Account not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">
          Account Details
        </h1>
        <p className="text-neutral-500">
          View your account information and transactions
        </p>
      </div>

      <AccountDetails accountId={accountId} />
    </div>
  );
};
