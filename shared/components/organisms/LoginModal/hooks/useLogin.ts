import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { authService } from '@/lib/services';
import { useAuthStore } from '@/lib/store';
import { ApiResponseError, LoginCredentials } from '@/lib/types';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),

    meta: {
      showProgressBar: true,
    },

    onSuccess: (response) => {
      setAuth(response.data.user, response.data.token);

      notifications.show({
        id: 'auth-success',
        title: response.message,
        message: `Bienvenido ${response.data.user.name}`,
        color: 'green',
        autoClose: 3000,
        withCloseButton: true,
      });
    },

    onError: (error: ApiResponseError) => {
      const errorMessage = error.message || 'Error de autenticación';

      notifications.show({
        id: 'auth-error',
        title: error.message,
        message: errorMessage,
        color: 'red',
        autoClose: 3000,
        withCloseButton: true,
      });
    },
  });
};
