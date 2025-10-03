/**
 * Account queries - React Query hooks for account operations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AccountOperationsService, AccountService } from '../../../services/account';
import { useAccountStore } from '../../../store/account.store';
import { useUIStore } from '../../../store/ui.store';
import {
  CloseAccountRequest,
  CreateAccountRequest,
  DeactivateAccountRequest,
  EmbargoAccountRequest,
} from '../../../types/account.types';

// Query keys
export const accountKeys = {
  all: ['accounts'] as const,
  lists: () => [...accountKeys.all, 'list'] as const,
  list: (filters: string) => [...accountKeys.lists(), { filters }] as const,
  details: () => [...accountKeys.all, 'detail'] as const,
  detail: (accountNumber: string) => [...accountKeys.details(), accountNumber] as const,
  byCustomer: (customerCode: string) => [...accountKeys.all, 'customer', customerCode] as const,
  byType: (accountType: string) => [...accountKeys.all, 'type', accountType] as const,
};

// Get all accounts
export const useAccounts = () => {
  const { setAccounts, setLoading, setError } = useAccountStore();
  const { addNotification } = useUIStore();

  return useQuery({
    queryKey: accountKeys.lists(),
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await AccountService.getAccounts();
        setAccounts(response.accounts);
        setError(null);
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching accounts';
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
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

// Get account by number
export const useAccount = (accountNumber: string) => {
  const { addNotification } = useUIStore();

  return useQuery({
    queryKey: accountKeys.detail(accountNumber),
    queryFn: async () => {
      try {
        const response = await AccountService.getAccountByNumber(accountNumber);
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching account';
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        throw error;
      }
    },
    enabled: !!accountNumber,
    staleTime: 3 * 60 * 1000,
  });
};

// Get accounts by customer
export const useAccountsByCustomer = (customerCode: string) => {
  const { addNotification } = useUIStore();

  return useQuery({
    queryKey: accountKeys.byCustomer(customerCode),
    queryFn: async () => {
      try {
        const response = await AccountService.getAccountsByCustomer(customerCode);
        return response;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Error fetching customer accounts';
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        throw error;
      }
    },
    enabled: !!customerCode,
    staleTime: 3 * 60 * 1000,
  });
};

// Get accounts by type
export const useAccountsByType = (accountType: string) => {
  const { addNotification } = useUIStore();

  return useQuery({
    queryKey: accountKeys.byType(accountType),
    queryFn: async () => {
      try {
        const response = await AccountService.getAccountsByType(accountType);
        return response;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Error fetching accounts by type';
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        throw error;
      }
    },
    enabled: !!accountType,
    staleTime: 5 * 60 * 1000,
  });
};

// Create account mutation
export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  const { addAccount } = useAccountStore();
  const { addNotification, closeModal } = useUIStore();

  return useMutation({
    mutationFn: (data: CreateAccountRequest) => AccountService.createAccount(data),
    onSuccess: (response, variables) => {
      // Update store
      addAccount(response.account);

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
      queryClient.invalidateQueries({ queryKey: accountKeys.byCustomer(variables.customerCode) });

      // Show success notification
      addNotification({
        type: 'success',
        title: 'Cuenta creada',
        message: `Cuenta ${response.account.number} creada exitosamente`,
      });

      // Close modal
      closeModal('createAccount');
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Error creating account';
      addNotification({
        type: 'error',
        title: 'Error al crear cuenta',
        message: errorMessage,
      });
    },
  });
};

// Close account mutation
export const useCloseAccount = () => {
  const queryClient = useQueryClient();
  const { updateAccount } = useAccountStore();
  const { addNotification, closeModal } = useUIStore();

  return useMutation({
    mutationFn: ({ accountNumber, data }: { accountNumber: string; data?: CloseAccountRequest }) =>
      AccountOperationsService.closeAccount(accountNumber, data),
    onSuccess: (response, variables) => {
      // Update store
      updateAccount(variables.accountNumber, response.account);

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
      queryClient.invalidateQueries({ queryKey: accountKeys.detail(variables.accountNumber) });

      // Show success notification
      addNotification({
        type: 'success',
        title: 'Cuenta cerrada',
        message: `Cuenta ${variables.accountNumber} cerrada exitosamente`,
      });

      // Close modal
      closeModal('closeAccount');
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Error closing account';
      addNotification({
        type: 'error',
        title: 'Error al cerrar cuenta',
        message: errorMessage,
      });
    },
  });
};

// Embargo account mutation
export const useEmbargoAccount = () => {
  const queryClient = useQueryClient();
  const { updateAccount } = useAccountStore();
  const { addNotification, closeModal } = useUIStore();

  return useMutation({
    mutationFn: ({ accountNumber, data }: { accountNumber: string; data: EmbargoAccountRequest }) =>
      AccountOperationsService.embargoAccount(accountNumber, data),
    onSuccess: (response, variables) => {
      // Update store
      updateAccount(variables.accountNumber, response.account);

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
      queryClient.invalidateQueries({ queryKey: accountKeys.detail(variables.accountNumber) });

      // Show success notification
      addNotification({
        type: 'warning',
        title: 'Embargo aplicado',
        message: `Embargo ${variables.data.embargoType} aplicado a cuenta ${variables.accountNumber}`,
      });

      // Close modal
      closeModal('embargoAccount');
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Error applying embargo';
      addNotification({
        type: 'error',
        title: 'Error al aplicar embargo',
        message: errorMessage,
      });
    },
  });
};

// Remove embargo mutation
export const useRemoveEmbargo = () => {
  const queryClient = useQueryClient();
  const { updateAccount } = useAccountStore();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: (accountNumber: string) => AccountOperationsService.removeEmbargo(accountNumber),
    onSuccess: (response, accountNumber) => {
      // Update store
      updateAccount(accountNumber, response.account);

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
      queryClient.invalidateQueries({ queryKey: accountKeys.detail(accountNumber) });

      // Show success notification
      addNotification({
        type: 'success',
        title: 'Embargo removido',
        message: `Embargo removido de cuenta ${accountNumber}`,
      });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Error removing embargo';
      addNotification({
        type: 'error',
        title: 'Error al remover embargo',
        message: errorMessage,
      });
    },
  });
};

// Deactivate account mutation
export const useDeactivateAccount = () => {
  const queryClient = useQueryClient();
  const { updateAccount } = useAccountStore();
  const { addNotification, closeModal } = useUIStore();

  return useMutation({
    mutationFn: ({
      accountNumber,
      data,
    }: {
      accountNumber: string;
      data: DeactivateAccountRequest;
    }) => AccountOperationsService.deactivateAccount(accountNumber, data),
    onSuccess: (response, variables) => {
      // Update store
      updateAccount(variables.accountNumber, response.account);

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
      queryClient.invalidateQueries({ queryKey: accountKeys.detail(variables.accountNumber) });

      // Show success notification
      addNotification({
        type: 'info',
        title: 'Cuenta inactivada',
        message: `Cuenta ${variables.accountNumber} inactivada exitosamente`,
      });

      // Close modal
      closeModal('deactivateAccount');
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'Error deactivating account';
      addNotification({
        type: 'error',
        title: 'Error al inactivar cuenta',
        message: errorMessage,
      });
    },
  });
};
