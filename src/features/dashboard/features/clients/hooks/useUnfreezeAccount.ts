import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { ApiResponseError } from '@/lib/types';
import { accountService } from '../services';

export const useUnfreezeAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountNumber: string) => accountService.unfreeze(accountNumber),
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      notifications.show({
        title: response.message,
        message: `Cuenta ${response.data.accountNumber} desembargada`,
        color: 'green',
        autoClose: 3000,
      });
    },
    onError: (error: AxiosError<ApiResponseError>) => {
      notifications.show({
        title: 'Error al desembargar cuenta',
        message: error.response?.data.message || 'Ocurrió un error al desembargar la cuenta',
        color: 'red',
        autoClose: 3000,
      });
    },
  });
};
