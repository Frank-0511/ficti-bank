import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { Client } from '@/lib/types';
import { clientService } from '../services';

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientData: Partial<Client>) => clientService.create(clientData),
    onSuccess: (response) => {
      notifications.show({
        title: 'Cliente registrado',
        message: response.message,
        color: 'green',
      });
      // Refrescar la lista de clientes
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error al registrar cliente',
        message: error?.message || 'No se pudo registrar el cliente',
        color: 'red',
      });
    },
  });
};
