import { ComponentType, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import { useAuthStore } from '../store/auth.store';

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
      setIsHydrated(true);
    }, []);

    useEffect(() => {
      if (isHydrated && !isAuthenticated) {
        navigate('/', { replace: true });
      }
    }, [isAuthenticated, navigate, isHydrated]);

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
