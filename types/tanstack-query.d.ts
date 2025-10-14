import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: {
      showProgressBar?: boolean;
    };
    mutationMeta: {
      showProgressBar?: boolean;
    };
  }
}
