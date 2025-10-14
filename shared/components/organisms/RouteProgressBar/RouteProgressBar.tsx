import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

export function RouteProgressBar() {
  const router = useRouter();

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
    const handleStart = () => {
      NProgress.start();
    };

    const handleComplete = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);

  return null;
}
