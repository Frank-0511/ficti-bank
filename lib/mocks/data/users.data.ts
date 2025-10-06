import { ENTITY_STATUS, USER_ROLE } from '../../constants';

export const USERS_STORAGE_KEY = 'T_Usuario';

export interface MockUser {
  id: string;
  code: string;
  username: string;
  email: string;
  password: string;
  name: string;
  role: typeof USER_ROLE.ADMIN | typeof USER_ROLE.EMPLOYEE;
  status: typeof ENTITY_STATUS.ACTIVE | typeof ENTITY_STATUS.INACTIVE;
}

export const DEFAULT_USERS: MockUser[] = [
  {
    id: '1',
    code: 'USU001',
    username: 'admin',
    email: 'admin@fictibank.com',
    password: 'admin123',
    name: 'Administrador Principal',
    role: USER_ROLE.ADMIN,
    status: ENTITY_STATUS.ACTIVE,
  },
  {
    id: '2',
    code: 'USU002',
    username: 'empleado1',
    email: 'empleado@fictibank.com',
    password: 'emp123',
    name: 'Juan Pérez',
    role: USER_ROLE.EMPLOYEE,
    status: ENTITY_STATUS.ACTIVE,
  },
];
