import { RucApiResponse, RucData } from '../types';
import { rucAdapter } from './ruc.adapter';

const API_URL = '/api/ruc';

export async function fetchRucInfo(ruc: string): Promise<RucData> {
  const rucResponse = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ruc }),
  });

  if (rucResponse.status !== 200) {
    throw new Error('Error consultando RUC');
  }
  const repJson: RucApiResponse = await rucResponse.json();
  if (repJson.status !== 200 || !repJson.data) {
    throw new Error(repJson.message || 'Error consultando RUC');
  }

  return rucAdapter(repJson);
}
