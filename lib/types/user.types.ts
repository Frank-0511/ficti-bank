/**
 * User and authentication related types
 */

import { EntityStatus, UserRole } from './common.types';

export interface User {
  code: string; // CodUsu VARCHAR(10)
  username: string; // Usuario VARCHAR(100)
  role: UserRole; // Rol CHAR(1) - Employee/Admin
  status: EntityStatus; // Estado CHAR(1)
}

export interface Session {
  token: string;
  user: User;
  expiresAt: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresAt: string;
}
