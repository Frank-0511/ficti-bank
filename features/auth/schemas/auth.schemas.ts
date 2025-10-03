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
 * Person type selection schema
 */
export const personTypeSchema = z.object({
  personType: z.enum(['natural', 'juridica'], {
    message: 'Tipo de persona es requerido',
  }),
});

/**
 * Basic info schema for natural person
 */
export const naturalPersonBasicSchema = z.object({
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
});

/**
 * Basic info schema for legal person
 */
export const juridicalPersonBasicSchema = z.object({
  businessName: z
    .string()
    .min(1, { message: 'Razón social es requerida' })
    .min(5, { message: 'Razón social debe tener al menos 5 caracteres' }),
  ruc: z
    .string()
    .min(1, { message: 'RUC es requerido' })
    .length(11, { message: 'RUC debe tener exactamente 11 dígitos' })
    .regex(/^\d+$/, { message: 'RUC solo puede contener números' }),
  legalRepresentative: z
    .string()
    .min(1, { message: 'Representante legal es requerido' })
    .min(5, { message: 'Nombre del representante debe tener al menos 5 caracteres' }),
  representativeDni: z
    .string()
    .min(1, { message: 'DNI del representante es requerido' })
    .length(8, { message: 'DNI debe tener exactamente 8 dígitos' })
    .regex(/^\d+$/, { message: 'DNI solo puede contener números' }),
});

/**
 * Contact and location info schema (common for both person types)
 */
export const contactInfoSchema = z.object({
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
  email: z.string().min(1, { message: 'Email es requerido' }).email({ message: 'Email inválido' }),
});

/**
 * Security info schema (common for both person types)
 */
export const securityInfoSchema = z
  .object({
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
 * Complete register schemas for each person type
 */
export const naturalPersonRegisterSchema = personTypeSchema
  .merge(naturalPersonBasicSchema)
  .merge(contactInfoSchema)
  .merge(securityInfoSchema);

export const juridicalPersonRegisterSchema = personTypeSchema
  .merge(juridicalPersonBasicSchema)
  .merge(contactInfoSchema)
  .merge(securityInfoSchema);

/**
 * Legacy register schema (for backwards compatibility)
 * @deprecated Use naturalPersonRegisterSchema instead
 */
export const registerSchema = naturalPersonRegisterSchema.omit({ personType: true }).extend({
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

// Export new types for multi-step registration
export type PersonType = 'natural' | 'juridica';
export type PersonTypeFormValues = z.infer<typeof personTypeSchema>;
export type NaturalPersonBasicFormValues = z.infer<typeof naturalPersonBasicSchema>;
export type JuridicalPersonBasicFormValues = z.infer<typeof juridicalPersonBasicSchema>;
export type ContactInfoFormValues = z.infer<typeof contactInfoSchema>;
export type SecurityInfoFormValues = z.infer<typeof securityInfoSchema>;
export type NaturalPersonRegisterFormValues = z.infer<typeof naturalPersonRegisterSchema>;
export type JuridicalPersonRegisterFormValues = z.infer<typeof juridicalPersonRegisterSchema>;
