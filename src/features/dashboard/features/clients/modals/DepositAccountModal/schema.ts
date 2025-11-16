import z from 'zod';

export const depositSchema = z.object({
  amount: z.number().min(0.01, 'El monto debe ser mayor a 0').optional(),
});

export type DepositFormValues = z.infer<typeof depositSchema>;
