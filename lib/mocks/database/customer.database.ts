/**
 * Customer database mock operations
 */

import { EntityStatus } from '../../types/common.types';
import { Customer } from '../../types/customer.types';

export class CustomerDatabase {
  private static CUSTOMERS_KEY = 'T_Cliente';
  private static CUSTOMER_COUNTER_KEY = 'customer_counter';

  static getCustomers(): Customer[] {
    try {
      const stored = localStorage.getItem(this.CUSTOMERS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static saveCustomer(customer: Customer): Customer {
    const customers = this.getCustomers();
    customers.push(customer);
    localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(customers));
    return customer;
  }

  static updateCustomer(code: string, updates: Partial<Customer>): Customer | null {
    const customers = this.getCustomers();
    const index = customers.findIndex((c) => c.code === code);

    if (index === -1) {
      return null;
    }

    customers[index] = { ...customers[index], ...updates };
    localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(customers));
    return customers[index];
  }

  static findByCode(code: string): Customer | null {
    return this.getCustomers().find((c) => c.code === code) || null;
  }

  static findByDni(dni: string): Customer | null {
    return this.getCustomers().find((c) => c.dni === dni) || null;
  }

  static findByEmail(email: string): Customer | null {
    return this.getCustomers().find((c) => c.email === email) || null;
  }

  static generateCustomerCode(): string {
    const counter = this.getNextCounter();
    return `CLI${counter.toString().padStart(7, '0')}`;
  }

  static getActiveCustomers(): Customer[] {
    return this.getCustomers().filter((c) => c.status === EntityStatus.ACTIVE);
  }

  static deleteCustomer(code: string): boolean {
    const customers = this.getCustomers();
    const filteredCustomers = customers.filter((c) => c.code !== code);

    if (filteredCustomers.length === customers.length) {
      return false;
    }

    localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(filteredCustomers));
    return true;
  }

  private static getNextCounter(): number {
    const current = localStorage.getItem(this.CUSTOMER_COUNTER_KEY);
    const next = current ? parseInt(current, 10) + 1 : 1;
    localStorage.setItem(this.CUSTOMER_COUNTER_KEY, next.toString());
    return next;
  }

  // Utility methods for business rules
  static isValidAge(birthDate: string): boolean {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1 >= 18;
    }

    return age >= 18;
  }

  static isDniUnique(dni: string, excludeCode?: string): boolean {
    const customers = this.getCustomers();
    return !customers.some((c) => c.dni === dni && c.code !== excludeCode);
  }

  static isEmailUnique(email: string, excludeCode?: string): boolean {
    const customers = this.getCustomers();
    return !customers.some((c) => c.email === email && c.code !== excludeCode);
  }
}
