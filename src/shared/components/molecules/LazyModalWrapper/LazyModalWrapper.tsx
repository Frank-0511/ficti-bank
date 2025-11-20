// LazyModalWrapper.tsx
import { lazy, Suspense } from 'react';
import { Center, Loader } from '@mantine/core';

export function lazyModal(importFn: () => Promise<any>) {
  const Component = lazy(importFn);
  const Fallback = () => (
    <Center style={{ height: 320 }}>
      <Loader size="lg" />
    </Center>
  );
  return (props: any) => (
    <Suspense fallback={<Fallback />}>
      <Component {...props} />
    </Suspense>
  );
}
