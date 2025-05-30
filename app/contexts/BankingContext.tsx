import React, { createContext, useContext, useState, useEffect } from 'react';
import { Account, Transaction, Notification } from '../lib/types';
import { useAuth } from './AuthContext';
import { mockAccounts, mockTransactions, mockNotifications } from '../data/mockData';

interface BankingContextType {
  accounts: Account[];
  transactions: Transaction[];
  notifications: Notification[];
  isLoading: boolean;
  fetchUserAccounts: () => void;
  fetchAccountTransactions: (accountId: string) => Transaction[];
  getAccountById: (accountId: string) => Account | undefined;
  markNotificationAsRead: (notificationId: string) => void;
  unreadNotificationsCount: number;
}

const BankingContext = createContext<BankingContextType>({
  accounts: [],
  transactions: [],
  notifications: [],
  isLoading: true,
  fetchUserAccounts: () => {},
  fetchAccountTransactions: () => [],
  getAccountById: () => undefined,
  markNotificationAsRead: () => {},
  unreadNotificationsCount: 0,
});

export const useBanking = () => useContext(BankingContext);

export const BankingProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const { user, isAuthenticated } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserAccounts();
      fetchUserNotifications();
    } else {
      setAccounts([]);
      setTransactions([]);
      setNotifications([]);
    }
  }, [isAuthenticated, user]);

  const fetchUserAccounts = () => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    if (user) {
      const userAccounts = mockAccounts.filter(account => account.userId === user.id);
      setAccounts(userAccounts);
      
      // Get all transactions for user accounts
      const accountIds = userAccounts.map(account => account.id);
      const userTransactions = mockTransactions.filter(
        transaction => accountIds.includes(transaction.accountId)
      );
      setTransactions(userTransactions);
    }
    
    setIsLoading(false);
  };

  const fetchUserNotifications = () => {
    if (user) {
      const userNotifications = mockNotifications.filter(
        notification => notification.userId === user.id
      );
      setNotifications(userNotifications);
    }
  };

  const fetchAccountTransactions = (accountId: string): Transaction[] => {
    return transactions.filter(transaction => transaction.accountId === accountId);
  };

  const getAccountById = (accountId: string): Account | undefined => {
    return accounts.find(account => account.id === accountId);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  return (
    <BankingContext.Provider
      value={{
        accounts,
        transactions,
        notifications,
        isLoading,
        fetchUserAccounts,
        fetchAccountTransactions,
        getAccountById,
        markNotificationAsRead,
        unreadNotificationsCount,
      }}
    >
      {children}
    </BankingContext.Provider>
  );
};