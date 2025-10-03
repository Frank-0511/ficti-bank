/**
 * Account service - handles account CRUD operations
 */

import { AccountResponse, AccountsResponse, CreateAccountRequest } from '../../types/account.types';

export class AccountService {
  private static readonly BASE_URL = '/api/accounts';

  static async getAccounts(): Promise<AccountsResponse> {
    const response = await fetch(this.BASE_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch accounts: ${response.statusText}`);
    }

    return response.json();
  }

  static async getAccountByNumber(accountNumber: string): Promise<AccountResponse> {
    const response = await fetch(`${this.BASE_URL}/${accountNumber}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch account: ${response.statusText}`);
    }

    return response.json();
  }

  static async getAccountsByCustomer(customerCode: string): Promise<AccountsResponse> {
    const response = await fetch(`${this.BASE_URL}/customer/${customerCode}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch customer accounts: ${response.statusText}`);
    }

    return response.json();
  }

  static async createAccount(data: CreateAccountRequest): Promise<AccountResponse> {
    const response = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to create account: ${response.statusText}`);
    }

    return response.json();
  }

  static async getAccountsByType(accountType: string): Promise<AccountsResponse> {
    const response = await fetch(`${this.BASE_URL}/type/${accountType}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch accounts by type: ${response.statusText}`);
    }

    return response.json();
  }
}
