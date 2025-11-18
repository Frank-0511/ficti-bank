import { http, HttpResponse } from 'msw';
import { ACCOUNT_STATUS, EMBARGO_TYPE, MOVEMENT_TYPE } from '@/lib/constants';
import { Account, ApiResponse, EmbargoType } from '@/lib/types';
import { roundTwo } from '../../../utils';
import { hasTodayExchangeRate } from '../exchangeRate.handlers';
import { addMovement, getAccountsFromStorage, setAccountsToStorage } from './storage.utils';

export const otherHandlers = [
  http.post('/api/accounts/:accountNumber/freeze', async ({ params, request }) => {
    const { accountNumber } = params;
    const body = (await request.json()) as { type: EmbargoType; amount?: number };
    if (!hasTodayExchangeRate()) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'No se puede realizar la operación. Falta registrar el tipo de cambio del día.',
        data: null,
      };
      return HttpResponse.json(response, { status: 400 });
    }
    const accounts = getAccountsFromStorage();
    const accountIndex = accounts.findIndex((acc: Account) => acc.accountNumber === accountNumber);
    if (accountIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Account not found',
        data: null,
      };
      return HttpResponse.json(response, { status: 404 });
    }
    accounts[accountIndex].status = ACCOUNT_STATUS.BLOCKED;
    accounts[accountIndex].embargoType = body.type;
    if (body.type === EMBARGO_TYPE.TOTAL) {
      accounts[accountIndex].embargoAmount = accounts[accountIndex].availableBalance;
      accounts[accountIndex].availableBalance = 0;
      accounts[accountIndex].currentBalance = 0;
    } else if (body.type === EMBARGO_TYPE.PARTIAL && typeof body.amount === 'number') {
      accounts[accountIndex].currentBalance -= body.amount;
      accounts[accountIndex].availableBalance -= body.amount;
      accounts[accountIndex].embargoAmount = body.amount;
    }
    setAccountsToStorage(accounts);
    const response: ApiResponse<{ accountNumber: string }> = {
      success: true,
      message: 'Account frozen successfully',
      data: { accountNumber: String(accountNumber) },
    };
    return HttpResponse.json(response);
  }),
  http.post('/api/accounts/:accountNumber/withdraw', async ({ params, request }) => {
    const { accountNumber } = params;
    const body = (await request.json()) as { amount: number };
    if (!hasTodayExchangeRate()) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'No se puede realizar la operación. Falta registrar el tipo de cambio del día.',
        data: null,
      };
      return HttpResponse.json(response, { status: 400 });
    }
    const accounts = getAccountsFromStorage();
    const accountIndex = accounts.findIndex((acc: Account) => acc.accountNumber === accountNumber);
    if (accountIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Cuenta no encontrada',
        data: null,
      };
      return HttpResponse.json(response, { status: 404 });
    }
    const acc = accounts[accountIndex];
    if (body.amount > acc.availableBalance) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Fondos insuficientes',
        data: null,
      };
      return HttpResponse.json(response, { status: 400 });
    }
    accounts[accountIndex].currentBalance = roundTwo(
      accounts[accountIndex].currentBalance - body.amount
    );
    accounts[accountIndex].availableBalance = roundTwo(
      accounts[accountIndex].availableBalance - body.amount
    );
    setAccountsToStorage(accounts);

    // Registrar movimiento
    addMovement(
      String(accountNumber),
      MOVEMENT_TYPE.RETIRO,
      body.amount,
      accounts[accountIndex].currentBalance,
      'Retiro de cuenta'
    );

    const response: ApiResponse<{ accountNumber: string }> = {
      success: true,
      message: 'Retiro realizado exitosamente',
      data: { accountNumber: String(accountNumber) },
    };
    return HttpResponse.json(response);
  }),
  http.post('/api/accounts/:accountNumber/unfreeze', async ({ params }) => {
    const { accountNumber } = params;
    const accounts = getAccountsFromStorage();
    const accountIndex = accounts.findIndex((acc: Account) => acc.accountNumber === accountNumber);
    if (accountIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Cuenta no encontrada',
        data: null,
      };
      return HttpResponse.json(response, { status: 404 });
    }
    if (accounts[accountIndex].status !== ACCOUNT_STATUS.BLOCKED) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'La cuenta no está embargada',
        data: null,
      };
      return HttpResponse.json(response, { status: 400 });
    }
    accounts[accountIndex].status = ACCOUNT_STATUS.ACTIVE;
    accounts[accountIndex].embargoAmount = 0;
    accounts[accountIndex].embargoType = undefined;
    accounts[accountIndex].availableBalance = 0;
    accounts[accountIndex].currentBalance = 0;
    setAccountsToStorage(accounts);
    const response: ApiResponse<{ accountNumber: string }> = {
      success: true,
      message: 'Cuenta desembargada exitosamente',
      data: { accountNumber: String(accountNumber) },
    };
    return HttpResponse.json(response);
  }),
  http.post('/api/accounts/:accountNumber/transfer', async ({ params, request }) => {
    const { accountNumber } = params;
    const body = (await request.json()) as { destinationAccount: string; amount: number };
    if (!hasTodayExchangeRate()) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'No se puede realizar la operación. Falta registrar el tipo de cambio del día.',
        data: null,
      };
      return HttpResponse.json(response, { status: 400 });
    }
    const accounts = getAccountsFromStorage();
    const fromIndex = accounts.findIndex((acc: Account) => acc.accountNumber === accountNumber);
    const toIndex = accounts.findIndex(
      (acc: Account) => acc.accountNumber === body.destinationAccount
    );
    if (fromIndex === -1 || toIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Cuenta origen o destino no encontrada',
        data: null,
      };
      return HttpResponse.json(response, { status: 404 });
    }
    if (accounts[fromIndex].availableBalance < body.amount) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Fondos insuficientes en la cuenta origen',
        data: null,
      };
      return HttpResponse.json(response, { status: 400 });
    }
    accounts[fromIndex].currentBalance = roundTwo(accounts[fromIndex].currentBalance - body.amount);
    accounts[fromIndex].availableBalance = roundTwo(
      accounts[fromIndex].availableBalance - body.amount
    );
    accounts[toIndex].currentBalance = roundTwo(accounts[toIndex].currentBalance + body.amount);
    accounts[toIndex].availableBalance = roundTwo(accounts[toIndex].availableBalance + body.amount);
    setAccountsToStorage(accounts);

    // Registrar movimientos para ambas cuentas
    addMovement(
      String(accountNumber),
      MOVEMENT_TYPE.TRANSFERENCIA_ENVIADA,
      body.amount,
      accounts[fromIndex].currentBalance,
      `Transferencia a cuenta ${body.destinationAccount}`
    );
    addMovement(
      body.destinationAccount,
      MOVEMENT_TYPE.TRANSFERENCIA_RECIBIDA,
      body.amount,
      accounts[toIndex].currentBalance,
      `Transferencia desde cuenta ${accountNumber}`
    );

    const response: ApiResponse<{ accountNumber: string }> = {
      success: true,
      message: 'Transferencia realizada exitosamente',
      data: { accountNumber: String(body.destinationAccount) },
    };
    return HttpResponse.json(response);
  }),
];
