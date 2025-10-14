import { http, HttpResponse } from 'msw';
import { ENTITY_STATUS } from '../../constants';
import { LoginCredentials, LoginResponse } from '../../types';
import { USERS_STORAGE_KEY, UserWithPassword } from '../data/users.data';

const getUsers = (): UserWithPassword[] => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const credentials = (await request.json()) as LoginCredentials;
      const users = getUsers();
      const user = users.find((u) => u.email === credentials.email);

      if (!user) {
        return HttpResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
      }

      if (user.password !== credentials.password) {
        return HttpResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
      }

      if (user.status !== ENTITY_STATUS.ACTIVE) {
        return HttpResponse.json(
          { message: 'Usuario inactivo. Contacte al administrador.' },
          { status: 403 }
        );
      }

      const token = `mock-jwt-${user.id}-${Date.now()}`;
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

      const response: LoginResponse = {
        success: true,
        message: 'Login exitoso',
        data: {
          user: {
            id: user.id,
            code: user.code,
            username: user.username,
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.status,
          },
          token,
          expiresAt,
        },
      };

      return HttpResponse.json(response);
    } catch (error) {
      return HttpResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
  }),

  // Logout endpoint
  http.post('/api/auth/logout', async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return HttpResponse.json({
      message: 'Sesión cerrada exitosamente',
      success: true,
      data: null,
    });
  }),
];
