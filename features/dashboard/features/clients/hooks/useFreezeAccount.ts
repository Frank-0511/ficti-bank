import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { ApiResponseError, FreezeAccountData } from '@/lib/types';
import { accountService } from '../services';

export const useFreezeAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountData: FreezeAccountData) => accountService.freeze(accountData),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });

      notifications.show({
        title: response.message,
        message: `Cuenta ${response.data.accountNumber} embargada`,
        color: 'green',
        autoClose: 3000,
      });
    },

    onError: (error: ApiResponseError) => {
      notifications.show({
        title: 'Error al embargar cuenta',
        message: error.message || 'Ocurrió un error al embargar la cuenta',
        color: 'red',
        autoClose: 3000,
      });
    },
  });
};
