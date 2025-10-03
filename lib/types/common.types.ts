/**
 * Common types used across the banking system
 */

export enum EntityStatus {
  ACTIVE = 'A',
  INACTIVE = 'I',
  BLOCKED = 'B',
  CANCELLED = 'N',
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: EntityStatus;
}

export type Currency = 'SO' | 'DO'; // Soles | Dollars
export type UserRole = 'E' | 'A'; // Employee | Admin
