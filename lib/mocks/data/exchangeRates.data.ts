import { ExchangeRate } from '@/lib/types';

export const EXCHANGE_RATES_STORAGE_KEY = 'T_EXCHANGE_RATES';

export const DEFAULT_EXCHANGE_RATES: ExchangeRate[] = [
  {
    id: 'ER-001',
    date: '2025-11-15',
    rate: 3.85,
    createdAt: '2025-11-15T09:00:00.000Z',
    userCode: 'USR-001',
  },
  {
    id: 'ER-002',
    date: '2025-11-16',
    rate: 3.87,
    createdAt: '2025-11-16T09:00:00.000Z',
    userCode: 'USR-002',
  },
  {
    id: 'ER-003',
    date: '2025-11-17',
    rate: 3.9,
    createdAt: '2025-11-17T09:00:00.000Z',
    userCode: 'USR-001',
  },
];
