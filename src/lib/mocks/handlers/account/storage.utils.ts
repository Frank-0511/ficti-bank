import { Account, AccountMovement } from '@/lib/types';
import { ACCOUNTS_STORAGE_KEY, MOVEMENTS_STORAGE_KEY } from '../../data';

export function getMovementsFromStorage(): AccountMovement[] {
  const stored = globalThis.localStorage?.getItem(MOVEMENTS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored) as AccountMovement[];
  }
  return [];
}

export function setMovementsToStorage(movements: Record<string, AccountMovement[]>): void {
  globalThis.localStorage?.setItem(MOVEMENTS_STORAGE_KEY, JSON.stringify(movements));
}

export function getAccountsFromStorage(): Account[] {
  const stored = globalThis.localStorage?.getItem(ACCOUNTS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored) as Account[];
  }
  return [];
}

export function setAccountsToStorage(accounts: Account[]): void {
  globalThis.localStorage?.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
}
