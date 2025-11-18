import { apiClient } from '@/lib/api/client';
import { AccountMovement } from '@/lib/types';

export async function getDailyMovements(): Promise<AccountMovement[]> {
  // Suponiendo que la API retorna solo los movimientos del día
  const { data } = await apiClient.get<{ data: AccountMovement[] }>('/movements/daily');
  return data.data || [];
}
