export interface RucApiResponse {
  status: number;
  message: string;
  data: {
    numero: string;
    nombre_o_razon_social: string;
    tipo_contribuyente: string;
    estado: string;
    condicion: string;
    departamento: string;
    provincia: string;
    distrito: string;
    direccion: string;
    direccion_completa: string;
    ubigeo_sunat: string;
    ubigeo: string[];
    es_agente_de_retencion: string;
  };
}

export interface RucData {
  ruc: string;
  businessName: string;
  contributorType: string;
  taxpayerStatus: string;
  addressCondition: string;
  department: string;
  province: string;
  district: string;
  address: string;
  fullAddress: string;
  ubigeo: string;
  ubigeoArray: string[];
  retentionAgent: string;
  legalRepresentatives: RucRepresentanteData[];
}

export interface RucRepresentanteApiResponse {
  status: number;
  message: string;
  data: {
    tipo_de_documento: string;
    numero_de_documento: string;
    nombre: string;
    cargo: string;
    fecha_desde: string;
  }[];
}

export interface RucRepresentanteData {
  documentType: string;
  documentNumber: string;
  name: string;
  position: string;
  startDate: string;
}
