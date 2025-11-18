import { delay, http } from 'msw';
import { accountHandlers } from './account.handlers';
import { authHandlers } from './auth.handlers';
import { clientHandlers } from './client.handlers';
import { dailyMovementsHandlers } from './dailyMovements.handlers';
import { exchangeRateHandlers } from './exchangeRate.handlers';
import { usersHandlers } from './users.handlers';

export const handlers = [
  ...authHandlers,
  ...accountHandlers,
  ...clientHandlers,
  ...exchangeRateHandlers,
  ...dailyMovementsHandlers,
  ...usersHandlers,
  http.all('*', async () => {
    await delay(500);
  }),
];
