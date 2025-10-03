/**
 * Customer queries - React Query hooks for customer operations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomerService } from '../../../services/customer';
import { useCustomerStore } from '../../../store/customer.store';
import { useUIStore } from '../../../store/ui.store';
import { CreateCustomerRequest, UpdateCustomerRequest } from '../../../types/customer.types';

// Query keys
export const customerKeys = {
  all: ['customers'] as const,
  lists: () => [...customerKeys.all, 'list'] as const,
  list: (filters: string) => [...customerKeys.lists(), { filters }] as const,
  details: () => [...customerKeys.all, 'detail'] as const,
  detail: (code: string) => [...customerKeys.details(), code] as const,
  search: (query: string) => [...customerKeys.all, 'search', query] as const,
};

// Get all customers
export const useCustomers = () => {
  const { setCustomers, setLoading, setError } = useCustomerStore();
  const { addNotification } = useUIStore();

  return useQuery({
    queryKey: customerKeys.lists(),
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await CustomerService.getCustomers();
        setCustomers(response.customers);
        setError(null);
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching customers';
        setError(errorMessage);
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get customer by code
export const useCustomer = (code: string) => {
  const { addNotification } = useUIStore();

  return useQuery({
    queryKey: customerKeys.detail(code),
    queryFn: async () => {
      try {
        const response = await CustomerService.getCustomerByCode(code);
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching customer';
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        throw error;
      }
    },
    enabled: !!code,
    staleTime: 5 * 60 * 1000,
  });
};

// Create customer mutation
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const { addCustomer } = useCustomerStore();
  const { addNotification, closeModal } = useUIStore();

  return useMutation({
    mutationFn: (data: CreateCustomerRequest) => CustomerService.createCustomer(data),
    onSuccess: (response) => {
      // Update store
      addCustomer(response.customer);

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });

      // Show success notification
      addNotification({
        type: 'success',
        title: 'Cliente creado',
        message: `Cliente ${response.customer.firstName} ${response.customer.lastName} creado exitosamente`,
      });

      // Close modal
      closeModal('createCustomer');
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Error creating customer';
      addNotification({
        type: 'error',
        title: 'Error al crear cliente',
        message: errorMessage,
      });
    },
  });
};

// Update customer mutation
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  const { updateCustomer } = useCustomerStore();
  const { addNotification, closeModal } = useUIStore();

  return useMutation({
    mutationFn: ({ code, data }: { code: string; data: UpdateCustomerRequest }) =>
      CustomerService.updateCustomer(code, data),
    onSuccess: (response, variables) => {
      // Update store
      updateCustomer(variables.code, response.customer);

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(variables.code) });

      // Show success notification
      addNotification({
        type: 'success',
        title: 'Cliente actualizado',
        message: `Cliente actualizado exitosamente`,
      });

      // Close modal
      closeModal('editCustomer');
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Error updating customer';
      addNotification({
        type: 'error',
        title: 'Error al actualizar cliente',
        message: errorMessage,
      });
    },
  });
};

// Delete customer mutation
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  const { removeCustomer } = useCustomerStore();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: (code: string) => CustomerService.deleteCustomer(code),
    onSuccess: (_, code) => {
      // Update store
      removeCustomer(code);

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });

      // Show success notification
      addNotification({
        type: 'success',
        title: 'Cliente eliminado',
        message: 'Cliente eliminado exitosamente',
      });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Error deleting customer';
      addNotification({
        type: 'error',
        title: 'Error al eliminar cliente',
        message: errorMessage,
      });
    },
  });
};

// Search customers
export const useSearchCustomers = (query: string) => {
  const { addNotification } = useUIStore();

  return useQuery({
    queryKey: customerKeys.search(query),
    queryFn: async () => {
      try {
        const response = await CustomerService.searchCustomers(query);
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error searching customers';
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        throw error;
      }
    },
    enabled: query.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
