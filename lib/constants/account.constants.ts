export const ACCOUNT_TYPE = {
  SAVINGS: 'CA',
  CHECKING: 'CC',
  FIXED_TERM: 'PF',
} as const;

export const CURRENCY = {
  SOLES: 'SO',
  DOLLARS: 'DO',
} as const;

export const ACCOUNT_STATUS = {
  ACTIVE: 'A',
  INACTIVE: 'I',
  BLOCKED: 'B',
  CANCELLED: 'N',
} as const;

export const ACCOUNT_TYPE_LABELS = {
  [ACCOUNT_TYPE.SAVINGS]: 'Cuenta de Ahorros',
  [ACCOUNT_TYPE.CHECKING]: 'Cuenta Corriente',
  [ACCOUNT_TYPE.FIXED_TERM]: 'Cuenta a Plazo Fijo',
} as const;

export const CURRENCY_LABELS = {
  [CURRENCY.SOLES]: 'Soles',
  [CURRENCY.DOLLARS]: 'Dólares',
} as const;

export const CURRENCY_SYMBOLS = {
  [CURRENCY.SOLES]: 'S/',
  [CURRENCY.DOLLARS]: '$',
} as const;

export const ACCOUNT_STATUS_LABELS = {
  [ACCOUNT_STATUS.ACTIVE]: 'Activa',
  [ACCOUNT_STATUS.INACTIVE]: 'Inactiva',
  [ACCOUNT_STATUS.BLOCKED]: 'Bloqueada',
  [ACCOUNT_STATUS.CANCELLED]: 'Cancelada',
} as const;

export const ACCOUNT_TYPE_OPTIONS = [
  { value: ACCOUNT_TYPE.SAVINGS, label: ACCOUNT_TYPE_LABELS[ACCOUNT_TYPE.SAVINGS] },
  { value: ACCOUNT_TYPE.CHECKING, label: ACCOUNT_TYPE_LABELS[ACCOUNT_TYPE.CHECKING] },
  { value: ACCOUNT_TYPE.FIXED_TERM, label: ACCOUNT_TYPE_LABELS[ACCOUNT_TYPE.FIXED_TERM] },
] as const;

export const CURRENCY_OPTIONS = [
  {
    value: CURRENCY.SOLES,
    label: `${CURRENCY_LABELS[CURRENCY.SOLES]} (${CURRENCY_SYMBOLS[CURRENCY.SOLES]})`,
  },
  {
    value: CURRENCY.DOLLARS,
    label: `${CURRENCY_LABELS[CURRENCY.DOLLARS]} (${CURRENCY_SYMBOLS[CURRENCY.DOLLARS]})`,
  },
] as const;

export const EMBARGO_TYPE = {
  TOTAL: 'total',
  PARTIAL: 'partial',
} as const;
