import { z } from 'zod';
import { createPasswordValidation, emailValidation } from '@/shared/validations';

export const loginSchema = z.object({
  email: emailValidation,
  password: createPasswordValidation(true),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
