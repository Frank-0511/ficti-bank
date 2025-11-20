import { dniAdapter } from '../adapters/dni.adapter';

const API_URL = `${import.meta.env.VITE_API_URL_FACILIZA}/dni/info`;
const API_TOKEN = import.meta.env.VITE_TOKEN_FACILIZA;

export async function fetchDniData(dni: string): Promise<any> {
  const response = await fetch(`${API_URL}/${dni}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 200) {
    throw new Error('Error consultando DNI');
  }
  const data = await response.json();
  if (data.status !== 200 || !data.data) {
    throw new Error(data.message || 'Error consultando DNI');
  }
  return dniAdapter(data);
}
