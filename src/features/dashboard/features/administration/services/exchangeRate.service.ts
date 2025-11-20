import { apiClient } from '@/lib/api/client';
import { ApiResponse } from '@/lib/types/api.types';
import {
  ExchangeRate,
  ExchangeRateData,
  ExchangeRateResponse,
} from '@/lib/types/exchangeRate.types';

export const exchangeRateService = {
  getAll: async (): Promise<ApiResponse<ExchangeRate[]>> => {
    const { data: response } = await apiClient.get<ApiResponse<ExchangeRate[]>>('/exchange-rates');
    return response;
  },

  getToday: async (): Promise<ApiResponse<ExchangeRate | null>> => {
    const { data: response } =
      await apiClient.get<ApiResponse<ExchangeRate | null>>('/exchange-rates/today');
    return response;
  },

  create: async (data: ExchangeRateData): Promise<ApiResponse<ExchangeRateResponse>> => {
    const { data: response } = await apiClient.post<ApiResponse<ExchangeRateResponse>>(
      '/exchange-rates',
      data
    );
    return response;
  },

  update: async (data: ExchangeRateData): Promise<ApiResponse<ExchangeRateResponse>> => {
    const { data: response } = await apiClient.put<ApiResponse<ExchangeRateResponse>>(
      '/exchange-rates/today',
      data
    );
    return response;
  },
};
