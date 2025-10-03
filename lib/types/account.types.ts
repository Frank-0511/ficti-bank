/**
 * Account related types
 */

import { Currency, EntityStatus } from './common.types';

export interface AccountType {
  code: string; // TipoCta CHAR(2)
  description: string; // Descripcion VARCHAR(50)
  status: EntityStatus; // Estado CHAR(1)
}

export interface Account {
  type: string; // TipoCta CHAR(2) - CA/CC/AF/PF
  number: string; // NroCta VARCHAR(20)
  customerCode: string; // CodCliente VARCHAR(10)
  currency: Currency; // Moneda CHAR(2) - SO/DO
  openingDate: string; // Fech_Apert DATE
  closingDate?: string; // Fech_Cierre DATE
  blockDate?: string; // Fech_Bloq DATE
  lastMovementDate?: string; // Fech_Ult_M DATE
  initialBalance: number; // Saldoni DECIMAL(10, 2)
  currentBalance: number; // SaldAct DECIMAL(10, 2)
  availableBalance: number; // SaldoPro DECIMAL(10, 2)
  userCode: string; // CodUsu VARCHAR(10) - quien abrió
  status: EntityStatus; // Estado CHAR(1)

  // Campos adicionales
  overdraftLimit?: number; // Solo para cuentas corrientes
  isEmbargoed?: boolean;
  embargoAmount?: number | null; // null = embargo total
  embargoReference?: string;
}

export interface CreateAccountRequest {
  customerCode: string;
  accountType: string; // CA, CC, PF, AF
  currency: Currency;
  initialBalance?: number;
  overdraftLimit?: number; // Solo para cuentas corrientes
}

export interface CloseAccountRequest {
  reason?: string;
}

export interface EmbargoAccountRequest {
  embargoType: 'total' | 'partial';
  embargoAmount?: number; // Requerido si es parcial
  courtOrder: string;
  reference?: string;
}

export interface DeactivateAccountRequest {
  reason: 'manual' | 'automatic';
  notes?: string;
}

export interface AccountResponse {
  account: Account;
}

export interface AccountsResponse {
  accounts: Account[];
}
