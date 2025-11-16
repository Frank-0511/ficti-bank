import { RucData } from '../types';
import { fetchLegalRepresentatives } from './legal-representative.service';
import { fetchRucInfo } from './ruc-info.service';

export async function fetchRucData(ruc: string): Promise<RucData> {
  const [rucData, legalRepresentatives] = await Promise.all([
    fetchRucInfo(ruc),
    fetchLegalRepresentatives(ruc),
  ]);
  rucData.legalRepresentatives = legalRepresentatives;
  return rucData;
}
