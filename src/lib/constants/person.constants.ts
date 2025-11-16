export const PERSON_TYPE = {
  NATURAL: 'N',
  JURIDICAL: 'J',
} as const;

export const PERSON_TYPE_LABELS = {
  [PERSON_TYPE.NATURAL]: 'Natural',
  [PERSON_TYPE.JURIDICAL]: 'Jurídica',
} as const;
