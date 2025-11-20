import { UseFormReturnType } from '@mantine/form';
import { PERSON_TYPE } from '../../../../../../../lib/constants/person.constants';
import { ContactInfoFormData } from '../schemas/forms/contact-info.schema';
import { JuridicalPersonFormData } from '../schemas/forms/juridical-person.schema';
import { NaturalPersonFormData } from '../schemas/forms/natural-person.schema';
import { PersonTypeFormData } from '../schemas/forms/person-type.schema';
import { SecurityInfoFormData } from '../schemas/forms/security-info.schema';
import { PersonType } from '../types';
import { type Step } from './useStepNavigation';

interface FormValidationParams {
  currentStep: Step;
  personType: PersonType | '';
  personTypeForm: UseFormReturnType<PersonTypeFormData>;
  naturalPersonBasicForm: UseFormReturnType<NaturalPersonFormData>;
  juridicalPersonBasicForm: UseFormReturnType<JuridicalPersonFormData>;
  contactInfoForm: UseFormReturnType<ContactInfoFormData>;
  securityInfoForm: UseFormReturnType<SecurityInfoFormData>;
}

export const useFormValidation = (params: FormValidationParams) => {
  const {
    currentStep,
    personType,
    personTypeForm,
    naturalPersonBasicForm,
    juridicalPersonBasicForm,
    contactInfoForm,
  } = params;

  const getCurrentForm = () => {
    switch (currentStep) {
      case 'personType':
        return personTypeForm;
      case 'basicInfo':
        return personType === PERSON_TYPE.NATURAL
          ? naturalPersonBasicForm
          : juridicalPersonBasicForm;
      case 'contactInfo':
        return contactInfoForm;
      default:
        return personTypeForm;
    }
  };

  const validateAllForms = () => {
    const personTypeValidation = personTypeForm.validate();
    const basicFormValidation =
      personType === PERSON_TYPE.NATURAL
        ? naturalPersonBasicForm.validate()
        : juridicalPersonBasicForm.validate();
    const contactValidation = contactInfoForm.validate();

    return !(
      personTypeValidation.hasErrors ||
      basicFormValidation.hasErrors ||
      contactValidation.hasErrors
    );
  };

  const getFormData = () => {
    let mappedPersonType: string = personTypeForm.values.personType;
    if (mappedPersonType === 'natural') {
      mappedPersonType = 'N';
    } else if (mappedPersonType === 'business') {
      mappedPersonType = 'J';
    }
    return {
      personType: mappedPersonType,
      ...(personType === PERSON_TYPE.NATURAL
        ? naturalPersonBasicForm.values
        : juridicalPersonBasicForm.values),
      ...contactInfoForm.values,
    };
  };

  return {
    getCurrentForm,
    validateAllForms,
    getFormData,
  };
};
