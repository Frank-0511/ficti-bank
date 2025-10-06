import { accountHandlers } from './account.handlers';
import { authHandlers } from './auth.handlers';

export const handlers = [...authHandlers, ...accountHandlers];
