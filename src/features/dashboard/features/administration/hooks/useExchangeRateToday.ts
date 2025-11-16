import { useQuery } from '@tanstack/react-query';
import { exchangeRateService } from '../services';

export const useExchangeRateToday = () => {
  return useQuery({
    queryKey: ['exchangeRate', 'today'],
    queryFn: () => exchangeRateService.getToday(),
    refetchInterval: 60000, // Refetch cada minuto
  });
};
