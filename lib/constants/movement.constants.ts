/**
 * Movement types and validation constants
 */

export const MOVEMENT_TYPES = {
  DEPOSIT: 'DP',
  WITHDRAWAL: 'RT',
  TRANSFER: 'TF',
  EMBARGO: 'EM',
  UNEMBARGO: 'DE',
} as const;

export const MOVEMENT_TYPE_LABELS = {
  [MOVEMENT_TYPES.DEPOSIT]: 'Depósito',
  [MOVEMENT_TYPES.WITHDRAWAL]: 'Retiro',
  [MOVEMENT_TYPES.TRANSFER]: 'Transferencia',
  [MOVEMENT_TYPES.EMBARGO]: 'Embargo',
  [MOVEMENT_TYPES.UNEMBARGO]: 'Desembargo',
} as const;

export const MOVEMENT_VALIDATION = {
  MIN_AMOUNT: 0.01,
  MAX_AMOUNT: 999999.99,
  LARGE_DEPOSIT_THRESHOLD: {
    SOLES: 2000,
    DOLLARS: 600, // Aproximado
  },
} as const;

export const MOVEMENT_ERROR_MESSAGES = {
  ACCOUNT_NUMBER: {
    REQUIRED: 'Número de cuenta es requerido',
    NOT_FOUND: 'Cuenta no encontrada',
    INACTIVE: 'La cuenta está inactiva',
    BLOCKED: 'La cuenta está bloqueada',
  },
  AMOUNT: {
    REQUIRED: 'Monto es requerido',
    INVALID: 'Monto no válido',
    TOO_LOW: 'El monto debe ser mayor a 0',
    TOO_HIGH: 'El monto excede el límite permitido',
    INSUFFICIENT_FUNDS: 'Fondos insuficientes',
    EXCEEDS_OVERDRAFT: 'El monto excede el límite de sobregiro',
  },
  LARGE_DEPOSIT: {
    AUTHORIZATION_REQUIRED: 'Depósitos mayores a S/ 2,000 requieren código de autorización',
    FUNDS_ORIGIN_REQUIRED: 'Debe especificar el origen de los fondos',
  },
  EMBARGO: {
    INSUFFICIENT_AVAILABLE: 'Fondos insuficientes debido a embargo',
  },
} as const;
