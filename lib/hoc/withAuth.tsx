import { ComponentType, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Center, Loader } from '@mantine/core';
import { useAuthStore } from '../store';

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
      setIsHydrated(true);
    }, []);

    useEffect(() => {
      if (isHydrated && !isAuthenticated) {
        router.replace('/');
      }
    }, [isAuthenticated, router, isHydrated]);

    if (!isHydrated || !isAuthenticated) {
      return (
        <Center h="100vh">
          <Loader size="lg" />
        </Center>
      );
    }

    return <Component {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

  return AuthenticatedComponent;
};
