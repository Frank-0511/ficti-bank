import { useQuery } from '@tanstack/react-query';
import { accountService } from '../services';

export const useAccounts = (clientCode?: string) => {
  return useQuery({
    queryKey: ['accounts', clientCode],
    queryFn: () => accountService.getAll(clientCode),
    select: (response) => response.data,
    enabled: Boolean(clientCode),
  });
};
