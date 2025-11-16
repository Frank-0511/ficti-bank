import { z } from 'zod';
import { ACCOUNT_TYPE, CURRENCY } from '@/lib/constants/account.constants';

const ERROR_MESSAGES = {
  REQUIRED: {
    ACCOUNT_TYPE: 'Selecciona un tipo de cuenta',
    CURRENCY: 'Selecciona una moneda',
    INITIAL_BALANCE: 'El monto inicial es obligatorio para cuentas a plazo fijo',
    TERM: 'El plazo es obligatorio para cuentas a plazo fijo',
    MONTHLY_INTEREST: 'El interés mensual es obligatorio para cuentas a plazo fijo',
  },
  BUSINESS: {
    INITIAL_BALANCE_POSITIVE: 'El monto inicial debe ser mayor a 0',
    TERM_POSITIVE: 'El plazo debe ser mayor a 0',
    TERM_MAX: 'El plazo máximo es de 120 meses',
    MONTHLY_INTEREST_POSITIVE: 'El interés mensual debe ser mayor a 0',
    MONTHLY_INTEREST_MAX: 'El interés mensual no puede ser mayor a 100%',
    OVERDRAFT_POSITIVE: 'El límite de sobregiro debe ser mayor o igual a 0',
  },
} as const;

const initialBalanceValidation = z
  .number()
  .optional()
  .superRefine((val, ctx) => {
    const accountType = (ctx as any).parent?.accountType;

    if (accountType === ACCOUNT_TYPE.FIXED_TERM) {
      if (val === undefined || val === null) {
        ctx.addIssue({
          code: 'custom',
          message: ERROR_MESSAGES.REQUIRED.INITIAL_BALANCE,
        });
        return z.NEVER;
      }

      if (val <= 0) {
        ctx.addIssue({
          code: 'custom',
          message: ERROR_MESSAGES.BUSINESS.INITIAL_BALANCE_POSITIVE,
        });
        return z.NEVER;
      }
    }
  });

const termValidation = z
  .number()
  .optional()
  .superRefine((val, ctx) => {
    const accountType = (ctx as any).parent?.accountType;

    if (accountType === ACCOUNT_TYPE.FIXED_TERM) {
      if (val === undefined || val === null) {
        ctx.addIssue({
          code: 'custom',
          message: ERROR_MESSAGES.REQUIRED.TERM,
        });
        return z.NEVER;
      }

      if (val <= 0) {
        ctx.addIssue({
          code: 'custom',
          message: ERROR_MESSAGES.BUSINESS.TERM_POSITIVE,
        });
        return z.NEVER;
      }

      if (val > 120) {
        ctx.addIssue({
          code: 'custom',
          message: ERROR_MESSAGES.BUSINESS.TERM_MAX,
        });
        return z.NEVER;
      }
    }
  });

const monthlyInterestValidation = z
  .number()
  .optional()
  .superRefine((val, ctx) => {
    const accountType = (ctx as any).parent?.accountType;

    if (accountType === ACCOUNT_TYPE.FIXED_TERM) {
      if (val === undefined || val === null) {
        ctx.addIssue({
          code: 'custom',
          message: ERROR_MESSAGES.REQUIRED.MONTHLY_INTEREST,
        });
        return z.NEVER;
      }

      if (val <= 0) {
        ctx.addIssue({
          code: 'custom',
          message: ERROR_MESSAGES.BUSINESS.MONTHLY_INTEREST_POSITIVE,
        });
        return z.NEVER;
      }

      if (val > 100) {
        ctx.addIssue({
          code: 'custom',
          message: ERROR_MESSAGES.BUSINESS.MONTHLY_INTEREST_MAX,
        });
        return z.NEVER;
      }
    }
  });

const overdraftLimitValidation = z
  .number()
  .optional()
  .superRefine((val, ctx) => {
    if (val !== undefined && val < 0) {
      ctx.addIssue({
        code: 'custom',
        message: ERROR_MESSAGES.BUSINESS.OVERDRAFT_POSITIVE,
      });
      return z.NEVER;
    }
  });

export const openAccountSchema = z.object({
  accountType: z.enum([ACCOUNT_TYPE.SAVINGS, ACCOUNT_TYPE.CHECKING, ACCOUNT_TYPE.FIXED_TERM]),
  currency: z.enum([CURRENCY.SOLES, CURRENCY.DOLLARS]),
  initialBalance: initialBalanceValidation,
  term: termValidation,
  monthlyInterest: monthlyInterestValidation,
  overdraftLimit: overdraftLimitValidation,
});

export type OpenAccountFormData = z.infer<typeof openAccountSchema>;
