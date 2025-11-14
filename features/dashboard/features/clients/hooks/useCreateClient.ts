import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { ApiResponseError, Client } from '@/lib/types';
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
    onError: (error: AxiosError<ApiResponseError>) => {
      notifications.show({
        title: 'Error al registrar cliente',
        message: error.response?.data.message || 'No se pudo registrar el cliente',
        color: 'red',
      });
    },
  });
};
