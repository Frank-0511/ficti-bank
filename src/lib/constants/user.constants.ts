export const USER_STATUS = {
  ACTIVE: 'A',
  INACTIVE: 'I',
} as const;

export const USER_STATUS_LABELS = {
  [USER_STATUS.ACTIVE]: 'Activo',
  [USER_STATUS.INACTIVE]: 'Inactivo',
} as const;
