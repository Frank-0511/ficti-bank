import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { ClientFilters } from '@/lib/types';
import { clientService } from '../services';

export const useClients = (filters?: ClientFilters) => {
  const query = useQuery({
    queryKey: ['clients', filters],
    queryFn: () => clientService.getAll(filters),
    select: (response) => response.data,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.isError) {
      notifications.show({
        title: 'Error al cargar clientes',
        message: query.error?.message || 'No se pudieron obtener los clientes',
        color: 'red',
      });
    }
  }, [query.isError, query.error]);

  return query;
};
