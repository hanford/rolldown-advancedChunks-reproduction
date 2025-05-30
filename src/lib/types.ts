// User related types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

// Account related types
export interface Account {
  id: string;
  userId: string;
  type: AccountType;
  name: string;
  number: string;
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
}

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  CREDIT = 'CREDIT',
  INVESTMENT = 'INVESTMENT',
}

// Transaction related types
export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: TransactionCategory;
  date: string;
  status: TransactionStatus;
  merchant?: string;
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
  PAYMENT = 'PAYMENT',
}

export enum TransactionCategory {
  HOUSING = 'HOUSING',
  TRANSPORTATION = 'TRANSPORTATION',
  FOOD = 'FOOD',
  UTILITIES = 'UTILITIES',
  INSURANCE = 'INSURANCE',
  HEALTHCARE = 'HEALTHCARE',
  ENTERTAINMENT = 'ENTERTAINMENT',
  PERSONAL = 'PERSONAL',
  EDUCATION = 'EDUCATION',
  INCOME = 'INCOME',
  OTHER = 'OTHER',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
}

// Notification related types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

export enum NotificationType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ALERT = 'ALERT',
}

// Chart/Analytics related types
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}