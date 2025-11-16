import { z } from 'zod';

export const withdrawSchema = (max: number) =>
  z.object({
    amount: z
      .number()
      .superRefine((value, ctx) => {
        if (max <= 0) {
          ctx.addIssue({
            code: 'custom',
            message: 'No hay saldo en su cuenta',
          });
          return z.NEVER;
        }
        if (value < 0.01) {
          ctx.addIssue({
            code: 'too_small',
            minimum: 0.01,
            origin: 'number',
            message: 'El monto debe ser mayor a 0',
          });
          return z.NEVER;
        }
        if (value > max + 0.01) {
          ctx.addIssue({
            code: 'too_big',
            maximum: max,
            origin: 'number',
            message: `El monto no puede exceder ${max.toFixed(2)}`,
          });
          return z.NEVER;
        }
      })
      .optional(),
  });

export type WithdrawFormValues = z.infer<ReturnType<typeof withdrawSchema>>;
