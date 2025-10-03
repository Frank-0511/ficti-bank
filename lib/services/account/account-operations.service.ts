/**
 * Account operations service - handles account operations (close, embargo, deactivate)
 */

import {
  AccountResponse,
  CloseAccountRequest,
  DeactivateAccountRequest,
  EmbargoAccountRequest,
} from '../../types/account.types';

export class AccountOperationsService {
  private static readonly BASE_URL = '/api/accounts';

  static async closeAccount(
    accountNumber: string,
    data?: CloseAccountRequest
  ): Promise<AccountResponse> {
    const response = await fetch(`${this.BASE_URL}/${accountNumber}/close`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data || {}),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to close account: ${response.statusText}`);
    }

    return response.json();
  }

  static async embargoAccount(
    accountNumber: string,
    data: EmbargoAccountRequest
  ): Promise<AccountResponse> {
    const response = await fetch(`${this.BASE_URL}/${accountNumber}/embargo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to embargo account: ${response.statusText}`);
    }

    return response.json();
  }

  static async removeEmbargo(accountNumber: string): Promise<AccountResponse> {
    const response = await fetch(`${this.BASE_URL}/${accountNumber}/embargo`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to remove embargo: ${response.statusText}`);
    }

    return response.json();
  }

  static async deactivateAccount(
    accountNumber: string,
    data: DeactivateAccountRequest
  ): Promise<AccountResponse> {
    const response = await fetch(`${this.BASE_URL}/${accountNumber}/deactivate`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to deactivate account: ${response.statusText}`);
    }

    return response.json();
  }

  static async reactivateAccount(accountNumber: string): Promise<AccountResponse> {
    const response = await fetch(`${this.BASE_URL}/${accountNumber}/reactivate`, {
      method: 'PUT',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to reactivate account: ${response.statusText}`);
    }

    return response.json();
  }
}
