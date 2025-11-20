import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { ApiResponseError } from '@/lib/types/api.types';
import { WithdrawAccountData } from '@/lib/types/account.types';
import { accountService } from '../services/account.service';

export const useWithdrawAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (withdrawData: WithdrawAccountData) => accountService.withdraw(withdrawData),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      notifications.show({
        title: response.message,
        message: `Retiro realizado en la cuenta ${response.data.accountNumber}`,
        color: 'green',
        autoClose: 3000,
      });
    },

    onError: (error: AxiosError<ApiResponseError>) => {
      notifications.show({
        title: 'Error al realizar retiro',
        message: error.response?.data.message || 'Ocurrió un error al realizar el retiro',
        color: 'red',
        autoClose: 3000,
      });
    },
  });
};
