import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { ApiResponseError, OpenAccountData } from '@/lib/types';
import { accountService } from '../services';

export const useOpenAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountData: OpenAccountData) => accountService.create(accountData),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });

      notifications.show({
        title: response.message,
        message: `Cuenta ${response.data.accountNumber} creada exitosamente`,
        color: 'green',
        autoClose: 3000,
      });
    },

    onError: (error: AxiosError<ApiResponseError>) => {
      notifications.show({
        title: 'Error al crear cuenta',
        message: error.response?.data.message || 'Ocurrió un error al crear la cuenta',
        color: 'red',
        autoClose: 3000,
      });
    },
  });
};
