import { ENTITY_STATUS } from '../constants/status.constants';
import { PersonType } from './common.types';

export interface Client {
  id: string;
  code: string;
  personType: PersonType; // Natural o Jurídica
  // Datos de persona natural
  firstName?: string;
  lastName?: string;
  dni?: string;
  birthDate?: string;
  // Datos de persona jurídica
  businessName?: string;
  ruc?: string;
  legalRepresentative?: string;
  // Datos de contacto
  email: string;
  phone: string;
  address: string;
  district: string;
  province: string;
  department: string;
  // Estado
  status: typeof ENTITY_STATUS.ACTIVE | typeof ENTITY_STATUS.INACTIVE;
  registeredAt: string;
  registeredBy: string; // ID del usuario que registró
}

export interface ClientFilters {
  status?: string;
  personType?: PersonType;
}
