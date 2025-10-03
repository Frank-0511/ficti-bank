/**
 * Ubigeo service - handles ubigeo-related API calls
 */

import { Ubigeo } from '../../types/customer.types';

export interface UbigeoResponse {
  ubigeos: Ubigeo[];
}

export interface DepartmentsResponse {
  departments: string[];
}

export interface ProvincesResponse {
  provinces: string[];
}

export interface DistrictsResponse {
  districts: string[];
}

export class UbigeoService {
  private static readonly BASE_URL = '/api/ubigeo';

  static async getUbigeos(): Promise<UbigeoResponse> {
    const response = await fetch(this.BASE_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch ubigeos: ${response.statusText}`);
    }

    return response.json();
  }

  static async getDepartments(): Promise<DepartmentsResponse> {
    const response = await fetch(`${this.BASE_URL}/departments`);

    if (!response.ok) {
      throw new Error(`Failed to fetch departments: ${response.statusText}`);
    }

    return response.json();
  }

  static async getProvinces(department: string): Promise<ProvincesResponse> {
    const response = await fetch(
      `${this.BASE_URL}/provinces?department=${encodeURIComponent(department)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch provinces: ${response.statusText}`);
    }

    return response.json();
  }

  static async getDistricts(department: string, province: string): Promise<DistrictsResponse> {
    const params = new URLSearchParams({
      department,
      province,
    });

    const response = await fetch(`${this.BASE_URL}/districts?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch districts: ${response.statusText}`);
    }

    return response.json();
  }

  static async getUbigeoByCode(code: string): Promise<{ ubigeo: Ubigeo }> {
    const response = await fetch(`${this.BASE_URL}/${code}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ubigeo: ${response.statusText}`);
    }

    return response.json();
  }
}
