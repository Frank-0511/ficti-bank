import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { DepositAccountData } from '@/lib/types/account.types';
import { ApiResponseError } from '@/lib/types/api.types';
import { accountService } from '../services/account.service';

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

    onError: (error: AxiosError<ApiResponseError>) => {
      notifications.show({
        title: 'Error al realizar depósito',
        message: error.response?.data.message || 'Ocurrió un error al realizar el depósito',
        color: 'red',
        autoClose: 3000,
      });
    },
  });
};
