import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { ApiResponseError, DepositAccountData } from '@/lib/types';
import { accountService } from '../services';

export const useDepositAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (depositData: DepositAccountData) => accountService.deposit(depositData),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      notifications.show({
        title: response.message,
        message: `Depósito realizado en la cuenta ${response.data.accountNumber}`,
        color: 'green',
        autoClose: 3000,
      });
    },

    onError: (error: ApiResponseError) => {
      notifications.show({
        title: 'Error al realizar depósito',
        message: error.message || 'Ocurrió un error al realizar el depósito',
        color: 'red',
        autoClose: 3000,
      });
    },
  });
};
