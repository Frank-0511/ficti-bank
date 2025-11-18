import { Account, AccountMovement, MovementType } from '@/lib/types';
import { ACCOUNTS_STORAGE_KEY, MOVEMENTS_STORAGE_KEY } from '../../data';

export function getMovementsFromStorage(): AccountMovement[] {
  const stored = globalThis.localStorage?.getItem(MOVEMENTS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored) as AccountMovement[];
  }
  return [];
}

export function setMovementsToStorage(movements: AccountMovement[]): void {
  globalThis.localStorage?.setItem(MOVEMENTS_STORAGE_KEY, JSON.stringify(movements));
}

export function addMovement(
  accountNumber: string,
  type: MovementType,
  amount: number,
  balance: number,
  description?: string
): void {
  const movements = getMovementsFromStorage();
  const newMovement: AccountMovement = {
    id: `MOV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date: new Date().toISOString(),
    type,
    amount,
    balance,
    description,
    accountNumber,
  };
  movements.push(newMovement);
  setMovementsToStorage(movements);
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
