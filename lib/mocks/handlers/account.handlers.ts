/**
 * Account MSW handlers
 */

import { http, HttpResponse } from 'msw';
import { ACCOUNT_TYPES } from '../../constants/account.constants';
import {
  CloseAccountRequest,
  CreateAccountRequest,
  DeactivateAccountRequest,
  EmbargoAccountRequest,
} from '../../types/account.types';
import { EntityStatus } from '../../types/common.types';
import { AccountDatabase } from '../database/account.database';
import { CustomerDatabase } from '../database/customer.database';
import { MovementDatabase } from '../database/movement.database';

export const accountHandlers = [
  // Get all accounts
  http.get('/api/accounts', async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const accounts = AccountDatabase.getAccounts();
    return HttpResponse.json({ accounts });
  }),

  // Get account by number
  http.get('/api/accounts/:accountNumber', async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const { accountNumber } = params;
    const account = AccountDatabase.findByNumber(accountNumber as string);

    if (!account) {
      return HttpResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return HttpResponse.json({ account });
  }),

  // Get accounts by customer
  http.get('/api/accounts/customer/:customerCode', async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { customerCode } = params;

    // Verify customer exists
    const customer = CustomerDatabase.findByCode(customerCode as string);
    if (!customer) {
      return HttpResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const accounts = AccountDatabase.findByCustomerCode(customerCode as string);
    return HttpResponse.json({ accounts });
  }),

  // Get accounts by type
  http.get('/api/accounts/type/:accountType', async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { accountType } = params;
    const accounts = AccountDatabase.getAccountsByType(accountType as string);
    return HttpResponse.json({ accounts });
  }),

  // Create account
  http.post('/api/accounts', async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Longer delay for account creation

    try {
      const data = (await request.json()) as CreateAccountRequest;

      // Validate customer exists
      const customer = CustomerDatabase.findByCode(data.customerCode);
      if (!customer) {
        return HttpResponse.json({ error: 'Customer not found' }, { status: 404 });
      }

      // Validate customer is active
      if (customer.status !== EntityStatus.ACTIVE) {
        return HttpResponse.json(
          { error: 'Customer must be active to open an account' },
          { status: 400 }
        );
      }

      // Validate account type
      const validAccountTypes = Object.values(ACCOUNT_TYPES);
      if (!validAccountTypes.includes(data.accountType as any)) {
        return HttpResponse.json({ error: 'Invalid account type' }, { status: 400 });
      }

      // Validate initial balance for term deposits
      if (data.accountType === ACCOUNT_TYPES.TERM_DEPOSIT) {
        if (!data.initialBalance || data.initialBalance < 100) {
          return HttpResponse.json(
            { error: 'Term deposits require a minimum initial balance of 100' },
            { status: 400 }
          );
        }
      }

      // Create account
      const newAccount = {
        type: data.accountType,
        number: AccountDatabase.generateAccountNumber(data.accountType),
        customerCode: data.customerCode,
        currency: data.currency,
        openingDate: new Date().toISOString().split('T')[0],
        initialBalance: data.initialBalance || 0,
        currentBalance: data.initialBalance || 0,
        availableBalance: data.initialBalance || 0,
        userCode: 'USU001', // In real app, get from auth context
        status: EntityStatus.ACTIVE,
        isEmbargoed: false,
      };

      const savedAccount = AccountDatabase.saveAccount(newAccount);

      // Create initial movement if there's an initial balance
      if (data.initialBalance && data.initialBalance > 0) {
        const initialMovement = {
          accountType: data.accountType,
          accountNumber: savedAccount.number,
          operationNumber: MovementDatabase.generateOperationNumber(),
          operationDate: new Date().toISOString().split('T')[0],
          userCode: 'USU001',
          movementType: 'DP', // Deposit
          amount: data.initialBalance,
          status: EntityStatus.ACTIVE,
          description: 'Initial deposit - Account opening',
        };

        MovementDatabase.saveMovement(initialMovement);
      }

      return HttpResponse.json({ account: savedAccount });
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
  }),

  // Close account
  http.put('/api/accounts/:accountNumber/close', async ({ params, request }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const { accountNumber } = params;
      const data = (await request.json()) as CloseAccountRequest;

      const { canClose, reason } = AccountDatabase.canCloseAccount(accountNumber as string);
      if (!canClose) {
        return HttpResponse.json({ error: reason }, { status: 400 });
      }

      const updatedAccount = AccountDatabase.updateAccount(accountNumber as string, {
        status: EntityStatus.INACTIVE,
        closingDate: new Date().toISOString().split('T')[0],
      });

      if (!updatedAccount) {
        return HttpResponse.json({ error: 'Failed to close account' }, { status: 500 });
      }

      // Create closing movement
      const closingMovement = {
        accountType: updatedAccount.type,
        accountNumber: updatedAccount.number,
        operationNumber: MovementDatabase.generateOperationNumber(),
        operationDate: new Date().toISOString().split('T')[0],
        userCode: 'USU001',
        movementType: 'RT', // Withdrawal (closure)
        amount: 0,
        status: EntityStatus.ACTIVE,
        description: `Account closure - ${data.reason || 'No reason provided'}`,
      };

      MovementDatabase.saveMovement(closingMovement);

      return HttpResponse.json({ account: updatedAccount });
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
  }),

  // Embargo account
  http.post('/api/accounts/:accountNumber/embargo', async ({ params, request }) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    try {
      const { accountNumber } = params;
      const data = (await request.json()) as EmbargoAccountRequest;

      const { canEmbargo, reason } = AccountDatabase.canEmbargoAccount(accountNumber as string);
      if (!canEmbargo) {
        return HttpResponse.json({ error: reason }, { status: 400 });
      }

      const account = AccountDatabase.findByNumber(accountNumber as string);
      if (!account) {
        return HttpResponse.json({ error: 'Account not found' }, { status: 404 });
      }

      // Validate embargo amount for partial embargo
      if (data.embargoType === 'partial') {
        if (!data.embargoAmount || data.embargoAmount <= 0) {
          return HttpResponse.json(
            { error: 'Embargo amount is required for partial embargo' },
            { status: 400 }
          );
        }
        if (data.embargoAmount > account.currentBalance) {
          return HttpResponse.json(
            { error: 'Embargo amount cannot exceed current balance' },
            { status: 400 }
          );
        }
      }

      const updatedAccount = AccountDatabase.updateAccount(accountNumber as string, {
        isEmbargoed: true,
        embargoAmount: data.embargoType === 'total' ? null : data.embargoAmount,
        embargoReference: data.courtOrder,
        availableBalance:
          data.embargoType === 'total'
            ? 0
            : Math.max(0, account.currentBalance - (data.embargoAmount || 0)),
      });

      // Create embargo movement
      const embargoMovement = {
        accountType: account.type,
        accountNumber: account.number,
        operationNumber: MovementDatabase.generateOperationNumber(),
        operationDate: new Date().toISOString().split('T')[0],
        userCode: 'USU001',
        movementType: 'EM', // Embargo
        amount: data.embargoType === 'total' ? account.currentBalance : data.embargoAmount || 0,
        status: EntityStatus.ACTIVE,
        description: `${data.embargoType === 'total' ? 'Total' : 'Partial'} embargo - ${data.courtOrder}`,
        reference: data.reference,
      };

      MovementDatabase.saveMovement(embargoMovement);

      return HttpResponse.json({ account: updatedAccount });
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
  }),

  // Remove embargo
  http.delete('/api/accounts/:accountNumber/embargo', async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { accountNumber } = params;
    const account = AccountDatabase.findByNumber(accountNumber as string);

    if (!account) {
      return HttpResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    if (!account.isEmbargoed) {
      return HttpResponse.json(
        { error: 'Account does not have an active embargo' },
        { status: 400 }
      );
    }

    const updatedAccount = AccountDatabase.updateAccount(accountNumber as string, {
      isEmbargoed: false,
      embargoAmount: undefined,
      embargoReference: undefined,
      availableBalance: account.currentBalance,
    });

    // Create unembargo movement
    const unembargoMovement = {
      accountType: account.type,
      accountNumber: account.number,
      operationNumber: MovementDatabase.generateOperationNumber(),
      operationDate: new Date().toISOString().split('T')[0],
      userCode: 'USU001',
      movementType: 'DE', // Unembargo
      amount: 0,
      status: EntityStatus.ACTIVE,
      description: 'Embargo removed',
    };

    MovementDatabase.saveMovement(unembargoMovement);

    return HttpResponse.json({ account: updatedAccount });
  }),

  // Deactivate account
  http.put('/api/accounts/:accountNumber/deactivate', async ({ params, request }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const { accountNumber } = params;
      (await request.json()) as DeactivateAccountRequest; // Parse request but don't use data for now

      const { canDeactivate, reason } = AccountDatabase.canDeactivateAccount(
        accountNumber as string
      );
      if (!canDeactivate) {
        return HttpResponse.json({ error: reason }, { status: 400 });
      }

      const updatedAccount = AccountDatabase.updateAccount(accountNumber as string, {
        status: EntityStatus.INACTIVE,
        blockDate: new Date().toISOString().split('T')[0],
      });

      return HttpResponse.json({ account: updatedAccount });
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
  }),

  // Reactivate account
  http.put('/api/accounts/:accountNumber/reactivate', async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const { accountNumber } = params;
    const account = AccountDatabase.findByNumber(accountNumber as string);

    if (!account) {
      return HttpResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    if (account.status === EntityStatus.ACTIVE) {
      return HttpResponse.json({ error: 'Account is already active' }, { status: 400 });
    }

    const updatedAccount = AccountDatabase.updateAccount(accountNumber as string, {
      status: EntityStatus.ACTIVE,
      blockDate: undefined,
    });

    return HttpResponse.json({ account: updatedAccount });
  }),
];
