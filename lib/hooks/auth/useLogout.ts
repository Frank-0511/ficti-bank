import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';
import { useAccountStore, useAuthStore } from '@/lib/store';

export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const clearAccounts = useAccountStore((state) => state.clearAccounts);

  const handleLogout = () => {
    logout();
    clearAccounts();

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
