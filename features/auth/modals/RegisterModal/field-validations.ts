import { z } from 'zod';
import { ERROR_MESSAGES, FIELD_LENGTHS, NAME_FIELD, REGEX_PATTERNS } from './constants';

export const createNameValidation = (fieldName: (typeof NAME_FIELD)[keyof typeof NAME_FIELD]) => {
  const requiredMessage =
    fieldName === NAME_FIELD.FIRST_NAME
      ? ERROR_MESSAGES.REQUIRED.FIRST_NAME
      : ERROR_MESSAGES.REQUIRED.LAST_NAME;
  const lengthMessage =
    fieldName === NAME_FIELD.FIRST_NAME
      ? ERROR_MESSAGES.LENGTH.FIRST_NAME_MIN
      : ERROR_MESSAGES.LENGTH.LAST_NAME_MIN;

  return z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({
        code: 'custom',
        message: requiredMessage,
      });
      return;
    }
    if (val.length < FIELD_LENGTHS.NAME_MIN) {
      ctx.addIssue({
        code: 'custom',
        message: lengthMessage,
      });
    }
  });
};

export const createDniValidation = (isRepresentative = false) => {
  const requiredMessage = isRepresentative
    ? ERROR_MESSAGES.REQUIRED.REPRESENTATIVE_DNI
    : ERROR_MESSAGES.REQUIRED.DNI;

  return z.string().superRefine((val, ctx) => {
    if (!val.trim()) {
      ctx.addIssue({
        code: 'custom',
        message: requiredMessage,
      });
      return;
    }
    if (val.length !== FIELD_LENGTHS.DNI) {
      ctx.addIssue({
        code: 'custom',
        message: ERROR_MESSAGES.FORMAT.DNI_LENGTH,
      });
      return;
    }
    if (!REGEX_PATTERNS.ONLY_DIGITS.test(val)) {
      ctx.addIssue({
        code: 'custom',
        message: ERROR_MESSAGES.FORMAT.DNI_NUMBERS_ONLY,
      });
    }
  });
};

export const requiredStringValidation = (message: string) => z.string().min(1, { message });
