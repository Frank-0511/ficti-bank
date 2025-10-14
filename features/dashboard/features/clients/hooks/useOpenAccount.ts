import { useMutation, useQueryClient } from '@tanstack/react-query';
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

    onError: (error: ApiResponseError) => {
      notifications.show({
        title: 'Error al crear cuenta',
        message: error.message || 'Ocurrió un error al crear la cuenta',
        color: 'red',
        autoClose: 3000,
      });
    },
  });
};
