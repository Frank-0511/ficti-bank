import { z } from 'zod';
import {
  contactInfoSchema,
  juridicalPersonSchema,
  naturalPersonSchema,
  personTypeSchema,
  securityInfoSchema,
} from '../forms';

export const completeRegistrationSchema = z.intersection(
  personTypeSchema,
  z.intersection(
    z.union([naturalPersonSchema, juridicalPersonSchema]),
    z.intersection(contactInfoSchema, securityInfoSchema)
  )
);

export type CompleteRegistrationFormData = z.infer<typeof completeRegistrationSchema>;
