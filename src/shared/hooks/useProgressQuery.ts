import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useMutationWithProgress<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(options: UseMutationOptions<TData, TError, TVariables, TContext>) {
  return useMutation({
    ...options,
    meta: {
      showProgressBar: true,
      ...options.meta,
    },
  });
}

export function useQueryWithProgress<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  return useQuery({
    ...options,
    meta: {
      showProgressBar: true,
      ...options.meta,
    },
  });
}
