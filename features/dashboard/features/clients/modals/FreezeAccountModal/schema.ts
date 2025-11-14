import z from 'zod';

export const freezeSchema = z
  .object({
    type: z.enum(['total', 'partial']),
    amount: z
      .union([
        z.number().min(0.01, 'El monto debe ser mayor a 0'),
        z.string().refine((val) => val === '', {
          message: 'El monto es requerido para embargo parcial',
        }),
        z.undefined(),
      ])
      .optional(),
  })
  .refine(
    (data) =>
      data.type === 'total' ||
      (data.type === 'partial' && typeof data.amount === 'number' && !isNaN(data.amount)),
    {
      message: 'El monto es requerido para embargo parcial',
      path: ['amount'],
    }
  );

export type FreezeFormValues = z.infer<typeof freezeSchema>;
