import { apiClient } from '@/lib/api/client';
import { AccountMovementResponse } from '@/lib/types';
import type { ApiResponse } from '@/lib/types/api.types';

export async function getAccountMovements(
  accountNumber: string
): Promise<AccountMovementResponse[]> {
  // Llama a la API REST para obtener los últimos 20 movimientos
  const { data } = await apiClient.get<ApiResponse<AccountMovementResponse[]>>(
    `/accounts/${accountNumber}/movements?limit=20`
  );
  return data.data || [];
}
