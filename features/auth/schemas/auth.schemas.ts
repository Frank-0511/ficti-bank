import { z } from 'zod';

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email es requerido' }).email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(1, { message: 'Contraseña es requerida' })
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

/**
 * Register form validation schema
 */
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: 'Nombre es requerido' })
      .min(2, { message: 'Nombre debe tener al menos 2 caracteres' }),
    lastName: z
      .string()
      .min(1, { message: 'Apellido es requerido' })
      .min(2, { message: 'Apellido debe tener al menos 2 caracteres' }),
    email: z
      .string()
      .min(1, { message: 'Email es requerido' })
      .email({ message: 'Email inválido' }),
    password: z
      .string()
      .min(1, { message: 'Contraseña es requerida' })
      .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
      }),
    confirmPassword: z.string().min(1, { message: 'Confirmar contraseña es requerido' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

/**
 * Forgot password form validation schema
 */
export const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: 'Email es requerido' }).email({ message: 'Email inválido' }),
});

// Export inferred types
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
