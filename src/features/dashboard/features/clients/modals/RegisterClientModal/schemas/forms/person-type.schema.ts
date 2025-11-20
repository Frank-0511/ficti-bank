import { z } from 'zod';
import { PERSON_TYPE } from '@/lib/constants/person.constants';
import { ERROR_MESSAGES } from '../../constants';

export const personTypeSchema = z.object({
  personType: z
    .union([z.literal(PERSON_TYPE.NATURAL), z.literal(PERSON_TYPE.JURIDICAL), z.literal('')])
    .refine((val) => val !== '', {
      message: ERROR_MESSAGES.REQUIRED.PERSON_TYPE,
    }),
});

export type PersonTypeFormData = z.infer<typeof personTypeSchema>;
