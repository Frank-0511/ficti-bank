import { RucRepresentanteApiResponse, RucRepresentanteData } from '../types/ruc.types';

export function rucRepresentanteAdapter(
  response: RucRepresentanteApiResponse
): RucRepresentanteData[] {
  if (!response.data) {
    return [];
  }
  return response.data.map((item) => ({
    documentType: item.tipo_de_documento,
    documentNumber: item.numero_de_documento,
    name: item.nombre,
    position: item.cargo,
    startDate: item.fecha_desde,
  }));
}
