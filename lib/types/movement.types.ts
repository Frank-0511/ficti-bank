/**
 * Movement related types
 */

import { EntityStatus } from './common.types';

export interface MovementType {
  code: string; // TipoMov CHAR(2)
  description: string; // Descrip VARCHAR(100)
  status: EntityStatus; // Estado CHAR(1)
}

export interface Movement {
  accountType: string; // TipoCta CHAR(2)
  accountNumber: string; // NroCta VARCHAR(20)
  operationNumber: number; // NroOperNumber INT
  operationDate: string; // Fech_Ope DATE
  userCode: string; // CodUsu VARCHAR(10)
  movementType: string; // TipoMov CHAR(2)
  amount: number; // MonOpe DECIMAL(10, 2)
  status: EntityStatus; // Estado CHAR(1)
  description?: string;
  reference?: string;
  relatedAccountNumber?: string; // Para transferencias
}

export interface CreateMovementRequest {
  accountNumber: string;
  movementType: string; // DP, RT, TF
  amount: number;
  description?: string;
  reference?: string;
  relatedAccountNumber?: string;
}

export interface MovementResponse {
  movement: Movement;
}

export interface MovementsResponse {
  movements: Movement[];
}
