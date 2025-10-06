import { ApiResponse } from './api.types';
import { AuthMode, EntityStatusType, UserRoleType } from './common.types';

export type AuthModalState = {
  isOpen: boolean;
  mode: AuthMode;
  open: (mode: AuthMode) => void;
  close: () => void;
};

export interface User {
  id: string;
  code: string;
  username: string;
  email: string;
  name: string;
  role: UserRoleType;
  status: EntityStatusType;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

export type LoginResponse = ApiResponse<AuthSession>;

export interface LoginCredentials {
  email: string;
  password: string;
}
