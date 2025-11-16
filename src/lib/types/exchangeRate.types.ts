export interface ExchangeRate {
  id: string;
  date: string; // YYYY-MM-DD
  rate: number; // Tipo de cambio USD a PEN
  createdAt: string;
  updatedAt?: string;
  userCode: string;
}

export interface ExchangeRateData {
  rate: number;
}

export interface ExchangeRateResponse {
  id: string;
  date: string;
  rate: number;
}
