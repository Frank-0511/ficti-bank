import { Account } from '../types/account.types';

// Servicio real para inactivar cuenta (mock api)
export async function inactivateAccount(accountNumber: string): Promise<Account> {
  const res = await fetch(`/api/accounts/${accountNumber}/inactivate`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error('No se pudo inactivar la cuenta');
  }
  const data = await res.json();
  return data.data;
}
