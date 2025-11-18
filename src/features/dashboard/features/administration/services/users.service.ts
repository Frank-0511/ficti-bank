import { apiClient } from '@/lib/api/client';
import type { ApiResponse, User } from '@/lib/types';

export const usersService = {
  fetchUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>('/api/users');
    return response.data.data || [];
  },

  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>(`/api/users/${id}`, updates);
    return response.data.data!;
  },

  deleteUser: async (id: string): Promise<User> => {
    const response = await apiClient.delete<ApiResponse<User>>(`/api/users/${id}`);
    return response.data.data!;
  },
};
