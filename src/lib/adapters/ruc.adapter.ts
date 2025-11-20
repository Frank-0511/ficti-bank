import { RucApiResponse, RucData } from '../types/ruc.types';

export function rucAdapter(response: RucApiResponse): RucData {
  return {
    ruc: response.data.numero,
    businessName: response.data.nombre_o_razon_social,
    contributorType: response.data.tipo_contribuyente,
    taxpayerStatus: response.data.estado,
    addressCondition: response.data.condicion,
    department: response.data.departamento,
    province: response.data.provincia,
    district: response.data.distrito,
    address: response.data.direccion,
    fullAddress: response.data.direccion_completa,
    ubigeo: response.data.ubigeo_sunat,
    ubigeoArray: response.data.ubigeo,
    retentionAgent: response.data.es_agente_de_retencion,
    legalRepresentatives: [], // Se debe setear luego en el servicio
  };
}
