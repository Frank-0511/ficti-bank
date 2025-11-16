import z from 'zod';
import { EMBARGO_TYPE } from '@/lib/constants/account.constants';

export const freezeSchema = z
  .object({
    type: z.enum([EMBARGO_TYPE.TOTAL, EMBARGO_TYPE.PARTIAL]),
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
      data.type === EMBARGO_TYPE.TOTAL ||
      (data.type === EMBARGO_TYPE.PARTIAL &&
        typeof data.amount === 'number' &&
        !isNaN(data.amount)),
    {
      message: 'El monto es requerido para embargo parcial',
      path: ['amount'],
    }
  );

export type FreezeFormValues = z.infer<typeof freezeSchema>;
