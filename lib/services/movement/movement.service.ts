/**
 * Movement service - handles movement-related API calls
 */

import {
  CreateMovementRequest,
  MovementResponse,
  MovementsResponse,
} from '../../types/movement.types';

export class MovementService {
  private static readonly BASE_URL = '/api/movements';

  static async getMovements(): Promise<MovementsResponse> {
    const response = await fetch(this.BASE_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch movements: ${response.statusText}`);
    }

    return response.json();
  }

  static async getAccountMovements(accountNumber: string, limit = 20): Promise<MovementsResponse> {
    const response = await fetch(`${this.BASE_URL}/account/${accountNumber}?limit=${limit}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch account movements: ${response.statusText}`);
    }

    return response.json();
  }

  static async createMovement(data: CreateMovementRequest): Promise<MovementResponse> {
    const response = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to create movement: ${response.statusText}`);
    }

    return response.json();
  }

  static async getTodayMovements(): Promise<MovementsResponse> {
    const response = await fetch(`${this.BASE_URL}/today`);

    if (!response.ok) {
      throw new Error(`Failed to fetch today's movements: ${response.statusText}`);
    }

    return response.json();
  }

  static async getMovementsByDateRange(
    accountNumber: string,
    startDate: string,
    endDate: string
  ): Promise<MovementsResponse> {
    const params = new URLSearchParams({
      startDate,
      endDate,
    });

    const response = await fetch(`${this.BASE_URL}/account/${accountNumber}/range?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch movements by date range: ${response.statusText}`);
    }

    return response.json();
  }

  static async getDailyOperationsSummary(date: string): Promise<{
    summary: {
      totalOperations: number;
      deposits: { count: number; amount: number };
      withdrawals: { count: number; amount: number };
      transfers: { count: number; amount: number };
    };
  }> {
    const response = await fetch(`${this.BASE_URL}/summary/${date}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch daily operations summary: ${response.statusText}`);
    }

    return response.json();
  }
}
