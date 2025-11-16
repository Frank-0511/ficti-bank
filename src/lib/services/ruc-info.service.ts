import { rucAdapter } from '../adapters';
import { RucApiResponse, RucData } from '../types';

const API_URL = `${import.meta.env.VITE_API_URL_FACILIZA}/ruc/info`;
const API_TOKEN = import.meta.env.VITE_TOKEN_FACILIZA;

export async function fetchRucInfo(ruc: string): Promise<RucData> {
  const rucResponse = await fetch(`${API_URL}/${ruc}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
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
