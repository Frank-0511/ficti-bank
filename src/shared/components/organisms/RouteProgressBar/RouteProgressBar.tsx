import { useEffect } from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import NProgress from 'nprogress';
import { useLocation } from 'react-router-dom';

NProgress.configure({ showSpinner: false });

export function RouteProgressBar() {
  const location = useLocation();

  const isMutating = useIsMutating({
    predicate: (mutation) => mutation.options.meta?.showProgressBar === true,
  });

  const isFetching = useIsFetching({
    predicate: (query) => query.options.meta?.showProgressBar === true,
  });

  useEffect(() => {
    if (isMutating > 0 || isFetching > 0) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isMutating, isFetching]);

  useEffect(() => {
    NProgress.done();
  }, [location]);

  return null;
}
