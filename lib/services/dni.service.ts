import { dniAdapter } from '../adapters';
import { DniData } from '../types';

const API_URL = '/api/dni';

export async function fetchDniData(dni: string): Promise<DniData> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ dni }),
  });
  if (!res.ok) {
    throw new Error('Error consultando DNI');
  }
  const json = await res.json();
  if (!json.success || !json.data) {
    throw new Error(json.message || 'Error consultando DNI');
  }
  // Adaptar la respuesta a DniData usando el adapter
  return dniAdapter(json);
}
