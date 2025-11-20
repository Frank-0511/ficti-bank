import { rucRepresentanteAdapter } from '../adapters/ruc-representante.adapter';
import { RucRepresentanteApiResponse, RucRepresentanteData } from '../types/ruc.types';

const API_URL = `${import.meta.env.VITE_API_URL_FACILIZA}/ruc/representante`;
const API_TOKEN = import.meta.env.VITE_TOKEN_FACILIZA;

export async function fetchLegalRepresentatives(ruc: string): Promise<RucRepresentanteData[]> {
  const response = await fetch(`${API_URL}/${ruc}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 200) {
    throw new Error('Error consultando representante legal');
  }
  const repJson: RucRepresentanteApiResponse = await response.json();
  if (repJson.status !== 200 || !repJson.data) {
    throw new Error(repJson.message || 'Error consultando representante legal');
  }
  return rucRepresentanteAdapter(repJson);
}
