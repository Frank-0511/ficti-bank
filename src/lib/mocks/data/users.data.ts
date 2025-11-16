import { ENTITY_STATUS, USER_ROLE } from '../../constants';
import type { User } from '../../types';

export const USERS_STORAGE_KEY = 'T_Usuario';

// Extensión de User solo para mocks (incluye password)
export interface UserWithPassword extends User {
  password: string;
}

export const DEFAULT_USERS: UserWithPassword[] = [
  {
    id: '1',
    code: 'USU001',
    username: 'admin',
    email: 'admin@fictibank.com',
    password: 'Admin123',
    name: 'Administrador Principal',
    role: USER_ROLE.ADMIN,
    status: ENTITY_STATUS.ACTIVE,
  },
  {
    id: '2',
    code: 'USU002',
    username: 'empleado1',
    email: 'empleado@fictibank.com',
    password: 'Empleado123',
    name: 'Juan Pérez',
    role: USER_ROLE.EMPLOYEE,
    status: ENTITY_STATUS.ACTIVE,
  },
];
