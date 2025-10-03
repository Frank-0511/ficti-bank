/**
 * Customer validation and business rules constants
 */

export const CUSTOMER_VALIDATION = {
  DNI: {
    LENGTH: 8,
    REGEX: /^\d{8}$/,
  },
  NAMES: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    REGEX: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
  },
  EMAIL: {
    MAX_LENGTH: 50,
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE: {
    LENGTH: 9,
    REGEX: /^\d{9}$/,
  },
  MOBILE: {
    LENGTH: 11,
    REGEX: /^\d{11}$/,
  },
  ADDRESS: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 100,
  },
} as const;

export const CUSTOMER_ERROR_MESSAGES = {
  DNI: {
    REQUIRED: 'DNI es requerido',
    INVALID_LENGTH: 'DNI debe tener exactamente 8 dígitos',
    INVALID_FORMAT: 'DNI debe contener solo números',
    ALREADY_EXISTS: 'Este DNI ya está registrado',
  },
  FIRST_NAME: {
    REQUIRED: 'Nombre es requerido',
    TOO_SHORT: 'Nombre debe tener al menos 2 caracteres',
    INVALID_FORMAT: 'Nombre solo puede contener letras',
  },
  LAST_NAME: {
    REQUIRED: 'Apellido es requerido',
    TOO_SHORT: 'Apellido debe tener al menos 2 caracteres',
    INVALID_FORMAT: 'Apellido solo puede contener letras',
  },
  EMAIL: {
    REQUIRED: 'Email es requerido',
    INVALID_FORMAT: 'Email no tiene un formato válido',
    ALREADY_EXISTS: 'Este email ya está registrado',
  },
  PHONE: {
    REQUIRED: 'Teléfono es requerido',
    INVALID_FORMAT: 'Teléfono debe tener exactamente 9 dígitos',
  },
  MOBILE: {
    REQUIRED: 'Celular es requerido',
    INVALID_FORMAT: 'Celular debe tener exactamente 11 dígitos',
  },
  ADDRESS: {
    REQUIRED: 'Dirección es requerida',
    TOO_SHORT: 'Dirección debe tener al menos 10 caracteres',
  },
  UBIGEO: {
    REQUIRED: 'Ubigeo es requerido',
  },
  BIRTH_DATE: {
    REQUIRED: 'Fecha de nacimiento es requerida',
    MIN_AGE: 'Debe ser mayor de 18 años',
  },
} as const;

export const MIN_AGE = 18;
