import { MOVEMENT_TYPE } from '../constants';

export type MovementType = (typeof MOVEMENT_TYPE)[keyof typeof MOVEMENT_TYPE];

export interface AccountMovement {
  id: string;
  date: string;
  type: MovementType;
  amount: number;
  balance: number;
  description?: string;
  accountNumber: string;
}

export interface AccountMovementResponse {
  id: string;
  date: string;
  type: MovementType;
  amount: number;
  balance: number;
  description?: string;
}
