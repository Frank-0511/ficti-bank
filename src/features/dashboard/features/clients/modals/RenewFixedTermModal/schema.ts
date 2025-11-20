import { z } from 'zod';

const VALIDATION_MESSAGES = {
  TERM_REQUIRED: 'El plazo es obligatorio',
  TERM_POSITIVE: 'El plazo debe ser mayor a 0',
  TERM_MAX: 'El plazo máximo es de 120 meses',
  MONTHLY_INTEREST_REQUIRED: 'El interés mensual es obligatorio',
  MONTHLY_INTEREST_POSITIVE: 'El interés debe ser mayor a 0',
  MONTHLY_INTEREST_MAX: 'El interés mensual máximo es de 15%',
};

export const renewFixedTermSchema = z.object({
  term: z
    .number({
      error: VALIDATION_MESSAGES.TERM_REQUIRED,
    })
    .positive(VALIDATION_MESSAGES.TERM_POSITIVE)
    .max(120, VALIDATION_MESSAGES.TERM_MAX),
  monthlyInterest: z
    .number({
      error: VALIDATION_MESSAGES.MONTHLY_INTEREST_REQUIRED,
    })
    .positive(VALIDATION_MESSAGES.MONTHLY_INTEREST_POSITIVE)
    .max(15, VALIDATION_MESSAGES.MONTHLY_INTEREST_MAX),
});

export type RenewFixedTermFormValues = z.infer<typeof renewFixedTermSchema>;
