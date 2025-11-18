import { crudHandlers } from './account/account.handlers.crud';
import { depositHandler } from './account/account.handlers.deposit';
import { otherHandlers } from './account/account.handlers.others';

export const accountHandlers = [...crudHandlers, depositHandler, ...otherHandlers];
