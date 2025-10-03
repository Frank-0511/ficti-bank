import { z } from 'zod';
import { createPasswordValidation, emailValidation } from '../../../shared/validations';

/**
 * Schema for login form validation
 */
export const loginSchema = z.object({
  email: emailValidation,
  password: createPasswordValidation(true), // isLogin = true
});

export type LoginFormValues = z.infer<typeof loginSchema>;
