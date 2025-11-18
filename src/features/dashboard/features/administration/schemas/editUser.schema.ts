import { z } from 'zod';

export const editUserSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  username: z.string().min(1, 'El usuario es requerido'),
  email: z.string().min(1, 'El correo es requerido').email('Correo inválido'),
  role: z.string().min(1, 'El rol es requerido'),
  status: z.string().min(1, 'El estado es requerido'),
});

export type EditUserFormValues = z.infer<typeof editUserSchema>;
