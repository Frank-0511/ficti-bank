import { PERSON_TYPE } from '@/lib/constants/person.constants';

export type PersonType = typeof PERSON_TYPE.NATURAL | typeof PERSON_TYPE.JURIDICAL;
