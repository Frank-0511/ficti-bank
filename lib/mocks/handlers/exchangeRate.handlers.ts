import { http, HttpResponse } from 'msw';
import { ApiResponse, ExchangeRate } from '@/lib/types';
import { EXCHANGE_RATES_STORAGE_KEY } from '../data';

// Devuelve el tipo de cambio de hoy en formato { compra, venta }
export function getTodayExchangeRate(): { compra: number; venta: number } | null {
  const rates = getExchangeRatesFromStorage();
  const today = getTodayDate();
  // Para compatibilidad, si solo hay un campo 'rate', usarlo como ambos
  const todayRate = rates.find((rate) => rate.date === today);
  if (!todayRate) {
    return null;
  }
  // Si el objeto tiene compra/venta, devolverlos, si no, usar 'rate' para ambos
  if ('compra' in todayRate && 'venta' in todayRate) {
    // @ts-ignore
    return { compra: todayRate.compra, venta: todayRate.venta };
  }
  return { compra: todayRate.rate, venta: todayRate.rate };
}

export function getExchangeRatesFromStorage(): ExchangeRate[] {
  const stored = globalThis.localStorage?.getItem(EXCHANGE_RATES_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored) as ExchangeRate[];
  }
  return [];
}

function setExchangeRatesToStorage(rates: ExchangeRate[]): void {
  globalThis.localStorage?.setItem(EXCHANGE_RATES_STORAGE_KEY, JSON.stringify(rates));
}

export function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function hasTodayExchangeRate(): boolean {
  const rates = getExchangeRatesFromStorage();
  const today = getTodayDate();
  return rates.some((rate) => rate.date === today);
}

export const exchangeRateHandlers = [
  // Obtener todos los tipos de cambio
  http.get('/api/exchange-rates', () => {
    const rates = getExchangeRatesFromStorage();
    const response: ApiResponse<ExchangeRate[]> = {
      success: true,
      message: 'Tipos de cambio obtenidos exitosamente',
      data: rates.sort((a, b) => b.date.localeCompare(a.date)),
    };
    return HttpResponse.json(response);
  }),

  // Obtener tipo de cambio del día
  http.get('/api/exchange-rates/today', () => {
    const rates = getExchangeRatesFromStorage();
    const today = getTodayDate();
    const todayRate = rates.find((rate) => rate.date === today);

    const response: ApiResponse<ExchangeRate | null> = {
      success: true,
      message: todayRate
        ? 'Tipo de cambio del día obtenido'
        : 'No se ha registrado el tipo de cambio del día',
      data: todayRate || null,
    };
    return HttpResponse.json(response);
  }),

  // Crear tipo de cambio
  http.post('/api/exchange-rates', async ({ request }) => {
    const body = (await request.json()) as { rate: number };
    const rates = getExchangeRatesFromStorage();
    const today = getTodayDate();
    const existingRate = rates.find((rate) => rate.date === today);

    if (existingRate) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Ya existe un tipo de cambio registrado para el día de hoy',
        data: null,
      };
      return HttpResponse.json(response, { status: 400 });
    }

    const newRate: ExchangeRate = {
      id: `ER-${Date.now()}`,
      date: today,
      rate: body.rate,
      createdAt: new Date().toISOString(),
      userCode: 'USR-001',
    };

    rates.push(newRate);
    setExchangeRatesToStorage(rates);

    const response: ApiResponse<{ id: string; date: string; rate: number }> = {
      success: true,
      message: 'Tipo de cambio registrado exitosamente',
      data: { id: newRate.id, date: newRate.date, rate: newRate.rate },
    };
    return HttpResponse.json(response, { status: 201 });
  }),

  // Actualizar tipo de cambio del día
  http.put('/api/exchange-rates/today', async ({ request }) => {
    const body = (await request.json()) as { rate: number };
    const rates = getExchangeRatesFromStorage();
    const today = getTodayDate();
    const rateIndex = rates.findIndex((rate) => rate.date === today);

    if (rateIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'No existe un tipo de cambio para actualizar',
        data: null,
      };
      return HttpResponse.json(response, { status: 404 });
    }

    rates[rateIndex].rate = body.rate;
    rates[rateIndex].updatedAt = new Date().toISOString();
    setExchangeRatesToStorage(rates);

    const response: ApiResponse<{ id: string; date: string; rate: number }> = {
      success: true,
      message: 'Tipo de cambio actualizado exitosamente',
      data: {
        id: rates[rateIndex].id,
        date: rates[rateIndex].date,
        rate: rates[rateIndex].rate,
      },
    };
    return HttpResponse.json(response);
  }),
];
