import { http, HttpResponse } from 'msw';
import { ApiResponse } from '@/lib/types';
import { Account } from '@/lib/types/account.types';
import { mockAccounts } from '../data/accounts.data';

export const accountHandlers = [
  http.get('/api/accounts', () => {
    const response: ApiResponse<Account[]> = {
      success: true,
      message: 'Cuentas obtenidas exitosamente',
      data: mockAccounts,
    };

    return HttpResponse.json(response);
  }),

  http.post('/api/accounts', async ({ request }) => {
    const body = (await request.json()) as any;

    const newAccount: Account = {
      accountType: body.accountType,
      accountNumber: `${body.accountType}-${Date.now()}`,
      clientCode: 'CLI-001',
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

    mockAccounts.push(newAccount);

    const response: ApiResponse<Account> = {
      success: true,
      message: 'Cuenta aperturada exitosamente',
      data: newAccount,
    };

    return HttpResponse.json(response, { status: 201 });
  }),

  http.delete('/api/accounts/:accountNumber', ({ params }) => {
    const { accountNumber } = params;
    const accountIndex = mockAccounts.findIndex((acc) => acc.accountNumber === accountNumber);

    if (accountIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Cuenta no encontrada',
        data: null,
      };
      return HttpResponse.json(response, { status: 404 });
    }

    const account = mockAccounts[accountIndex];

    if (account.currentBalance !== 0) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'No se puede cerrar una cuenta con saldo',
        data: null,
      };
      return HttpResponse.json(response, { status: 400 });
    }

    mockAccounts.splice(accountIndex, 1);

    const response: ApiResponse<null> = {
      success: true,
      message: 'Cuenta cerrada exitosamente',
      data: null,
    };

    return HttpResponse.json(response);
  }),
];
