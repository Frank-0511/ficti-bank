import { z } from 'zod';
import { createPasswordValidation } from '../../../../shared/validations';
import { ERROR_MESSAGES } from '../../constants';
import { requiredStringValidation } from '../../field-validations';

/**
 * Schema for security information (passwords)
 */
export const securityInfoSchema = z
  .object({
    password: createPasswordValidation(), // isLogin = false (registration)
    confirmPassword: requiredStringValidation(ERROR_MESSAGES.REQUIRED.CONFIRM_PASSWORD),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: ERROR_MESSAGES.BUSINESS.PASSWORDS_NO_MATCH,
        path: ['confirmPassword'],
      });
    }
  });

export type SecurityInfoFormData = z.infer<typeof securityInfoSchema>;
