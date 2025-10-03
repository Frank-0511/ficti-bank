/**
 * Index file for all MSW handlers
 */

import { accountHandlers } from './account.handlers';
import { customerHandlers, ubigeoHandlers } from './customer.handlers';
import { movementHandlers } from './movement.handlers';

export const handlers = [
  ...customerHandlers,
  ...ubigeoHandlers,
  ...accountHandlers,
  ...movementHandlers,
];
