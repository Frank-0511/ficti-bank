import { apiClient } from '@/lib/api/client';
import type { ApiResponse } from '@/lib/types/api.types';

export interface AccountMovement {
  id: string;
  date: string;
  type: string;
  amount: number;
  balance: number;
  description?: string;
}

export async function getAccountMovements(accountNumber: string): Promise<AccountMovement[]> {
  // Llama a la API REST para obtener los últimos 20 movimientos
  const { data } = await apiClient.get<ApiResponse<AccountMovement[]>>(
    `/accounts/${accountNumber}/movements?limit=20`
  );
  return data.data || [];
}
