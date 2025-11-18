import { useQuery } from '@tanstack/react-query';
import { getDailyMovements } from '../services/dailyMovements.service';

export function useDailyMovements() {
  return useQuery({
    queryKey: ['dailyMovements'],
    queryFn: getDailyMovements,
  });
}
