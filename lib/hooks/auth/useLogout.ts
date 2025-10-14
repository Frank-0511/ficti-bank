import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useAuthStore } from '@/lib/store';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    queryClient.clear();

    notifications.show({
      id: 'auth-logout',
      title: 'Sesión cerrada',
      message: 'Has cerrado sesión correctamente',
      color: 'blue',
      autoClose: 3000,
      withCloseButton: true,
    });

    router.push('/');
  };

  return handleLogout;
};
