import { apiClient } from '@/lib/api/client';
import {
  Account,
  ApiResponse,
  DepositAccountData,
  DepositAccountResponse,
  FreezeAccountData,
  FreezeAccountResponse,
  OpenAccountData,
} from '@/lib/types';

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
  freeze: async (freezeData: FreezeAccountData): Promise<ApiResponse<FreezeAccountResponse>> => {
    const { data: response } = await apiClient.post<ApiResponse<FreezeAccountResponse>>(
      `/accounts/${freezeData.accountNumber}/freeze`,
      freezeData
    );

    if (!response.success && !response.data) {
      throw new Error(response.message || 'Error al embargar la cuenta');
    }
    return response;
  },
  inactivate: async (accountNumber: string): Promise<ApiResponse<Account>> => {
    const { data: response } = await apiClient.patch<ApiResponse<Account>>(
      `/accounts/${accountNumber}/inactivate`
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al inactivar la cuenta');
    }

    return response;
  },
  deposit: async (
    depositData: DepositAccountData
  ): Promise<ApiResponse<DepositAccountResponse>> => {
    const { data: response } = await apiClient.post<ApiResponse<DepositAccountResponse>>(
      `/accounts/${depositData.accountNumber}/deposit`,
      { amount: depositData.amount }
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al depositar en la cuenta');
    }

    return response;
  },
};
