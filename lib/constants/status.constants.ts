/**
 * Status constants for all entities
 */

import { EntityStatus } from '../types/common.types';

export const STATUS_LABELS = {
  [EntityStatus.ACTIVE]: 'Activo',
  [EntityStatus.INACTIVE]: 'Inactivo',
  [EntityStatus.BLOCKED]: 'Bloqueado',
  [EntityStatus.CANCELLED]: 'Anulado',
} as const;

export const STATUS_COLORS = {
  [EntityStatus.ACTIVE]: 'green',
  [EntityStatus.INACTIVE]: 'gray',
  [EntityStatus.BLOCKED]: 'red',
  [EntityStatus.CANCELLED]: 'dark',
} as const;
