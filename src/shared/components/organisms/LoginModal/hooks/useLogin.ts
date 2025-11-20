import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { authService } from '@/lib/services/auth.service';
import { useAuthStore } from '@/lib/store/auth.store';
import { ApiResponseError } from '@/lib/types/api.types';
import { LoginCredentials } from '@/lib/types/auth.types';

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
