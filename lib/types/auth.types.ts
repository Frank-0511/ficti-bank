import { AUTH_MODES } from '../constants';

export type AuthMode = (typeof AUTH_MODES)[keyof typeof AUTH_MODES];

export type AuthModalState = {
  isOpen: boolean;
  mode: AuthMode;
  open: (mode: AuthMode) => void;
  close: () => void;
};
