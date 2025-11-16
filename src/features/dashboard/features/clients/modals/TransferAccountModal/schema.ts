import z from 'zod';

export const transferSchema = z.object({
  amount: z.number().min(0.01, 'El monto debe ser mayor a 0'),
  destinationAccount: z.string().min(1, 'La cuenta destino es obligatoria'),
});

export type TransferFormValues = z.infer<typeof transferSchema>;
