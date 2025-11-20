import { apiClient } from '@/lib/api/client';
import { ApiResponse } from '@/lib/types/api.types';
import { Client, ClientFilters } from '@/lib/types/client.types';

export const clientService = {
  /**
   * Obtiene la lista de todos los clientes
   */
  getAll: async (filters?: ClientFilters): Promise<ApiResponse<Client[]>> => {
    const params = new URLSearchParams();
    if (filters?.status) {
      params.append('status', filters.status);
    }
    if (filters?.personType) {
      params.append('personType', filters.personType);
    }

    const queryString = params.toString();
    const url = `/clients${queryString ? `?${queryString}` : ''}`;

    const { data: response } = await apiClient.get<ApiResponse<Client[]>>(url);

    return response;
  },

  /**
   * Obtiene un cliente por ID
   */
  getById: async (id: string): Promise<ApiResponse<Client>> => {
    const { data: response } = await apiClient.get<ApiResponse<Client>>(`/clients/${id}`);

    return response;
  },

  /**
   * Crea un nuevo cliente
   */
  create: async (clientData: Partial<Client>): Promise<ApiResponse<Client>> => {
    const { data: response } = await apiClient.post<ApiResponse<Client>>('/clients', clientData);

    return response;
  },

  /**
   * Actualiza un cliente existente
   */
  update: async (id: string, clientData: Partial<Client>): Promise<ApiResponse<Client>> => {
    const { data: response } = await apiClient.put<ApiResponse<Client>>(
      `/clients/${id}`,
      clientData
    );

    return response;
  },

  /**
   * Desactiva un cliente
   */
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const { data: response } = await apiClient.delete<ApiResponse<null>>(`/clients/${id}`);

    return response;
  },
};
