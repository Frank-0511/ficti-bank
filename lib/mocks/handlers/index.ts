import { delay, http } from 'msw';
import { accountHandlers } from './account.handlers';
import { authHandlers } from './auth.handlers';
import { clientHandlers } from './client.handlers';

export const handlers = [
  http.all('*', async () => {
    await delay(500);
  }),
  ...authHandlers,
  ...accountHandlers,
  ...clientHandlers,
];
