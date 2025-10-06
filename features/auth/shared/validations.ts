import { z } from 'zod';

const SHARED_ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'Email es requerido',
  EMAIL_INVALID: 'Email inválido',
  PASSWORD_REQUIRED: 'Contraseña es requerida',
  PASSWORD_MIN_LENGTH: 'La contraseña debe tener al menos 8 caracteres',
  PASSWORD_STRENGTH:
    'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
} as const;

const SHARED_CONSTANTS = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_STRENGTH_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
} as const;

export const emailValidation = z
  .email({
    message: SHARED_ERROR_MESSAGES.EMAIL_INVALID,
  })
  .min(1, { message: SHARED_ERROR_MESSAGES.EMAIL_REQUIRED });

export const createPasswordValidation = (isLogin = false) => {
  return z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({
        code: 'custom',
        message: SHARED_ERROR_MESSAGES.PASSWORD_REQUIRED,
      });
      return;
    }
    if (val.length < SHARED_CONSTANTS.PASSWORD_MIN_LENGTH) {
      ctx.addIssue({
        code: 'custom',
        message: SHARED_ERROR_MESSAGES.PASSWORD_MIN_LENGTH,
      });
      return;
    }

    if (!isLogin && !SHARED_CONSTANTS.PASSWORD_STRENGTH_REGEX.test(val)) {
      ctx.addIssue({
        code: 'custom',
        message: SHARED_ERROR_MESSAGES.PASSWORD_STRENGTH,
      });
    }
  });
};
