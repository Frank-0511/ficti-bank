import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';
import { useAuthStore } from '@/lib/store';

export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();

    notifications.show({
      id: 'auth-logout',
      title: 'Sesión cerrada',
      message: 'Has cerrado sesión correctamente',
      color: 'blue',
      autoClose: 3000, // Cierra automáticamente después de 3 segundos (default es 4000)
      withCloseButton: true, // Permite cerrar manualmente
    });

    router.push('/');
  };

  return handleLogout;
};
