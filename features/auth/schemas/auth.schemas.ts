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
    dni: z
      .string()
      .min(1, { message: 'DNI es requerido' })
      .length(8, { message: 'DNI debe tener exactamente 8 dígitos' })
      .regex(/^\d+$/, { message: 'DNI solo puede contener números' }),
    birthDate: z.string().min(1, { message: 'Fecha de nacimiento es requerida' }),
    address: z
      .string()
      .min(1, { message: 'Dirección es requerida' })
      .min(10, { message: 'Dirección debe tener al menos 10 caracteres' }),
    department: z.string().min(1, { message: 'Departamento es requerido' }),
    province: z.string().min(1, { message: 'Provincia es requerida' }),
    district: z.string().min(1, { message: 'Distrito es requerido' }),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 7, {
        message: 'Teléfono debe tener al menos 7 dígitos',
      }),
    mobile: z
      .string()
      .min(1, { message: 'Celular es requerido' })
      .length(9, { message: 'Celular debe tener exactamente 9 dígitos' })
      .regex(/^9\d{8}$/, { message: 'Celular debe empezar con 9 y tener 9 dígitos' }),
    email: z
      .string()
      .min(1, { message: 'Email es requerido' })
      .email({ message: 'Email inválido' }),
    password: z
      .string()
      .min(1, { message: 'Contraseña es requerida' })
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
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
