import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountService } from '../services/account.service';

export function useInactivateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountService.inactivate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
}
