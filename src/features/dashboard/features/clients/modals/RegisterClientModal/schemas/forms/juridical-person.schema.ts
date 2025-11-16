import { z } from 'zod';
import { ERROR_MESSAGES, FIELD_LENGTHS, REGEX_PATTERNS } from '../../constants';
import { createDniValidation } from '../../field-validations';

const rucValidation = z.string().superRefine((val, ctx) => {
  if (!val.trim()) {
    ctx.addIssue({
      code: 'custom',
      message: ERROR_MESSAGES.REQUIRED.RUC,
    });
    return;
  }
  if (val.length !== FIELD_LENGTHS.RUC) {
    ctx.addIssue({
      code: 'custom',
      message: ERROR_MESSAGES.FORMAT.RUC_LENGTH,
    });
    return;
  }
  if (!REGEX_PATTERNS.ONLY_DIGITS.test(val)) {
    ctx.addIssue({
      code: 'custom',
      message: ERROR_MESSAGES.FORMAT.RUC_NUMBERS_ONLY,
    });
  }
});

const businessNameValidation = z.string().superRefine((val, ctx) => {
  if (!val.trim()) {
    ctx.addIssue({
      code: 'custom',
      message: ERROR_MESSAGES.REQUIRED.BUSINESS_NAME,
    });
    return;
  }
  if (val.length < FIELD_LENGTHS.BUSINESS_NAME_MIN) {
    ctx.addIssue({
      code: 'custom',
      message: ERROR_MESSAGES.LENGTH.BUSINESS_NAME_MIN,
    });
  }
});

const legalRepresentativeValidation = z.string().superRefine((val, ctx) => {
  if (!val.trim()) {
    ctx.addIssue({
      code: 'custom',
      message: ERROR_MESSAGES.REQUIRED.LEGAL_REPRESENTATIVE,
    });
    return;
  }
  if (val.length < FIELD_LENGTHS.REPRESENTATIVE_NAME_MIN) {
    ctx.addIssue({
      code: 'custom',
      message: ERROR_MESSAGES.LENGTH.REPRESENTATIVE_NAME_MIN,
    });
  }
});

export const juridicalPersonSchema = z.object({
  businessName: businessNameValidation,
  ruc: rucValidation,
  legalRepresentative: legalRepresentativeValidation,
  representativeDni: createDniValidation(true),
});

export type JuridicalPersonFormData = z.infer<typeof juridicalPersonSchema>;
