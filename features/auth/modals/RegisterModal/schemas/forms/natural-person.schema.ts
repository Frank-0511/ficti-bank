import { z } from 'zod';
import { AGE_REQUIREMENTS, ERROR_MESSAGES, NAME_FIELD } from '../../constants';
import { createDniValidation, createNameValidation } from '../../field-validations';

/**
 * Schema for natural person basic information
 */

// Birth date validation (only used here)
const birthDateValidation = z
  .string()
  .nullable()
  .refine(
    (date) => {
      return date !== null && date !== '';
    },
    { message: ERROR_MESSAGES.REQUIRED.BIRTH_DATE }
  )
  .refine(
    (date) => {
      if (!date || date === '') {
        return true;
      }

      const birthDate = new Date(date);
      if (isNaN(birthDate.getTime())) {
        return false;
      }

      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= AGE_REQUIREMENTS.MIN_AGE;
      }

      return age >= AGE_REQUIREMENTS.MIN_AGE;
    },
    { message: ERROR_MESSAGES.BUSINESS.AGE_REQUIREMENT }
  );

export const naturalPersonSchema = z.object({
  firstName: createNameValidation(NAME_FIELD.FIRST_NAME),
  lastName: createNameValidation(NAME_FIELD.LAST_NAME),
  dni: createDniValidation(false),
  birthDate: birthDateValidation,
});

export type NaturalPersonFormData = z.infer<typeof naturalPersonSchema>;
