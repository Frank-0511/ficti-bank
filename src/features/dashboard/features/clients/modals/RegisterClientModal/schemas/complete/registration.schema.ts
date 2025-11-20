import { z } from 'zod';
import { contactInfoSchema } from '../forms/contact-info.schema';
import { juridicalPersonSchema } from '../forms/juridical-person.schema';
import { naturalPersonSchema } from '../forms/natural-person.schema';
import { personTypeSchema } from '../forms/person-type.schema';
import { securityInfoSchema } from '../forms/security-info.schema';

export const completeRegistrationSchema = z.intersection(
  personTypeSchema,
  z.intersection(
    z.union([naturalPersonSchema, juridicalPersonSchema]),
    z.intersection(contactInfoSchema, securityInfoSchema)
  )
);

export type CompleteRegistrationFormData = z.infer<typeof completeRegistrationSchema>;
