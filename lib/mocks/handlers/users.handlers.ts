import { http, HttpResponse } from 'msw';
import type { User } from '@/lib/types/auth.types';
import { DEFAULT_USERS, USERS_STORAGE_KEY, UserWithPassword } from '../data/users.data';

// Helper para obtener usuarios del localStorage
const getUsers = (): UserWithPassword[] => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_USERS;
};

// Helper para guardar usuarios en localStorage
const saveUsers = (users: UserWithPassword[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Helper para remover password de usuarios
const sanitizeUser = (user: UserWithPassword): User => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const usersHandlers = [
  // GET /api/users - Obtener todos los usuarios
  http.get('/api/users', () => {
    const users = getUsers();
    const sanitizedUsers = users.map(sanitizeUser);
    return HttpResponse.json({
      success: true,
      data: sanitizedUsers,
      message: 'Usuarios obtenidos exitosamente',
    });
  }),

  // PATCH /api/users/:id - Actualizar usuario
  http.patch('/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<User>;
    const users = getUsers();

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          message: 'Usuario no encontrado',
        },
        { status: 404 }
      );
    }

    // Actualizar usuario
    users[userIndex] = { ...users[userIndex], ...updates };
    saveUsers(users);

    return HttpResponse.json({
      success: true,
      data: sanitizeUser(users[userIndex]),
      message: 'Usuario actualizado exitosamente',
    });
  }),

  // DELETE /api/users/:id - Desactivar usuario (soft delete)
  http.delete('/api/users/:id', ({ params }) => {
    const { id } = params;
    const users = getUsers();

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          message: 'Usuario no encontrado',
        },
        { status: 404 }
      );
    }

    // Desactivar usuario (cambiar status a 'I')
    users[userIndex].status = 'I';
    saveUsers(users);

    return HttpResponse.json({
      success: true,
      data: sanitizeUser(users[userIndex]),
      message: 'Usuario desactivado exitosamente',
    });
  }),
];
