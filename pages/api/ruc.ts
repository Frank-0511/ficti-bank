import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL = process.env.API_URL_FACILIZA;
const API_TOKEN = process.env.TOKEN_FACILIZA;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  const { ruc } = req.body;
  if (!ruc) {
    return res.status(400).json({ error: 'RUC requerido' });
  }
  try {
    if (!API_TOKEN) {
      return res.status(500).json({ error: 'Token de FACILIZA no configurado en el entorno' });
    }
    const apiRes = await fetch(`${API_URL}/ruc/info/${ruc}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_TOKEN}` },
    });
    if (apiRes.status !== 200) {
      const errorText = await apiRes.text();
      return res.status(502).json({ error: 'Error consultando RUC externo', details: errorText });
    }
    const json = await apiRes.json();
    // Si necesitas adaptar el response, hazlo aquí. Por ahora, se retorna tal cual.
    return res.status(200).json(json);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno', details: String(error) });
  }
}
