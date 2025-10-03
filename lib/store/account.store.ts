/**
 * Account store - Zustand store for account state management
 */

import { create } from 'zustand';
import { Account } from '../types/account.types';
import { Currency, EntityStatus } from '../types/common.types';

interface AccountState {
  accounts: Account[];
  selectedAccount: Account | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    status: EntityStatus | 'all';
    accountType: string | 'all';
    currency: Currency | 'all';
    customerCode: string;
    hasEmbargo: boolean | 'all';
  };
}

interface AccountActions {
  // Account data actions
  setAccounts: (accounts: Account[]) => void;
  addAccount: (account: Account) => void;
  updateAccount: (accountNumber: string, updates: Partial<Account>) => void;
  removeAccount: (accountNumber: string) => void;
  selectAccount: (account: Account | null) => void;

  // UI state actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Filters
  setFilters: (filters: Partial<AccountState['filters']>) => void;
  clearFilters: () => void;

  // Computed getters
  getFilteredAccounts: () => Account[];
  getAccountByNumber: (accountNumber: string) => Account | undefined;
  getAccountsByCustomer: (customerCode: string) => Account[];
  getAccountsByType: (accountType: string) => Account[];

  // Business logic helpers
  getAvailableBalance: (accountNumber: string) => number;
  canCloseAccount: (accountNumber: string) => boolean;
  canEmbargoAccount: (accountNumber: string) => boolean;

  // Reset store
  reset: () => void;
}

const initialState: AccountState = {
  accounts: [],
  selectedAccount: null,
  isLoading: false,
  error: null,
  filters: {
    status: 'all',
    accountType: 'all',
    currency: 'all',
    customerCode: '',
    hasEmbargo: 'all',
  },
};

export const useAccountStore = create<AccountState & AccountActions>((set, get) => ({
  ...initialState,

  // Account data actions
  setAccounts: (accounts) => set({ accounts }),

  addAccount: (account) =>
    set((state) => ({
      accounts: [...state.accounts, account],
    })),

  updateAccount: (accountNumber, updates) =>
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.number === accountNumber ? { ...account, ...updates } : account
      ),
      selectedAccount:
        state.selectedAccount?.number === accountNumber
          ? { ...state.selectedAccount, ...updates }
          : state.selectedAccount,
    })),

  removeAccount: (accountNumber) =>
    set((state) => ({
      accounts: state.accounts.filter((account) => account.number !== accountNumber),
      selectedAccount:
        state.selectedAccount?.number === accountNumber ? null : state.selectedAccount,
    })),

  selectAccount: (account) => set({ selectedAccount: account }),

  // UI state actions
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Filters
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  clearFilters: () =>
    set({
      filters: initialState.filters,
    }),

  // Computed getters
  getFilteredAccounts: () => {
    const { accounts, filters } = get();

    return accounts.filter((account) => {
      // Status filter
      if (filters.status !== 'all' && account.status !== filters.status) {
        return false;
      }

      // Account type filter
      if (filters.accountType !== 'all' && account.type !== filters.accountType) {
        return false;
      }

      // Currency filter
      if (filters.currency !== 'all' && account.currency !== filters.currency) {
        return false;
      }

      // Customer filter
      if (filters.customerCode && account.customerCode !== filters.customerCode) {
        return false;
      }

      // Embargo filter
      if (filters.hasEmbargo !== 'all') {
        if (filters.hasEmbargo && !account.isEmbargoed) {
          return false;
        }
        if (!filters.hasEmbargo && account.isEmbargoed) {
          return false;
        }
      }

      return true;
    });
  },

  getAccountByNumber: (accountNumber) => {
    return get().accounts.find((account) => account.number === accountNumber);
  },

  getAccountsByCustomer: (customerCode) => {
    return get().accounts.filter((account) => account.customerCode === customerCode);
  },

  getAccountsByType: (accountType) => {
    return get().accounts.filter((account) => account.type === accountType);
  },

  // Business logic helpers
  getAvailableBalance: (accountNumber) => {
    const account = get().getAccountByNumber(accountNumber);
    if (!account) {
      return 0;
    }

    if (!account.isEmbargoed) {
      return account.currentBalance;
    }

    // Total embargo
    if (account.embargoAmount === null || account.embargoAmount === undefined) {
      return 0;
    }

    // Partial embargo
    return Math.max(0, account.currentBalance - account.embargoAmount);
  },

  canCloseAccount: (accountNumber) => {
    const account = get().getAccountByNumber(accountNumber);
    if (!account) {
      return false;
    }

    return (
      account.status === EntityStatus.ACTIVE && account.currentBalance === 0 && !account.isEmbargoed
    );
  },

  canEmbargoAccount: (accountNumber) => {
    const account = get().getAccountByNumber(accountNumber);
    if (!account) {
      return false;
    }

    return account.status === EntityStatus.ACTIVE && !account.isEmbargoed;
  },

  // Reset store
  reset: () => set(initialState),
}));
