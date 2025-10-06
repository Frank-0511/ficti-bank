import { create } from 'zustand';
import { Account } from '../types/account.types';

interface AccountState {
  accounts: Account[];
  selectedAccount: Account | null;
  isLoading: boolean;
}

interface AccountActions {
  setAccounts: (accounts: Account[]) => void;
  addAccount: (account: Account) => void;
  removeAccount: (accountNumber: string) => void;
  updateAccount: (accountNumber: string, data: Partial<Account>) => void;
  selectAccount: (account: Account | null) => void;
  setLoading: (isLoading: boolean) => void;
  clearAccounts: () => void;
}

const initialState: AccountState = {
  accounts: [],
  selectedAccount: null,
  isLoading: false,
};

export const useAccountStore = create<AccountState & AccountActions>()((set) => ({
  ...initialState,

  setAccounts: (accounts) => {
    set({ accounts });
  },

  addAccount: (account) => {
    set((state) => ({
      accounts: [...state.accounts, account],
    }));
  },

  removeAccount: (accountNumber) => {
    set((state) => ({
      accounts: state.accounts.filter((acc) => acc.accountNumber !== accountNumber),
      selectedAccount:
        state.selectedAccount?.accountNumber === accountNumber ? null : state.selectedAccount,
    }));
  },

  updateAccount: (accountNumber, data) => {
    set((state) => ({
      accounts: state.accounts.map((acc) =>
        acc.accountNumber === accountNumber ? { ...acc, ...data } : acc
      ),
    }));
  },

  selectAccount: (account) => {
    set({ selectedAccount: account });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  clearAccounts: () => {
    set(initialState);
  },
}));
