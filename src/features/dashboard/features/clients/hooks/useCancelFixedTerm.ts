import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { accountService } from '../services/account.service';

export function useCancelFixedTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: accountService.cancelFixedTerm,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      notifications.show({
        title: 'Cuenta cancelada',
        message: `Interés generado: S/ ${response.data.accruedInterest.toFixed(2)}. Saldo final: S/ ${response.data.finalBalance.toFixed(2)}`,
        color: 'green',
        autoClose: 5000,
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error al cancelar',
        message: error.response?.data.message || 'Ocurrió un error al cancelar la cuenta',
        color: 'red',
        autoClose: 3000,
      });
    },
  });
}
