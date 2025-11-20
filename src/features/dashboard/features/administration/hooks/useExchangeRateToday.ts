import { useQuery } from '@tanstack/react-query';
import { exchangeRateService } from '../services/exchangeRate.service';

export const useExchangeRateToday = () => {
  return useQuery({
    queryKey: ['exchangeRate', 'today'],
    queryFn: () => exchangeRateService.getToday(),
    refetchInterval: 60000, // Refetch cada minuto
  });
};
