import { http, HttpResponse } from 'msw';
import {
  ACCOUNT_STATUS,
  ACCOUNT_TYPE,
  CURRENCY,
  EMBARGO_TYPE,
  MOVEMENT_TYPE,
} from '@/lib/constants';
import { Account, ApiResponse, EmbargoType } from '@/lib/types';
import { roundTwo } from '@/lib/utils';
import { getTodayExchangeRate, hasTodayExchangeRate } from '../exchangeRate.handlers';
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
    const fromAcc = accounts[fromIndex];
    const toAcc = accounts[toIndex];
    let amountToDebit = body.amount;
    let amountToCredit = body.amount;
    let descriptionFrom = `Transferencia a cuenta ${body.destinationAccount}`;
    let descriptionTo = `Transferencia desde cuenta ${accountNumber}`;

    // Si las monedas son diferentes, usar tipo de cambio del día
    if (fromAcc.currency !== toAcc.currency) {
      const exchangeRate = getTodayExchangeRate();
      if (!exchangeRate) {
        const response: ApiResponse<null> = {
          success: false,
          message: 'No se pudo obtener el tipo de cambio del día.',
          data: null,
        };
        return HttpResponse.json(response, { status: 400 });
      }
      if (fromAcc.currency === CURRENCY.SOLES && toAcc.currency === CURRENCY.DOLLARS) {
        // De soles a dólares
        amountToDebit = body.amount;
        amountToCredit = roundTwo(body.amount / exchangeRate.venta);
        descriptionFrom += ` (S/ ${body.amount} a $ ${amountToCredit} al cambio S/ ${exchangeRate.venta})`;
        descriptionTo += ` (S/ ${body.amount} a $ ${amountToCredit} al cambio S/ ${exchangeRate.venta})`;
      } else if (fromAcc.currency === CURRENCY.DOLLARS && toAcc.currency === CURRENCY.SOLES) {
        // De dólares a soles
        amountToDebit = body.amount;
        amountToCredit = roundTwo(body.amount * exchangeRate.compra);
        descriptionFrom += ` ($ ${body.amount} a S/ ${amountToCredit} al cambio S/ ${exchangeRate.compra})`;
        descriptionTo += ` ($ ${body.amount} a S/ ${amountToCredit} al cambio S/ ${exchangeRate.compra})`;
      }
    }

    if (fromAcc.availableBalance < amountToDebit) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Fondos insuficientes en la cuenta origen',
        data: null,
      };
      return HttpResponse.json(response, { status: 400 });
    }

    accounts[fromIndex].currentBalance = roundTwo(
      accounts[fromIndex].currentBalance - amountToDebit
    );
    accounts[fromIndex].availableBalance = roundTwo(
      accounts[fromIndex].availableBalance - amountToDebit
    );
    accounts[toIndex].currentBalance = roundTwo(accounts[toIndex].currentBalance + amountToCredit);
    accounts[toIndex].availableBalance = roundTwo(
      accounts[toIndex].availableBalance + amountToCredit
    );
    setAccountsToStorage(accounts);

    // Registrar movimientos para ambas cuentas
    addMovement(
      String(accountNumber),
      MOVEMENT_TYPE.TRANSFERENCIA_ENVIADA,
      amountToDebit,
      accounts[fromIndex].currentBalance,
      descriptionFrom
    );
    addMovement(
      body.destinationAccount,
      MOVEMENT_TYPE.TRANSFERENCIA_RECIBIDA,
      amountToCredit,
      accounts[toIndex].currentBalance,
      descriptionTo
    );

    const response: ApiResponse<{ accountNumber: string }> = {
      success: true,
      message: 'Transferencia realizada exitosamente',
      data: { accountNumber: String(body.destinationAccount) },
    };
    return HttpResponse.json(response);
  }),
  // Renovar cuenta a plazo fijo
  http.post('/api/accounts/:accountNumber/renew', async ({ params, request }) => {
    const { accountNumber } = params;
    const body = (await request.json()) as { term: number; monthlyInterest: number };

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

    const account = accounts[accountIndex];

    if (account.accountType !== ACCOUNT_TYPE.FIXED_TERM) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Solo se pueden renovar cuentas a plazo fijo',
        data: null,
      };
      return HttpResponse.json(response, { status: 400 });
    }

    // Actualizar el plazo, interés y fecha de apertura
    const newOpeningDate = new Date().toISOString();
    accounts[accountIndex].term = body.term;
    accounts[accountIndex].monthlyInterest = body.monthlyInterest;
    accounts[accountIndex].openingDate = newOpeningDate;

    setAccountsToStorage(accounts);

    const response: ApiResponse<{
      accountNumber: string;
      newTerm: number;
      newOpeningDate: string;
    }> = {
      success: true,
      message: 'Cuenta a plazo fijo renovada exitosamente',
      data: {
        accountNumber: String(accountNumber),
        newTerm: body.term,
        newOpeningDate,
      },
    };
    return HttpResponse.json(response);
  }),
  // Cancelar cuenta a plazo fijo (con cálculo de intereses)
  http.post('/api/accounts/:accountNumber/cancel', async ({ params }) => {
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

    const account = accounts[accountIndex];

    if (account.accountType !== ACCOUNT_TYPE.FIXED_TERM) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Solo se pueden cancelar cuentas a plazo fijo',
        data: null,
      };
      return HttpResponse.json(response, { status: 400 });
    }

    // Calcular interés generado
    const openingDate = new Date(account.openingDate);
    const currentDate = new Date();
    const monthsElapsed = Math.floor(
      (currentDate.getTime() - openingDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );

    const monthlyInterestRate = (account.monthlyInterest || 0) / 100;
    const accruedInterest = roundTwo(account.initialBalance * monthlyInterestRate * monthsElapsed);
    const finalBalance = roundTwo(account.currentBalance + accruedInterest);

    // Registrar movimiento de intereses si hay interés generado
    if (accruedInterest > 0) {
      addMovement(
        String(accountNumber),
        MOVEMENT_TYPE.DEPOSITO,
        accruedInterest,
        finalBalance,
        `Interés generado por ${monthsElapsed} meses`
      );
    }

    // Cancelar la cuenta (cambiar estado a CANCELLED)
    accounts[accountIndex].status = ACCOUNT_STATUS.CANCELLED;
    accounts[accountIndex].closingDate = currentDate.toISOString();
    accounts[accountIndex].currentBalance = finalBalance;
    accounts[accountIndex].availableBalance = finalBalance;

    setAccountsToStorage(accounts);

    const response: ApiResponse<{
      accountNumber: string;
      finalBalance: number;
      accruedInterest: number;
      monthsElapsed: number;
    }> = {
      success: true,
      message: 'Cuenta a plazo fijo cancelada exitosamente',
      data: {
        accountNumber: String(accountNumber),
        finalBalance,
        accruedInterest,
        monthsElapsed,
      },
    };
    return HttpResponse.json(response);
  }),
];
