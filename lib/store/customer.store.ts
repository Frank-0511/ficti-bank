/**
 * Customer store - Zustand store for customer state management
 */

import { create } from 'zustand';
import { EntityStatus } from '../types/common.types';
import { Customer } from '../types/customer.types';

interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filters: {
    status: EntityStatus | 'all';
    department: string;
    province: string;
    district: string;
  };
}

interface CustomerActions {
  // Customer data actions
  setCustomers: (customers: Customer[]) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (code: string, updates: Partial<Customer>) => void;
  removeCustomer: (code: string) => void;
  selectCustomer: (customer: Customer | null) => void;

  // UI state actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Search and filters
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<CustomerState['filters']>) => void;
  clearFilters: () => void;

  // Computed getters
  getFilteredCustomers: () => Customer[];
  getCustomerByCode: (code: string) => Customer | undefined;
  getCustomerByDni: (dni: string) => Customer | undefined;

  // Reset store
  reset: () => void;
}

const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  filters: {
    status: 'all',
    department: '',
    province: '',
    district: '',
  },
};

export const useCustomerStore = create<CustomerState & CustomerActions>((set, get) => ({
  ...initialState,

  // Customer data actions
  setCustomers: (customers) => set({ customers }),

  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
    })),

  updateCustomer: (code, updates) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.code === code ? { ...customer, ...updates } : customer
      ),
      selectedCustomer:
        state.selectedCustomer?.code === code
          ? { ...state.selectedCustomer, ...updates }
          : state.selectedCustomer,
    })),

  removeCustomer: (code) =>
    set((state) => ({
      customers: state.customers.filter((customer) => customer.code !== code),
      selectedCustomer: state.selectedCustomer?.code === code ? null : state.selectedCustomer,
    })),

  selectCustomer: (customer) => set({ selectedCustomer: customer }),

  // UI state actions
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Search and filters
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  clearFilters: () =>
    set({
      filters: initialState.filters,
      searchQuery: '',
    }),

  // Computed getters
  getFilteredCustomers: () => {
    const { customers, searchQuery, filters } = get();

    return customers.filter((customer) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText =
          `${customer.firstName} ${customer.lastName} ${customer.dni} ${customer.email}`.toLowerCase();
        if (!searchableText.includes(query)) {
          return false;
        }
      }

      // Status filter
      if (filters.status !== 'all' && customer.status !== filters.status) {
        return false;
      }

      // Ubigeo filters would need ubigeo data lookup
      // For now, we'll keep it simple

      return true;
    });
  },

  getCustomerByCode: (code) => {
    return get().customers.find((customer) => customer.code === code);
  },

  getCustomerByDni: (dni) => {
    return get().customers.find((customer) => customer.dni === dni);
  },

  // Reset store
  reset: () => set(initialState),
}));
