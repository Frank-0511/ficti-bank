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
    name: 'Carlos Administrador',
    role: USER_ROLE.ADMIN,
    status: ENTITY_STATUS.ACTIVE,
  },
  {
    id: '2',
    code: 'USU002',
    username: 'empleado1',
    email: 'empleado1@fictibank.com',
    password: 'Empleado123',
    name: 'María García',
    role: USER_ROLE.EMPLOYEE,
    status: ENTITY_STATUS.ACTIVE,
  },
  {
    id: '3',
    code: 'USU003',
    username: 'empleado2',
    email: 'empleado2@fictibank.com',
    password: 'Empleado123',
    name: 'Juan Pérez',
    role: USER_ROLE.EMPLOYEE,
    status: ENTITY_STATUS.ACTIVE,
  },
  {
    id: '4',
    code: 'USU004',
    username: 'empleado3',
    email: 'empleado3@fictibank.com',
    password: 'Empleado123',
    name: 'Ana López',
    role: USER_ROLE.EMPLOYEE,
    status: ENTITY_STATUS.ACTIVE,
  },
  {
    id: '5',
    code: 'USU005',
    username: 'empleado4',
    email: 'empleado4@fictibank.com',
    password: 'Empleado123',
    name: 'Luis Martínez',
    role: USER_ROLE.EMPLOYEE,
    status: ENTITY_STATUS.INACTIVE,
  },
  {
    id: '6',
    code: 'USU006',
    username: 'empleado5',
    email: 'empleado5@fictibank.com',
    password: 'Empleado123',
    name: 'Sofia Rodríguez',
    role: USER_ROLE.EMPLOYEE,
    status: ENTITY_STATUS.ACTIVE,
  },
];
