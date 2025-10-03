import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import {
  contactInfoSchema,
  juridicalPersonSchema,
  naturalPersonSchema,
  personTypeSchema,
  securityInfoSchema,
  type ContactInfoFormData,
  type JuridicalPersonFormData,
  type NaturalPersonFormData,
  type PersonTypeFormData,
  type SecurityInfoFormData,
} from '../schemas';

/**
 * Hook para manejar todos los formularios del registro
 * Responsabilidad: Solo la creación e inicialización de formularios
 */
export const useRegistrationForms = () => {
  const personTypeForm = useForm<PersonTypeFormData>({
    mode: 'uncontrolled',
    validate: zod4Resolver(personTypeSchema),
    initialValues: {
      personType: '',
    },
  });

  const naturalPersonBasicForm = useForm<NaturalPersonFormData>({
    mode: 'uncontrolled',
    validate: zod4Resolver(naturalPersonSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      dni: '',
      birthDate: null,
    },
  });

  const juridicalPersonBasicForm = useForm<JuridicalPersonFormData>({
    validate: zod4Resolver(juridicalPersonSchema),
    initialValues: {
      businessName: '',
      ruc: '',
      legalRepresentative: '',
      representativeDni: '',
    },
  });

  const contactInfoForm = useForm<ContactInfoFormData>({
    validate: zod4Resolver(contactInfoSchema),
    initialValues: {
      address: '',
      department: '',
      province: '',
      district: '',
      phone: '',
      mobile: '',
      email: '',
    },
  });

  const securityInfoForm = useForm<SecurityInfoFormData>({
    validate: zod4Resolver(securityInfoSchema),
    initialValues: {
      password: '',
      confirmPassword: '',
    },
  });

  return {
    personTypeForm,
    naturalPersonBasicForm,
    juridicalPersonBasicForm,
    contactInfoForm,
    securityInfoForm,
  };
};
