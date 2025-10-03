/**
 * Account types, currencies and business rules constants
 */

export const ACCOUNT_TYPES = {
  SAVINGS: 'CA',
  CHECKING: 'CC',
  TERM_DEPOSIT: 'PF',
  AFP: 'AF',
} as const;

export const ACCOUNT_TYPE_LABELS = {
  [ACCOUNT_TYPES.SAVINGS]: 'Cuenta de Ahorros',
  [ACCOUNT_TYPES.CHECKING]: 'Cuenta Corriente',
  [ACCOUNT_TYPES.TERM_DEPOSIT]: 'Cuenta a Plazo Fijo',
  [ACCOUNT_TYPES.AFP]: 'Cuenta AFP',
} as const;

export const CURRENCIES = {
  SOLES: 'SO',
  DOLLARS: 'DO',
} as const;

export const CURRENCY_LABELS = {
  [CURRENCIES.SOLES]: 'Soles',
  [CURRENCIES.DOLLARS]: 'Dólares',
} as const;

export const CURRENCY_SYMBOLS = {
  [CURRENCIES.SOLES]: 'S/',
  [CURRENCIES.DOLLARS]: '$',
} as const;

export const ACCOUNT_VALIDATION = {
  MIN_OPENING_BALANCE: {
    [ACCOUNT_TYPES.SAVINGS]: 0,
    [ACCOUNT_TYPES.CHECKING]: 0,
    [ACCOUNT_TYPES.TERM_DEPOSIT]: 100,
    [ACCOUNT_TYPES.AFP]: 0,
  },
  MAX_INITIAL_BALANCE: 999999.99,
  MIN_OVERDRAFT_LIMIT: 0,
  MAX_OVERDRAFT_LIMIT: 10000,
} as const;

export const ACCOUNT_ERROR_MESSAGES = {
  CUSTOMER_CODE: {
    REQUIRED: 'Código de cliente es requerido',
    NOT_FOUND: 'Cliente no encontrado',
  },
  ACCOUNT_TYPE: {
    REQUIRED: 'Tipo de cuenta es requerido',
    INVALID: 'Tipo de cuenta no válido',
  },
  CURRENCY: {
    REQUIRED: 'Moneda es requerida',
    INVALID: 'Moneda no válida',
  },
  INITIAL_BALANCE: {
    INVALID: 'Monto inicial no válido',
    TOO_LOW: 'Monto inicial es menor al mínimo requerido',
    TOO_HIGH: 'Monto inicial excede el máximo permitido',
  },
  CLOSE: {
    NON_ZERO_BALANCE: 'No se puede cerrar una cuenta con saldo diferente a cero',
    ALREADY_CLOSED: 'La cuenta ya está cerrada',
    HAS_EMBARGO: 'No se puede cerrar una cuenta con embargo',
  },
  EMBARGO: {
    ALREADY_EMBARGOED: 'La cuenta ya tiene un embargo activo',
    INVALID_AMOUNT: 'Monto de embargo no válido',
    AMOUNT_EXCEEDS_BALANCE: 'El monto de embargo excede el saldo disponible',
  },
  DEACTIVATE: {
    ALREADY_INACTIVE: 'La cuenta ya está inactiva',
    HAS_BALANCE: 'No se puede inactivar una cuenta con saldo',
  },
} as const;
