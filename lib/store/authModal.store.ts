import { create } from 'zustand';
import { AUTH_MODES } from '../constants';
import { AuthModalState } from '../types';

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  mode: AUTH_MODES.LOGIN,
  open: (mode) => set({ isOpen: true, mode }),
  close: () => set({ isOpen: false }),
}));
