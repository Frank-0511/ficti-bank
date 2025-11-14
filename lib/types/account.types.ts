import { ACCOUNT_STATUS, ACCOUNT_TYPE, CURRENCY } from '../constants/account.constants';

export type AccountType = (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE];
export type Currency = (typeof CURRENCY)[keyof typeof CURRENCY];
export type AccountStatus = (typeof ACCOUNT_STATUS)[keyof typeof ACCOUNT_STATUS];

export interface Account {
  accountType: AccountType;
  accountNumber: string;
  clientCode: string;
  currency: Currency;
  openingDate: string;
  closingDate?: string;
  blockDate?: string;
  lastMovementDate?: string;
  initialBalance: number;
  currentBalance: number;
  availableBalance: number;
  userCode: string;
  status: AccountStatus;
  term?: number;
  monthlyInterest?: number;
  overdraftLimit?: number;
}

export interface OpenAccountData {
  accountType: AccountType;
  currency: Currency;
  initialBalance?: number;
  term?: number;
  monthlyInterest?: number;
  overdraftLimit?: number;
  clientCode?: string;
}

export interface CloseAccountData {
  accountNumber: string;
  reason?: string;
}

export interface FreezeAccountData {
  accountNumber: string;
  type: 'total' | 'partial';
  amount?: number;
}

export interface FreezeAccountResponse {
  accountNumber: string;
}

export interface DepositAccountData {
  accountNumber: string;
  amount: number;
}

export interface DepositAccountResponse {
  accountNumber: string;
}
