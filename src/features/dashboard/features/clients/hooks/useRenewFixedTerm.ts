import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { accountService } from '../services';

export function useRenewFixedTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: accountService.renewFixedTerm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      notifications.show({
        title: 'Renovación exitosa',
        message: 'La cuenta a plazo fijo ha sido renovada correctamente',
        color: 'green',
        autoClose: 3000,
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error al renovar',
        message: error.response?.data.message || 'Ocurrió un error al renovar la cuenta',
        color: 'red',
        autoClose: 3000,
      });
    },
  });
}
