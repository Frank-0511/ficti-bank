import z from 'zod';

export const depositSchema = z
  .object({
    amount: z.number().min(0.01, 'El monto debe ser mayor a 0'),
    authKey: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.amount > 2000) {
      if (!data.authKey || data.authKey.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['authKey'],
          message: 'La clave de autorización es obligatoria para montos mayores a S/2000',
        });
      }
    }
  });

export type DepositFormValues = z.infer<typeof depositSchema>;
