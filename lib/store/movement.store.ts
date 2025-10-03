/**
 * Movement store - Zustand store for movement state management
 */

import { create } from 'zustand';
import { EntityStatus } from '../types/common.types';
import { Movement } from '../types/movement.types';

interface MovementState {
  movements: Movement[];
  selectedMovement: Movement | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    accountNumber: string;
    movementType: string | 'all';
    status: EntityStatus | 'all';
    dateFrom: string;
    dateTo: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

interface MovementActions {
  // Movement data actions
  setMovements: (movements: Movement[]) => void;
  addMovement: (movement: Movement) => void;
  updateMovement: (
    accountNumber: string,
    operationNumber: number,
    updates: Partial<Movement>
  ) => void;
  selectMovement: (movement: Movement | null) => void;

  // UI state actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Filters and pagination
  setFilters: (filters: Partial<MovementState['filters']>) => void;
  clearFilters: () => void;
  setPagination: (pagination: Partial<MovementState['pagination']>) => void;

  // Computed getters
  getFilteredMovements: () => Movement[];
  getMovementsByAccount: (accountNumber: string, limit?: number) => Movement[];
  getTodayMovements: () => Movement[];
  getMovementsByDateRange: (startDate: string, endDate: string) => Movement[];

  // Business calculations
  calculateAccountBalance: (accountNumber: string, upToDate?: string) => number;
  getDailyOperationsSummary: (date: string) => {
    totalOperations: number;
    deposits: { count: number; amount: number };
    withdrawals: { count: number; amount: number };
    transfers: { count: number; amount: number };
  };

  // Reset store
  reset: () => void;
}

const initialState: MovementState = {
  movements: [],
  selectedMovement: null,
  isLoading: false,
  error: null,
  filters: {
    accountNumber: '',
    movementType: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
  },
};

export const useMovementStore = create<MovementState & MovementActions>((set, get) => ({
  ...initialState,

  // Movement data actions
  setMovements: (movements) => set({ movements }),

  addMovement: (movement) =>
    set((state) => ({
      movements: [...state.movements, movement],
    })),

  updateMovement: (accountNumber, operationNumber, updates) =>
    set((state) => ({
      movements: state.movements.map((movement) =>
        movement.accountNumber === accountNumber && movement.operationNumber === operationNumber
          ? { ...movement, ...updates }
          : movement
      ),
    })),

  selectMovement: (movement) => set({ selectedMovement: movement }),

  // UI state actions
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Filters and pagination
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  clearFilters: () =>
    set({
      filters: initialState.filters,
    }),

  setPagination: (newPagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...newPagination },
    })),

  // Computed getters
  getFilteredMovements: () => {
    const { movements, filters } = get();

    return movements
      .filter((movement) => {
        // Account number filter
        if (filters.accountNumber && movement.accountNumber !== filters.accountNumber) {
          return false;
        }

        // Movement type filter
        if (filters.movementType !== 'all' && movement.movementType !== filters.movementType) {
          return false;
        }

        // Status filter
        if (filters.status !== 'all' && movement.status !== filters.status) {
          return false;
        }

        // Date range filter
        if (filters.dateFrom && movement.operationDate < filters.dateFrom) {
          return false;
        }

        if (filters.dateTo && movement.operationDate > filters.dateTo) {
          return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.operationDate).getTime() - new Date(a.operationDate).getTime());
  },

  getMovementsByAccount: (accountNumber, limit = 20) => {
    return get()
      .movements.filter((movement) => movement.accountNumber === accountNumber)
      .sort((a, b) => new Date(b.operationDate).getTime() - new Date(a.operationDate).getTime())
      .slice(0, limit);
  },

  getTodayMovements: () => {
    const today = new Date().toISOString().split('T')[0];
    return get()
      .movements.filter((movement) => movement.operationDate === today)
      .sort((a, b) => new Date(b.operationDate).getTime() - new Date(a.operationDate).getTime());
  },

  getMovementsByDateRange: (startDate, endDate) => {
    return get()
      .movements.filter(
        (movement) => movement.operationDate >= startDate && movement.operationDate <= endDate
      )
      .sort((a, b) => new Date(b.operationDate).getTime() - new Date(a.operationDate).getTime());
  },

  // Business calculations
  calculateAccountBalance: (accountNumber, upToDate) => {
    const movements = get().movements.filter((movement) => {
      if (movement.accountNumber !== accountNumber) {
        return false;
      }
      if (movement.status !== EntityStatus.ACTIVE) {
        return false;
      }
      if (upToDate && movement.operationDate > upToDate) {
        return false;
      }
      return true;
    });

    return movements.reduce((balance, movement) => {
      switch (movement.movementType) {
        case 'DP': // Deposit
          return balance + movement.amount;
        case 'RT': // Withdrawal
          return balance - movement.amount;
        case 'TF': // Transfer - would need more context
          return balance;
        default:
          return balance;
      }
    }, 0);
  },

  getDailyOperationsSummary: (date) => {
    const movements = get().movements.filter(
      (movement) => movement.operationDate === date && movement.status === EntityStatus.ACTIVE
    );

    const summary = {
      totalOperations: movements.length,
      deposits: { count: 0, amount: 0 },
      withdrawals: { count: 0, amount: 0 },
      transfers: { count: 0, amount: 0 },
    };

    movements.forEach((movement) => {
      switch (movement.movementType) {
        case 'DP':
          summary.deposits.count++;
          summary.deposits.amount += movement.amount;
          break;
        case 'RT':
          summary.withdrawals.count++;
          summary.withdrawals.amount += movement.amount;
          break;
        case 'TF':
          summary.transfers.count++;
          summary.transfers.amount += movement.amount;
          break;
      }
    });

    return summary;
  },

  // Reset store
  reset: () => set(initialState),
}));
