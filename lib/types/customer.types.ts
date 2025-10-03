/**
 * Customer and Ubigeo related types
 */

import { EntityStatus } from './common.types';

export interface Ubigeo {
  code: string; // CodUbigeo VARCHAR(6)
  department: string; // Depart VARCHAR(50)
  province: string; // Provin VARCHAR(50)
  district: string; // Distrit VARCHAR(50)
}

export interface Customer {
  code: string; // CodCliente VARCHAR(10)
  lastName: string; // Apellidos VARCHAR(100)
  firstName: string; // Nombres VARCHAR(100)
  dni: string; // DNI VARCHAR(8)
  birthDate: string; // Fecha_Nac DATE
  address: string; // Direccion VARCHAR(100)
  ubigeoCode: string; // CodUbigeo VARCHAR(6)
  phone: string; // Telefonos VARCHAR(9)
  mobile: string; // Movil VARCHAR(11)
  email: string; // e_mail VARCHAR(50)
  registrationDate: string; // Fech_reg DATE
  userCode: string; // CodUsu VARCHAR(10) - quien registró
  status: EntityStatus; // Estado CHAR(1)
}

export interface CreateCustomerRequest {
  lastName: string;
  firstName: string;
  dni: string;
  birthDate: string;
  address: string;
  ubigeoCode: string;
  phone: string;
  mobile: string;
  email: string;
}

export interface UpdateCustomerRequest {
  address?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  status?: EntityStatus;
}

export interface CustomerResponse {
  customer: Customer;
}

export interface CustomersResponse {
  customers: Customer[];
}
