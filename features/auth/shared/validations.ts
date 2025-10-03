import { z } from 'zod';

/**
 * Shared validation functions used across different auth modals
 */

// Error messages for shared validations
const SHARED_ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'Email es requerido',
  EMAIL_INVALID: 'Email inválido',
  PASSWORD_REQUIRED: 'Contraseña es requerida',
  PASSWORD_MIN_LENGTH: 'La contraseña debe tener al menos 8 caracteres',
  PASSWORD_STRENGTH:
    'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
} as const;

// Constants for shared validations
const SHARED_CONSTANTS = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_STRENGTH_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
} as const;

/**
 * Email validation - used in login, registration, and forgot password
 */
export const emailValidation = z
  .string()
  .min(1, { message: SHARED_ERROR_MESSAGES.EMAIL_REQUIRED })
  .email({ message: SHARED_ERROR_MESSAGES.EMAIL_INVALID });

/**
 * Password validation - used in login and registration
 * @param isLogin - If true, skips strength validation (for login forms)
 */
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
    // Only check password strength for registration, not login
    if (!isLogin && !SHARED_CONSTANTS.PASSWORD_STRENGTH_REGEX.test(val)) {
      ctx.addIssue({
        code: 'custom',
        message: SHARED_ERROR_MESSAGES.PASSWORD_STRENGTH,
      });
    }
  });
};
