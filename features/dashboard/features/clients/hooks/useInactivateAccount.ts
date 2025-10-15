import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inactivateAccount } from '@/lib/services';

export function useInactivateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inactivateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
}
