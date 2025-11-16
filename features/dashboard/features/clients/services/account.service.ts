import { apiClient } from '@/lib/api/client';
import {
  Account,
  ApiResponse,
  DepositAccountData,
  DepositAccountResponse,
  FreezeAccountData,
  FreezeAccountResponse,
  OpenAccountData,
  UnfreezeAccountResponse,
  WithdrawAccountData,
  WithdrawAccountResponse,
} from '@/lib/types';

export const accountService = {
  getAll: async (clientCode?: string): Promise<ApiResponse<Account[]>> => {
    let url = '/accounts';
    if (clientCode) {
      url += `?clientCode=${encodeURIComponent(clientCode)}`;
    }
    const { data: response } = await apiClient.get<ApiResponse<Account[]>>(url);

    return response;
  },

  create: async (accountData: OpenAccountData): Promise<ApiResponse<Account>> => {
    const { data: response } = await apiClient.post<ApiResponse<Account>>('/accounts', accountData);

    return response;
  },

  close: async (accountNumber: string): Promise<ApiResponse<null>> => {
    const { data: response } = await apiClient.delete<ApiResponse<null>>(
      `/accounts/${accountNumber}`
    );

    return response;
  },
  freeze: async (freezeData: FreezeAccountData): Promise<ApiResponse<FreezeAccountResponse>> => {
    const { data: response } = await apiClient.post<ApiResponse<FreezeAccountResponse>>(
      `/accounts/${freezeData.accountNumber}/freeze`,
      freezeData
    );

    return response;
  },
  inactivate: async (accountNumber: string): Promise<ApiResponse<Account>> => {
    const { data: response } = await apiClient.patch<ApiResponse<Account>>(
      `/accounts/${accountNumber}/inactivate`
    );

    return response;
  },
  deposit: async (
    depositData: DepositAccountData
  ): Promise<ApiResponse<DepositAccountResponse>> => {
    console.log('accountService.deposit called');
    const { data: response } = await apiClient.post<ApiResponse<DepositAccountResponse>>(
      `/accounts/${depositData.accountNumber}/deposit`,
      { amount: depositData.amount }
    );

    return response;
  },
  withdraw: async (
    withdrawData: WithdrawAccountData
  ): Promise<ApiResponse<WithdrawAccountResponse>> => {
    const { data: response } = await apiClient.post<ApiResponse<WithdrawAccountResponse>>(
      `/accounts/${withdrawData.accountNumber}/withdraw`,
      { amount: withdrawData.amount }
    );

    return response;
  },
  unfreeze: async (accountNumber: string): Promise<ApiResponse<UnfreezeAccountResponse>> => {
    const { data: response } = await apiClient.post<ApiResponse<{ accountNumber: string }>>(
      `/accounts/${accountNumber}/unfreeze`
    );
    return response;
  },
};
