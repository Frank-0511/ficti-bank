import { http, HttpResponse } from 'msw';
import { ACCOUNT_STATUS } from '@/lib/constants';
import { ApiResponse } from '@/lib/types';
import { Account } from '@/lib/types/account.types';
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
  // PATCH /api/accounts/:accountNumber/inactivate - Inactivar cuenta
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

  // POST /api/accounts/:accountNumber/freeze - Congelar/embargar cuenta
  http.post('/api/accounts/:accountNumber/freeze', async ({ params, request }) => {
    const { accountNumber } = params;
    const body = (await request.json()) as { type: 'total' | 'partial'; amount?: number };
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
    // Simular congelamiento: solo cambiamos el status a 'B' (bloqueada)
    accounts[accountIndex].status = ACCOUNT_STATUS.BLOCKED;
    // Si es parcial, restar el monto del saldo disponible
    if (body.type === 'partial' && typeof body.amount === 'number') {
      accounts[accountIndex].availableBalance -= body.amount;
    } else if (body.type === 'total') {
      accounts[accountIndex].availableBalance = 0;
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
    accounts[accountIndex].currentBalance += body.amount;
    accounts[accountIndex].availableBalance += body.amount;
    setAccountsToStorage(accounts);
    const response: ApiResponse<{ accountNumber: string }> = {
      success: true,
      message: 'Depósito realizado exitosamente',
      data: { accountNumber: String(accountNumber) },
    };
    return HttpResponse.json(response);
  }),
];
