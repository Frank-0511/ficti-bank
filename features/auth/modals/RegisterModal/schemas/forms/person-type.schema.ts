import { z } from 'zod';
import { ERROR_MESSAGES, PERSON_TYPE } from '../../constants';

/**
 * Schema for person type selection (natural or juridical person)
 */
export const personTypeSchema = z.object({
  personType: z
    .union([z.literal(PERSON_TYPE.NATURAL), z.literal(PERSON_TYPE.BUSINESS), z.literal('')])
    .refine((val) => val !== '', {
      message: ERROR_MESSAGES.REQUIRED.PERSON_TYPE,
    }),
});

export type PersonTypeFormData = z.infer<typeof personTypeSchema>;
