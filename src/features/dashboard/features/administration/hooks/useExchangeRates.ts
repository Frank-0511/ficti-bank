import { useQuery } from '@tanstack/react-query';
import { exchangeRateService } from '../services/exchangeRate.service';

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ['exchangeRates'],
    queryFn: () => exchangeRateService.getAll(),
  });
};
