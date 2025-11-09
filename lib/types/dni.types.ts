export interface DniApiResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    numero: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    nombre_completo: string;
    departamento: string;
    provincia: string;
    distrito: string;
    direccion: string;
    direccion_completa: string;
    ubigeo_reniec: string;
    ubigeo_sunat: string;
    ubigeo: string[];
    fecha_nacimiento: string;
    sexo: string;
  };
}

export interface DniData {
  dni: string;
  firstName: string;
  lastName: string;
  fullName: string;
  department: string;
  province: string;
  district: string;
  address: string;
  fullAddress: string;
  ubigeoReniec: string;
  ubigeoSunat: string;
  ubigeoArray: string[];
  birthDate: string;
  gender: string;
}
