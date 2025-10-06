import { apiClient } from '../api/client';
import { LoginCredentials, LoginResponse } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data: response } = await apiClient.post<LoginResponse>('/auth/login', credentials);

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error de autenticación');
    }

    return response;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};
