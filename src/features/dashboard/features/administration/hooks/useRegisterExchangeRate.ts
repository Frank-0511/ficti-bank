import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { ApiResponseError } from '@/lib/types/api.types';
import { ExchangeRateData } from '@/lib/types/exchangeRate.types';
import { exchangeRateService } from '../services/exchangeRate.service';

export const useRegisterExchangeRate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ExchangeRateData) => exchangeRateService.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['exchangeRates'] });
      queryClient.invalidateQueries({ queryKey: ['exchangeRate', 'today'] });
      notifications.show({
        title: response.message,
        message: `Tipo de cambio registrado: S/. ${response.data.rate.toFixed(2)}`,
        color: 'green',
        autoClose: 3000,
      });
    },
    onError: (error: AxiosError<ApiResponseError>) => {
      notifications.show({
        title: 'Error al registrar tipo de cambio',
        message: error.response?.data.message || 'Ocurrió un error al registrar el tipo de cambio',
        color: 'red',
        autoClose: 3000,
      });
    },
  });
};
