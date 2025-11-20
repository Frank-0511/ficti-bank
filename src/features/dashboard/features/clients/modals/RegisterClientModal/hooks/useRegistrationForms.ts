import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import { ContactInfoFormData, contactInfoSchema } from '../schemas/forms/contact-info.schema';
import {
  JuridicalPersonFormData,
  juridicalPersonSchema,
} from '../schemas/forms/juridical-person.schema';
import { NaturalPersonFormData, naturalPersonSchema } from '../schemas/forms/natural-person.schema';
import { PersonTypeFormData, personTypeSchema } from '../schemas/forms/person-type.schema';
import { SecurityInfoFormData, securityInfoSchema } from '../schemas/forms/security-info.schema';

export const useRegistrationForms = () => {
  const personTypeForm = useForm<PersonTypeFormData>({
    validate: zod4Resolver(personTypeSchema),
    initialValues: {
      personType: '',
    },
  });

  const naturalPersonBasicForm = useForm<NaturalPersonFormData>({
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
