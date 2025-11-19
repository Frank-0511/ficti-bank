import { http, HttpResponse } from 'msw';
import { DEFAULT_MOVEMENTS } from '../data/movements.data';

// Devuelve solo los movimientos del día actual
export const dailyMovementsHandlers = [
  http.get('/api/movements/daily', () => {
    const today = new Date().toISOString().slice(0, 10);
    const daily = DEFAULT_MOVEMENTS.filter((m) => m.date.slice(0, 10) === today);
    return HttpResponse.json({ data: daily });
  }),
];
