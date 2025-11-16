import { http, HttpResponse } from 'msw';
import { ACCOUNT_STATUS, EMBARGO_TYPE } from '@/lib/constants';
import { Account, ApiResponse, EmbargoType } from '@/lib/types';
import { roundTwo } from '../../utils';
import { ACCOUNTS_STORAGE_KEY } from '../data';

function getAccountsFromStorage(): Account[] {
  const stored = globalThis.localStorage?.getItem(ACCOUNTS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored) as Account[];
  }
  return [];
}

function setAccountsToStorage(accounts: Account[]): void {
  globalThis.localStorage?.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
}

export const accountHandlers = [
  http.patch('/api/accounts/:accountNumber/inactivate', async ({ params }) => {
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
    accounts[accountIndex].status = ACCOUNT_STATUS.INACTIVE;
    setAccountsToStorage(accounts);
    const response: ApiResponse<Account> = {
      success: true,
      message: 'Cuenta inactivada exitosamente',
      data: accounts[accountIndex],
    };
    return HttpResponse.json(response);
  }),
  http.get('/api/accounts', ({ request }) => {
    const url = new URL(request.url);
    const clientCode = url.searchParams.get('clientCode');
    let accounts = getAccountsFromStorage();
    if (clientCode) {
      accounts = accounts.filter((acc: Account) => acc.clientCode === clientCode);
    }
    const response: ApiResponse<Account[]> = {
      success: true,
      message: 'Cuentas obtenidas exitosamente',
      data: accounts,
    };
    return HttpResponse.json(response);
  }),

  http.post('/api/accounts', async ({ request }) => {
    const body = (await request.json()) as any;
    const accounts = getAccountsFromStorage();
    const newAccount: Account = {
      accountType: body.accountType,
      accountNumber: `${body.accountType}-${Date.now()}`,
      clientCode: body.clientCode || 'CLI-001',
      currency: body.currency,
      openingDate: new Date().toISOString().split('T')[0],
      initialBalance: body.initialBalance || 0,
      currentBalance: body.initialBalance || 0,
      availableBalance: body.initialBalance || 0,
      userCode: 'USR-001',
      status: 'A',
      term: body.term,
      monthlyInterest: body.monthlyInterest,
      overdraftLimit: body.overdraftLimit,
      embargoAmount: 0,
      embargoType: undefined,
    };
    accounts.push(newAccount);
    setAccountsToStorage(accounts);
    const response: ApiResponse<Account> = {
      success: true,
      message: 'Cuenta aperturada exitosamente',
      data: newAccount,
    };
    return HttpResponse.json(response, { status: 201 });
  }),

  http.post('/api/accounts/:accountNumber/freeze', async ({ params, request }) => {
    const { accountNumber } = params;
    const body = (await request.json()) as { type: EmbargoType; amount?: number };
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
      const faltaRetener = body.amount - accounts[accountIndex].availableBalance;
      accounts[accountIndex].currentBalance -= faltaRetener;
      accounts[accountIndex].availableBalance -= faltaRetener;
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
  http.delete('/api/accounts/:accountNumber', ({ params }) => {
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
    if (account.currentBalance !== 0) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'No se puede cerrar una cuenta con saldo',
        data: null,
      };
      return HttpResponse.json(response, { status: 400 });
    }
    accounts.splice(accountIndex, 1);
    setAccountsToStorage(accounts);
    const response: ApiResponse<null> = {
      success: true,
      message: 'Cuenta cerrada exitosamente',
      data: null,
    };
    return HttpResponse.json(response);
  }),
  http.post('/api/accounts/:accountNumber/deposit', async ({ params, request }) => {
    const { accountNumber } = params;
    const body = (await request.json()) as { amount: number };
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
    const isBlocked = accounts[accountIndex].status === ACCOUNT_STATUS.BLOCKED;
    const isTotalEmbargo = accounts[accountIndex].embargoType === EMBARGO_TYPE.TOTAL;

    if (isBlocked && isTotalEmbargo) {
      accounts[accountIndex].embargoAmount = accounts[accountIndex].embargoAmount
        ? accounts[accountIndex].embargoAmount + body.amount
        : body.amount;
    }

    if ((isBlocked && !isTotalEmbargo) || !isBlocked) {
      accounts[accountIndex].currentBalance += body.amount;
      accounts[accountIndex].availableBalance += body.amount;
    }

    setAccountsToStorage(accounts);
    const response: ApiResponse<{ accountNumber: string }> = {
      success: true,
      message: 'Depósito realizado exitosamente',
      data: { accountNumber: String(accountNumber) },
    };
    return HttpResponse.json(response);
  }),
  http.post('/api/accounts/:accountNumber/withdraw', async ({ params, request }) => {
    const { accountNumber } = params;
    const body = (await request.json()) as { amount: number };
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
    accounts[accountIndex].availableBalance = accounts[accountIndex].currentBalance;
    setAccountsToStorage(accounts);
    const response: ApiResponse<{ accountNumber: string }> = {
      success: true,
      message: 'Cuenta desembargada exitosamente',
      data: { accountNumber: String(accountNumber) },
    };
    return HttpResponse.json(response);
  }),
];
