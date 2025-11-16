import { useQuery } from '@tanstack/react-query';
import { exchangeRateService } from '../services';

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ['exchangeRates'],
    queryFn: () => exchangeRateService.getAll(),
  });
};
