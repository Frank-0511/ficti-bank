import { RucRepresentanteApiResponse, RucRepresentanteData } from '../types';
import { rucRepresentanteAdapter } from './ruc-representante.adapter';

export async function fetchLegalRepresentatives(ruc: string): Promise<RucRepresentanteData[]> {
  const response = await fetch('/api/ruc-representante', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ruc }),
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
