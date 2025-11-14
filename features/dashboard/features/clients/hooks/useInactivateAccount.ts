import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountService } from '../services';

export function useInactivateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountService.inactivate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
}
