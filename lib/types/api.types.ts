/**
 * Generic API response types
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface ErrorDetails {
  code: string;
  details: string | string[];
}

export type ApiResponseError = ApiResponse<ErrorDetails>;
