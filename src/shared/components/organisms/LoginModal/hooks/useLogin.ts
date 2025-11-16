import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
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

    onError: (error: AxiosError<ApiResponseError>) => {
      notifications.show({
        id: 'auth-error',
        title: 'Error de autenticación',
        message: error.response?.data.message || 'Ocurrió un error al iniciar sesión',
        color: 'red',
        autoClose: 3000,
        withCloseButton: true,
      });
    },
  });
};
