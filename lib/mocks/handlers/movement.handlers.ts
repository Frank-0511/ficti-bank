/**
 * Movement MSW handlers
 */

import { http, HttpResponse } from 'msw';
import { EntityStatus } from '../../types/common.types';
import { CreateMovementRequest } from '../../types/movement.types';
import { AccountDatabase } from '../database/account.database';
import { MovementDatabase } from '../database/movement.database';

export const movementHandlers = [
  // Get all movements
  http.get('/api/movements', async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const movements = MovementDatabase.getMovements();
    return HttpResponse.json({ movements });
  }),

  // Get movements by account
  http.get('/api/movements/account/:accountNumber', async ({ params, request }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { accountNumber } = params;
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);

    // Verify account exists
    const account = AccountDatabase.findByNumber(accountNumber as string);
    if (!account) {
      return HttpResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const movements = MovementDatabase.getAccountMovements(accountNumber as string, limit);
    return HttpResponse.json({ movements });
  }),

  // Get movements by date range
  http.get('/api/movements/account/:accountNumber/range', async ({ params, request }) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const { accountNumber } = params;
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    if (!startDate || !endDate) {
      return HttpResponse.json({ error: 'Start date and end date are required' }, { status: 400 });
    }

    // Verify account exists
    const account = AccountDatabase.findByNumber(accountNumber as string);
    if (!account) {
      return HttpResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const movements = MovementDatabase.getMovementsByDateRange(
      accountNumber as string,
      startDate,
      endDate
    );
    return HttpResponse.json({ movements });
  }),

  // Get today's movements
  http.get('/api/movements/today', async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const movements = MovementDatabase.getTodayMovements();
    return HttpResponse.json({ movements });
  }),

  // Get daily operations summary
  http.get('/api/movements/summary/:date', async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const { date } = params;
    const summary = MovementDatabase.getDailyOperationsSummary(date as string);
    return HttpResponse.json({ summary });
  }),

  // Create movement
  http.post('/api/movements', async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Longer delay for movement creation

    try {
      const data = (await request.json()) as CreateMovementRequest;

      // Verify account exists and is active
      const account = AccountDatabase.findByNumber(data.accountNumber);
      if (!account) {
        return HttpResponse.json({ error: 'Account not found' }, { status: 404 });
      }

      if (account.status !== EntityStatus.ACTIVE) {
        return HttpResponse.json({ error: 'Account is not active' }, { status: 400 });
      }

      // Validate amount
      if (data.amount <= 0) {
        return HttpResponse.json({ error: 'Amount must be greater than zero' }, { status: 400 });
      }

      // Validate movement based on type
      if (data.movementType === 'RT') {
        // Withdrawal
        const availableBalance = AccountDatabase.calculateAvailableBalance(account);

        if (account.type === 'CA') {
          // Savings account
          if (data.amount > availableBalance) {
            return HttpResponse.json({ error: 'Insufficient funds' }, { status: 400 });
          }
        } else if (account.type === 'CC') {
          // Checking account
          // For checking accounts, consider overdraft limit
          const maxWithdrawal = availableBalance + (account.overdraftLimit || 0);
          if (data.amount > maxWithdrawal) {
            return HttpResponse.json({ error: 'Amount exceeds overdraft limit' }, { status: 400 });
          }
        } else if (account.type === 'PF') {
          // Term deposit
          return HttpResponse.json(
            { error: 'Withdrawals not allowed on term deposit accounts' },
            { status: 400 }
          );
        }
      }

      // Create movement
      const newMovement = {
        accountType: account.type,
        accountNumber: data.accountNumber,
        operationNumber: MovementDatabase.generateOperationNumber(),
        operationDate: new Date().toISOString().split('T')[0],
        userCode: 'USU001', // In real app, get from auth context
        movementType: data.movementType,
        amount: data.amount,
        status: EntityStatus.ACTIVE,
        description: data.description || `${data.movementType} operation`,
        reference: data.reference,
        relatedAccountNumber: data.relatedAccountNumber,
      };

      const savedMovement = MovementDatabase.saveMovement(newMovement);

      // Update account balance
      let newBalance = account.currentBalance;

      if (data.movementType === 'DP') {
        // Deposit
        newBalance += data.amount;
      } else if (data.movementType === 'RT') {
        // Withdrawal
        newBalance -= data.amount;
      }

      // Update account
      const updatedAccount = AccountDatabase.updateAccount(data.accountNumber, {
        currentBalance: newBalance,
        availableBalance: account.isEmbargoed
          ? AccountDatabase.calculateAvailableBalance({ ...account, currentBalance: newBalance })
          : newBalance,
        lastMovementDate: new Date().toISOString().split('T')[0],
      });

      return HttpResponse.json({
        movement: savedMovement,
        account: updatedAccount,
      });
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
  }),

  // Cancel movement (change status to cancelled)
  http.put('/api/movements/:accountNumber/:operationNumber/cancel', async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const { accountNumber, operationNumber } = params;

    const updatedMovement = MovementDatabase.updateMovementStatus(
      accountNumber as string,
      parseInt(operationNumber as string, 10),
      EntityStatus.CANCELLED
    );

    if (!updatedMovement) {
      return HttpResponse.json({ error: 'Movement not found' }, { status: 404 });
    }

    return HttpResponse.json({ movement: updatedMovement });
  }),
];
