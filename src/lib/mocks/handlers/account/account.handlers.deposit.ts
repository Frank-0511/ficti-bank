import { http, HttpResponse } from 'msw';
import { ACCOUNT_STATUS, EMBARGO_TYPE, MOVEMENT_TYPE } from '@/lib/constants';
import { Account, ApiResponse } from '@/lib/types';
import { hasTodayExchangeRate } from '../exchangeRate.handlers';
import { addMovement, getAccountsFromStorage, setAccountsToStorage } from './storage.utils';

export const depositHandler = http.post(
  '/api/accounts/:accountNumber/deposit',
  async ({ params, request }) => {
    const { accountNumber } = params;
    const body = (await request.json()) as { amount: number; authKey?: string };

    // Validar que exista tipo de cambio del día
    if (!hasTodayExchangeRate()) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'No se puede realizar la operación. Falta registrar el tipo de cambio del día.',
        data: null,
      };
      return HttpResponse.json(response, { status: 400 });
    }

    if (body.amount > 2000) {
      if (!body.authKey || body.authKey.trim().length === 0) {
        return HttpResponse.json(
          {
            success: false,
            message: 'La clave de autorización es obligatoria para montos mayores a S/2000',
            data: null,
          },
          { status: 400 }
        );
      }
      // Validar clave contra el usuario logueado
      const authRaw = localStorage.getItem('auth-storage');
      let currentUserEmail = '';
      if (authRaw) {
        try {
          const auth = JSON.parse(authRaw);
          currentUserEmail = auth.state?.user?.email || '';
        } catch {
          return HttpResponse.json(
            {
              success: false,
              message: 'Error al procesar la autenticación del usuario',
              data: null,
            },
            { status: 500 }
          );
        }
      }
      const usersRaw = localStorage.getItem('T_Usuario');
      let userPassword = '';
      if (usersRaw && currentUserEmail) {
        try {
          const users = JSON.parse(usersRaw);
          const user = users.find((u: any) => u.email === currentUserEmail);
          userPassword = user?.password || '';
        } catch {
          return HttpResponse.json(
            {
              success: false,
              message: 'Error al procesar los datos del usuario',
              data: null,
            },
            { status: 500 }
          );
        }
      }
      if (!userPassword || body.authKey !== userPassword) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Clave de autorización incorrecta',
            data: null,
          },
          { status: 401 }
        );
      }
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

    // Registrar movimiento
    addMovement(
      String(accountNumber),
      MOVEMENT_TYPE.DEPOSITO,
      body.amount,
      accounts[accountIndex].currentBalance,
      'Depósito en cuenta'
    );

    const response: ApiResponse<{ accountNumber: string }> = {
      success: true,
      message: 'Depósito realizado exitosamente',
      data: { accountNumber: String(accountNumber) },
    };
    return HttpResponse.json(response);
  }
);
