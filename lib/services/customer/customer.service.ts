/**
 * Customer service - handles all customer-related API calls
 */

import {
  CreateCustomerRequest,
  CustomerResponse,
  CustomersResponse,
  UpdateCustomerRequest,
} from '../../types/customer.types';

export class CustomerService {
  private static readonly BASE_URL = '/api/customers';

  static async getCustomers(): Promise<CustomersResponse> {
    const response = await fetch(this.BASE_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch customers: ${response.statusText}`);
    }

    return response.json();
  }

  static async getCustomerByCode(code: string): Promise<CustomerResponse> {
    const response = await fetch(`${this.BASE_URL}/${code}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch customer: ${response.statusText}`);
    }

    return response.json();
  }

  static async createCustomer(data: CreateCustomerRequest): Promise<CustomerResponse> {
    const response = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to create customer: ${response.statusText}`);
    }

    return response.json();
  }

  static async updateCustomer(
    code: string,
    data: UpdateCustomerRequest
  ): Promise<CustomerResponse> {
    const response = await fetch(`${this.BASE_URL}/${code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to update customer: ${response.statusText}`);
    }

    return response.json();
  }

  static async deleteCustomer(code: string): Promise<{ success: boolean }> {
    const response = await fetch(`${this.BASE_URL}/${code}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to delete customer: ${response.statusText}`);
    }

    return response.json();
  }

  static async searchCustomers(query: string): Promise<CustomersResponse> {
    const response = await fetch(`${this.BASE_URL}/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`Failed to search customers: ${response.statusText}`);
    }

    return response.json();
  }
}
