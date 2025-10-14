import { AUTH_MODES, ENTITY_STATUS, USER_ROLE } from '../constants';
import { PERSON_TYPE } from '../constants/person.constants';

export type AuthMode = (typeof AUTH_MODES)[keyof typeof AUTH_MODES];

export type EntityStatusType = (typeof ENTITY_STATUS)[keyof typeof ENTITY_STATUS];

export type UserRoleType = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type PersonType = (typeof PERSON_TYPE)[keyof typeof PERSON_TYPE];
