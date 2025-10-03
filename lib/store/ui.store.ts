/**
 * UI store - Zustand store for global UI state management
 */

import { create } from 'zustand';

interface UIState {
  // Modal states
  modals: {
    createCustomer: boolean;
    editCustomer: boolean;
    createAccount: boolean;
    closeAccount: boolean;
    embargoAccount: boolean;
    deactivateAccount: boolean;
    createMovement: boolean;
  };

  // Loading states
  loading: {
    customers: boolean;
    accounts: boolean;
    movements: boolean;
    ubigeo: boolean;
  };

  // Notification state
  notifications: {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    autoClose?: boolean;
  }[];

  // Layout state
  sidebarOpen: boolean;
  currentPage: string;
  breadcrumbs: { label: string; href?: string }[];
}

interface UIActions {
  // Modal actions
  openModal: (modalName: keyof UIState['modals']) => void;
  closeModal: (modalName: keyof UIState['modals']) => void;
  closeAllModals: () => void;

  // Loading actions
  setLoading: (loadingKey: keyof UIState['loading'], isLoading: boolean) => void;

  // Notification actions
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Layout actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setCurrentPage: (page: string) => void;
  setBreadcrumbs: (breadcrumbs: UIState['breadcrumbs']) => void;

  // Reset store
  reset: () => void;
}

const initialState: UIState = {
  modals: {
    createCustomer: false,
    editCustomer: false,
    createAccount: false,
    closeAccount: false,
    embargoAccount: false,
    deactivateAccount: false,
    createMovement: false,
  },
  loading: {
    customers: false,
    accounts: false,
    movements: false,
    ubigeo: false,
  },
  notifications: [],
  sidebarOpen: true,
  currentPage: '',
  breadcrumbs: [],
};

export const useUIStore = create<UIState & UIActions>((set) => ({
  ...initialState,

  // Modal actions
  openModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: true },
    })),

  closeModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: false },
    })),

  closeAllModals: () =>
    set((state) => ({
      modals: Object.keys(state.modals).reduce(
        (acc, key) => ({
          ...acc,
          [key]: false,
        }),
        {} as UIState['modals']
      ),
    })),

  // Loading actions
  setLoading: (loadingKey, isLoading) =>
    set((state) => ({
      loading: { ...state.loading, [loadingKey]: isLoading },
    })),

  // Notification actions
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: crypto.randomUUID(),
          autoClose: notification.autoClose ?? true,
        },
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),

  // Layout actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

  // Reset store
  reset: () => set(initialState),
}));
