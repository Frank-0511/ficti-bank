/**
 * Account database mock operations
 */

import { ACCOUNT_TYPES } from '../../constants/account.constants';
import { Account } from '../../types/account.types';
import { EntityStatus } from '../../types/common.types';

export class AccountDatabase {
  private static ACCOUNTS_KEY = 'T_Cuentas';
  private static ACCOUNT_COUNTER_KEY = 'account_counter';

  static getAccounts(): Account[] {
    try {
      const stored = localStorage.getItem(this.ACCOUNTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static saveAccount(account: Account): Account {
    const accounts = this.getAccounts();
    accounts.push(account);
    localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
    return account;
  }

  static updateAccount(accountNumber: string, updates: Partial<Account>): Account | null {
    const accounts = this.getAccounts();
    const index = accounts.findIndex((acc) => acc.number === accountNumber);

    if (index === -1) {
      return null;
    }

    accounts[index] = { ...accounts[index], ...updates };
    localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
    return accounts[index];
  }

  static findByNumber(accountNumber: string): Account | null {
    return this.getAccounts().find((acc) => acc.number === accountNumber) || null;
  }

  static findByCustomerCode(customerCode: string): Account[] {
    return this.getAccounts().filter((acc) => acc.customerCode === customerCode);
  }

  static generateAccountNumber(accountType: string): string {
    const counter = this.getNextCounter();
    return `${accountType}${counter.toString().padStart(10, '0')}`;
  }

  static getActiveAccounts(): Account[] {
    return this.getAccounts().filter((acc) => acc.status === EntityStatus.ACTIVE);
  }

  static getAccountsByType(accountType: string): Account[] {
    return this.getAccounts().filter((acc) => acc.type === accountType);
  }

  private static getNextCounter(): number {
    const current = localStorage.getItem(this.ACCOUNT_COUNTER_KEY);
    const next = current ? parseInt(current, 10) + 1 : 1;
    localStorage.setItem(this.ACCOUNT_COUNTER_KEY, next.toString());
    return next;
  }

  // Business rule validations
  static canCloseAccount(accountNumber: string): { canClose: boolean; reason?: string } {
    const account = this.findByNumber(accountNumber);

    if (!account) {
      return { canClose: false, reason: 'Account not found' };
    }

    if (account.status !== EntityStatus.ACTIVE) {
      return { canClose: false, reason: 'Account is not active' };
    }

    if (account.currentBalance !== 0) {
      return { canClose: false, reason: 'Account must have zero balance' };
    }

    if (account.isEmbargoed) {
      return { canClose: false, reason: 'Account has active embargo' };
    }

    return { canClose: true };
  }

  static canEmbargoAccount(accountNumber: string): { canEmbargo: boolean; reason?: string } {
    const account = this.findByNumber(accountNumber);

    if (!account) {
      return { canEmbargo: false, reason: 'Account not found' };
    }

    if (account.status !== EntityStatus.ACTIVE) {
      return { canEmbargo: false, reason: 'Account is not active' };
    }

    if (account.isEmbargoed) {
      return { canEmbargo: false, reason: 'Account already has an embargo' };
    }

    return { canEmbargo: true };
  }

  static canDeactivateAccount(accountNumber: string): { canDeactivate: boolean; reason?: string } {
    const account = this.findByNumber(accountNumber);

    if (!account) {
      return { canDeactivate: false, reason: 'Account not found' };
    }

    if (account.status !== EntityStatus.ACTIVE) {
      return { canDeactivate: false, reason: 'Account is not active' };
    }

    // Only savings and checking accounts can be deactivated
    if (![ACCOUNT_TYPES.SAVINGS, ACCOUNT_TYPES.CHECKING].includes(account.type as any)) {
      return {
        canDeactivate: false,
        reason: 'Only savings and checking accounts can be deactivated',
      };
    }

    return { canDeactivate: true };
  }

  static calculateAvailableBalance(account: Account): number {
    if (!account.isEmbargoed) {
      return account.currentBalance;
    }

    // Total embargo
    if (account.embargoAmount === null || account.embargoAmount === undefined) {
      return 0;
    }

    // Partial embargo
    return Math.max(0, account.currentBalance - account.embargoAmount);
  }

  static shouldAutoDeactivate(account: Account): boolean {
    if (account.type !== ACCOUNT_TYPES.SAVINGS && account.type !== ACCOUNT_TYPES.CHECKING) {
      return false;
    }

    if (account.currentBalance !== 0) {
      return false;
    }

    if (!account.lastMovementDate) {
      return false;
    }

    const lastMovement = new Date(account.lastMovementDate);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    return lastMovement < threeMonthsAgo;
  }
}
