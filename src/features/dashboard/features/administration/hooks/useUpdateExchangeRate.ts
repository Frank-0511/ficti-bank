import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { ApiResponseError } from '@/lib/types/api.types';
import { ExchangeRateData } from '@/lib/types/exchangeRate.types';
import { exchangeRateService } from '../services/exchangeRate.service';

export const useUpdateExchangeRate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ExchangeRateData) => exchangeRateService.update(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['exchangeRates'] });
      queryClient.invalidateQueries({ queryKey: ['exchangeRate', 'today'] });
      notifications.show({
        title: response.message,
        message: `Tipo de cambio actualizado: S/. ${response.data.rate.toFixed(2)}`,
        color: 'green',
        autoClose: 3000,
      });
    },
    onError: (error: AxiosError<ApiResponseError>) => {
      notifications.show({
        title: 'Error al actualizar tipo de cambio',
        message: error.response?.data.message || 'Ocurrió un error al actualizar el tipo de cambio',
        color: 'red',
        autoClose: 3000,
      });
    },
  });
};
