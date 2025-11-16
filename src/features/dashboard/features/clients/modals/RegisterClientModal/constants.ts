export const NAME_FIELD = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
} as const;

export const FIELD_LENGTHS = {
  DNI: 8,
  RUC: 11,
  MOBILE: 9,
  PASSWORD_MIN: 8,
  NAME_MIN: 2,
  BUSINESS_NAME_MIN: 5,
  REPRESENTATIVE_NAME_MIN: 5,
  ADDRESS_MIN: 10,
  PHONE_MIN: 7,
} as const;

export const REGEX_PATTERNS = {
  ONLY_DIGITS: /^\d+$/,
  MOBILE_FORMAT: /^9\d{8}$/,
  PASSWORD_STRENGTH: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
} as const;

export const ERROR_MESSAGES = {
  REQUIRED: {
    EMAIL: 'Email es requerido',
    PASSWORD: 'Contraseña es requerida',
    CONFIRM_PASSWORD: 'Confirmar contraseña es requerido',
    FIRST_NAME: 'Nombre es requerido',
    LAST_NAME: 'Apellido es requerido',
    DNI: 'DNI es requerido',
    BIRTH_DATE: 'Fecha de nacimiento es requerida',
    BUSINESS_NAME: 'Razón social es requerida',
    RUC: 'RUC es requerido',
    LEGAL_REPRESENTATIVE: 'Representante legal es requerido',
    REPRESENTATIVE_DNI: 'DNI del representante es requerido',
    ADDRESS: 'Dirección es requerida',
    DEPARTMENT: 'Departamento es requerido',
    PROVINCE: 'Provincia es requerida',
    DISTRICT: 'Distrito es requerido',
    MOBILE: 'Celular es requerido',
    PERSON_TYPE: 'Tipo de persona es requerido',
  },

  FORMAT: {
    EMAIL_INVALID: 'Email inválido',
    DNI_LENGTH: 'DNI debe tener exactamente 8 dígitos',
    DNI_NUMBERS_ONLY: 'DNI solo puede contener números',
    RUC_LENGTH: 'RUC debe tener exactamente 11 dígitos',
    RUC_NUMBERS_ONLY: 'RUC solo puede contener números',
    MOBILE_LENGTH: 'Celular debe tener exactamente 9 dígitos',
    MOBILE_FORMAT: 'Celular debe empezar con 9 y tener 9 dígitos',
    PHONE_MIN_LENGTH: 'Teléfono debe tener al menos 7 dígitos',
  },

  LENGTH: {
    FIRST_NAME_MIN: 'Nombre debe tener al menos 2 caracteres',
    LAST_NAME_MIN: 'Apellido debe tener al menos 2 caracteres',
    BUSINESS_NAME_MIN: 'Razón social debe tener al menos 5 caracteres',
    REPRESENTATIVE_NAME_MIN: 'Nombre del representante debe tener al menos 5 caracteres',
    ADDRESS_MIN: 'Dirección debe tener al menos 10 caracteres',
    PASSWORD_MIN: 'La contraseña debe tener al menos 8 caracteres',
  },

  BUSINESS: {
    PASSWORD_STRENGTH:
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
    PASSWORDS_NO_MATCH: 'Las contraseñas no coinciden',
    AGE_REQUIREMENT: 'Debes ser mayor de 18 años para registrarte',
  },
} as const;

export const AGE_REQUIREMENTS = {
  MIN_AGE: 18,
} as const;

// Datos de ubicación del Perú (ejemplo simplificado)
export const DEPARTAMENTOS = [
  { value: 'lima', label: 'Lima' },
  { value: 'arequipa', label: 'Arequipa' },
  { value: 'cusco', label: 'Cusco' },
  { value: 'trujillo', label: 'Trujillo' },
  { value: 'piura', label: 'Piura' },
  { value: 'chiclayo', label: 'Chiclayo' },
  { value: 'huancayo', label: 'Huancayo' },
  { value: 'iquitos', label: 'Iquitos' },
];

export const PROVINCIAS: Record<string, Array<{ value: string; label: string }>> = {
  lima: [
    { value: 'lima', label: 'Lima' },
    { value: 'callao', label: 'Callao' },
    { value: 'cañete', label: 'Cañete' },
    { value: 'huaral', label: 'Huaral' },
  ],
  arequipa: [
    { value: 'arequipa', label: 'Arequipa' },
    { value: 'camana', label: 'Camaná' },
    { value: 'caylloma', label: 'Caylloma' },
  ],
  // Agregar más provincias según necesidades
};

export const DISTRITOS: Record<string, Array<{ value: string; label: string }>> = {
  lima: [
    { value: 'miraflores', label: 'Miraflores' },
    { value: 'san-isidro', label: 'San Isidro' },
    { value: 'surco', label: 'Surco' },
    { value: 'la-molina', label: 'La Molina' },
    { value: 'san-borja', label: 'San Borja' },
    { value: 'pueblo-libre', label: 'Pueblo Libre' },
    { value: 'jesus-maria', label: 'Jesús María' },
    { value: 'lince', label: 'Lince' },
    { value: 'la-victoria', label: 'La Victoria' },
  ],
  callao: [
    { value: 'callao', label: 'Callao' },
    { value: 'bellavista', label: 'Bellavista' },
    { value: 'carmen-de-la-legua', label: 'Carmen de la Legua' },
  ],
  // Agregar más distritos según necesidades
};
