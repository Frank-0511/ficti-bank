import { apiClient } from '@/lib/api/client';
import { ApiResponse } from '@/lib/types/api.types';
import type { User } from '@/lib/types/auth.types';

export const usersService = {
  fetchUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>('/users');
    return response.data.data || [];
  },

  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, updates);
    return response.data.data!;
  },

  deleteUser: async (id: string): Promise<User> => {
    const response = await apiClient.delete<ApiResponse<User>>(`/users/${id}`);
    return response.data.data!;
  },
};
