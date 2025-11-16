export const USER_ROLE = {
  EMPLOYEE: 'E',
  ADMIN: 'A',
} as const;

export const USER_ROLE_LABELS = {
  [USER_ROLE.EMPLOYEE]: 'Empleado',
  [USER_ROLE.ADMIN]: 'Administrador',
} as const;
