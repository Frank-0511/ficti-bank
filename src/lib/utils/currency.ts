import { CURRENCY_SYMBOLS } from '../constants';
import { Currency } from '../types';

export const formatCurrency = (amount: number, currency: Currency) => {
  return `${CURRENCY_SYMBOLS[currency]}${amount.toFixed(2)}`;
};
