/**
 * Type definitions for registration schemas
 */

import { PERSON_TYPE } from './constants';

export type PersonType = typeof PERSON_TYPE.NATURAL | typeof PERSON_TYPE.BUSINESS;
