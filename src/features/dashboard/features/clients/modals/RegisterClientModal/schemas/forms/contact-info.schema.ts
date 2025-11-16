import { z } from 'zod';
import { emailValidation } from '@/shared/validations';
import { ERROR_MESSAGES, FIELD_LENGTHS, REGEX_PATTERNS } from '../../constants';
import { requiredStringValidation } from '../../field-validations';

const addressValidation = z.string().superRefine((val, ctx) => {
  if (!val.trim()) {
    ctx.addIssue({
      code: 'custom',
      message: ERROR_MESSAGES.REQUIRED.ADDRESS,
    });
    return;
  }
  if (val.length < FIELD_LENGTHS.ADDRESS_MIN) {
    ctx.addIssue({
      code: 'custom',
      message: ERROR_MESSAGES.LENGTH.ADDRESS_MIN,
    });
  }
});

const mobileValidation = z.string().superRefine((val, ctx) => {
  if (!val.trim()) {
    ctx.addIssue({
      code: 'custom',
      message: ERROR_MESSAGES.REQUIRED.MOBILE,
    });
    return;
  }
  if (val.length !== FIELD_LENGTHS.MOBILE) {
    ctx.addIssue({
      code: 'custom',
      message: ERROR_MESSAGES.FORMAT.MOBILE_LENGTH,
    });
    return;
  }
  if (!REGEX_PATTERNS.MOBILE_FORMAT.test(val)) {
    ctx.addIssue({
      code: 'custom',
      message: ERROR_MESSAGES.FORMAT.MOBILE_FORMAT,
    });
  }
});

const optionalPhoneValidation = z
  .string()
  .optional()
  .refine((val) => !val || val.length >= FIELD_LENGTHS.PHONE_MIN, {
    message: ERROR_MESSAGES.FORMAT.PHONE_MIN_LENGTH,
  });

export const contactInfoSchema = z.object({
  address: addressValidation,
  department: requiredStringValidation(ERROR_MESSAGES.REQUIRED.DEPARTMENT),
  province: requiredStringValidation(ERROR_MESSAGES.REQUIRED.PROVINCE),
  district: requiredStringValidation(ERROR_MESSAGES.REQUIRED.DISTRICT),
  phone: optionalPhoneValidation,
  mobile: mobileValidation,
  email: emailValidation,
});

export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;
