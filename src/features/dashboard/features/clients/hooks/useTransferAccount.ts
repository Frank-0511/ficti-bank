import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { ApiResponseError } from '@/lib/types/api.types';
import { TransferAccountData } from '@/lib/types/account.types';
import { accountService } from '../services/account.service';

export function useTransferAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransferAccountData) => accountService.transfer(data),
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      notifications.show({
        title: response.message,
        message: `Transferencia realizada a la cuenta ${response.data.accountNumber}`,
        color: 'green',
        autoClose: 3000,
      });
    },
    onError: (error: AxiosError<ApiResponseError>) => {
      notifications.show({
        title: 'Error al transferir',
        message: error.response?.data.message || 'Ocurrió un error al transferir',
        color: 'red',
        autoClose: 3000,
      });
    },
  });
}
