import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { ApiResponse, ApiResponseError } from '@/lib/types';
import { accountService } from '../services';

export const useCloseAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountNumber: string) => accountService.close(accountNumber),

    meta: {
      showProgressBar: true,
    },

    onSuccess: (response: ApiResponse<null>) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });

      notifications.show({
        title: response.message,
        message: 'La cuenta ha sido cerrada exitosamente',
        color: 'green',
        autoClose: 3000,
      });
    },

    onError: (error: ApiResponseError) => {
      notifications.show({
        title: 'Error al cerrar cuenta',
        message: error.message || 'Ocurrió un error al cerrar la cuenta',
        color: 'red',
        autoClose: 3000,
      });
    },
  });
};
