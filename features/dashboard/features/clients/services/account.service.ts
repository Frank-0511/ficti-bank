import { apiClient } from '@/lib/api/client';
import { Account, ApiResponse, OpenAccountData } from '@/lib/types';

export const accountService = {
  getAll: async (clientCode?: string): Promise<ApiResponse<Account[]>> => {
    let url = '/accounts';
    if (clientCode) {
      url += `?clientCode=${encodeURIComponent(clientCode)}`;
    }
    const { data: response } = await apiClient.get<ApiResponse<Account[]>>(url);

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener las cuentas');
    }

    return response;
  },

  create: async (accountData: OpenAccountData): Promise<ApiResponse<Account>> => {
    console.log('🚀 ~ accountData:', accountData);
    const { data: response } = await apiClient.post<ApiResponse<Account>>('/accounts', accountData);

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear la cuenta');
    }

    return response;
  },

  close: async (accountNumber: string): Promise<ApiResponse<null>> => {
    const { data: response } = await apiClient.delete<ApiResponse<null>>(
      `/accounts/${accountNumber}`
    );

    if (!response.success) {
      throw new Error(response.message || 'Error al cerrar la cuenta');
    }

    return response;
  },
};
