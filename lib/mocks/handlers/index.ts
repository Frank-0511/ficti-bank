import { accountHandlers } from './account.handlers';
import { authHandlers } from './auth.handlers';
import { clientHandlers } from './client.handlers';

export const handlers = [...authHandlers, ...accountHandlers, ...clientHandlers];
