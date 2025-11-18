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

      // --- Bloqueo por intentos fallidos ---
      const failKey = `LOGIN_FAIL_${credentials.email}`;
      const blockKey = `LOGIN_BLOCK_${credentials.email}`;
      const now = Date.now();
      const blockedUntil = localStorage.getItem(blockKey);
      if (blockedUntil && now < Number(blockedUntil)) {
        const seconds = Math.ceil((Number(blockedUntil) - now) / 1000);
        return HttpResponse.json(
          { message: `Usuario bloqueado. Intente en ${seconds} segundos.` },
          { status: 429 }
        );
      }

      if (!user) {
        // Sumar intento fallido
        const fails = Number(localStorage.getItem(failKey) || '0') + 1;
        localStorage.setItem(failKey, String(fails));
        if (fails >= 3) {
          localStorage.setItem(blockKey, String(now + 30_000));
          localStorage.setItem(failKey, '0');
          return HttpResponse.json(
            { message: 'Usuario bloqueado por 30 segundos tras 3 intentos fallidos.' },
            { status: 429 }
          );
        }
        return HttpResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
      }

      if (user.password !== credentials.password) {
        // Sumar intento fallido
        const fails = Number(localStorage.getItem(failKey) || '0') + 1;
        localStorage.setItem(failKey, String(fails));
        if (fails >= 3) {
          localStorage.setItem(blockKey, String(now + 30_000));
          localStorage.setItem(failKey, '0');
          return HttpResponse.json(
            { message: 'Usuario bloqueado por 30 segundos tras 3 intentos fallidos.' },
            { status: 429 }
          );
        }
        return HttpResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
      }

      // Si login exitoso, limpiar contadores
      localStorage.removeItem(failKey);
      localStorage.removeItem(blockKey);

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
