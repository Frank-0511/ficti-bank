import { CURRENCY_SYMBOLS } from '../constants/account.constants';
import { Currency } from '../types/account.types';

export const formatCurrency = (amount: number, currency: Currency) => {
  return `${CURRENCY_SYMBOLS[currency]}${amount.toFixed(2)}`;
};
