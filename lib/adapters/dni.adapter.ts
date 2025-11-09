import { DniApiResponse, DniData } from '../types/dni.types';

export function dniAdapter(response: DniApiResponse): DniData {
  return {
    dni: response.data.numero,
    firstName: response.data.nombres,
    lastName: `${response.data.apellido_paterno} ${response.data.apellido_materno}`.trim(),
    fullName: response.data.nombre_completo,
    department: response.data.departamento,
    province: response.data.provincia,
    district: response.data.distrito,
    address: response.data.direccion,
    fullAddress: response.data.direccion_completa,
    ubigeoReniec: response.data.ubigeo_reniec,
    ubigeoSunat: response.data.ubigeo_sunat,
    ubigeoArray: response.data.ubigeo,
    birthDate: response.data.fecha_nacimiento,
    gender: response.data.sexo,
  };
}
