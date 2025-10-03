/**
 * Movement database mock operations
 */

import { EntityStatus } from '../../types/common.types';
import { Movement } from '../../types/movement.types';

export class MovementDatabase {
  private static MOVEMENTS_KEY = 'T_Movimientos';
  private static OPERATION_COUNTER_KEY = 'operation_counter';

  static getMovements(): Movement[] {
    try {
      const stored = localStorage.getItem(this.MOVEMENTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static saveMovement(movement: Movement): Movement {
    const movements = this.getMovements();
    movements.push(movement);
    localStorage.setItem(this.MOVEMENTS_KEY, JSON.stringify(movements));
    return movement;
  }

  static getAccountMovements(accountNumber: string, limit = 20): Movement[] {
    return this.getMovements()
      .filter((mov) => mov.accountNumber === accountNumber)
      .sort((a, b) => new Date(b.operationDate).getTime() - new Date(a.operationDate).getTime())
      .slice(0, limit);
  }

  static getMovementsByDateRange(
    accountNumber: string,
    startDate: string,
    endDate: string
  ): Movement[] {
    return this.getMovements()
      .filter(
        (mov) =>
          mov.accountNumber === accountNumber &&
          mov.operationDate >= startDate &&
          mov.operationDate <= endDate
      )
      .sort((a, b) => new Date(b.operationDate).getTime() - new Date(a.operationDate).getTime());
  }

  static getTodayMovements(): Movement[] {
    const today = new Date().toISOString().split('T')[0];
    return this.getMovements()
      .filter((mov) => mov.operationDate === today)
      .sort((a, b) => new Date(b.operationDate).getTime() - new Date(a.operationDate).getTime());
  }

  static getMovementsByType(movementType: string): Movement[] {
    return this.getMovements().filter((mov) => mov.movementType === movementType);
  }

  static generateOperationNumber(): number {
    const current = localStorage.getItem(this.OPERATION_COUNTER_KEY);
    const next = current ? parseInt(current, 10) + 1 : 1;
    localStorage.setItem(this.OPERATION_COUNTER_KEY, next.toString());
    return next;
  }

  static getActiveMovements(): Movement[] {
    return this.getMovements().filter((mov) => mov.status === EntityStatus.ACTIVE);
  }

  static updateMovementStatus(
    accountNumber: string,
    operationNumber: number,
    status: EntityStatus
  ): Movement | null {
    const movements = this.getMovements();
    const index = movements.findIndex(
      (mov) => mov.accountNumber === accountNumber && mov.operationNumber === operationNumber
    );

    if (index === -1) {
      return null;
    }

    movements[index] = { ...movements[index], status };
    localStorage.setItem(this.MOVEMENTS_KEY, JSON.stringify(movements));
    return movements[index];
  }

  // Business calculations
  static calculateDailyBalance(accountNumber: string, date: string): number {
    const movements = this.getMovements().filter(
      (mov) =>
        mov.accountNumber === accountNumber &&
        mov.operationDate <= date &&
        mov.status === EntityStatus.ACTIVE
    );

    return movements.reduce((balance, mov) => {
      switch (mov.movementType) {
        case 'DP': // Deposit
          return balance + mov.amount;
        case 'RT': // Withdrawal
          return balance - mov.amount;
        case 'TF': // Transfer (depends on in/out)
          // This would need more context about transfer direction
          return balance;
        default:
          return balance;
      }
    }, 0);
  }

  static getDailyOperationsSummary(date: string) {
    const movements = this.getMovements().filter(
      (mov) => mov.operationDate === date && mov.status === EntityStatus.ACTIVE
    );

    const summary = {
      totalOperations: movements.length,
      deposits: {
        count: 0,
        amount: 0,
      },
      withdrawals: {
        count: 0,
        amount: 0,
      },
      transfers: {
        count: 0,
        amount: 0,
      },
    };

    movements.forEach((mov) => {
      switch (mov.movementType) {
        case 'DP':
          summary.deposits.count++;
          summary.deposits.amount += mov.amount;
          break;
        case 'RT':
          summary.withdrawals.count++;
          summary.withdrawals.amount += mov.amount;
          break;
        case 'TF':
          summary.transfers.count++;
          summary.transfers.amount += mov.amount;
          break;
      }
    });

    return summary;
  }
}
