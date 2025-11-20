import { UseFormReturnType } from '@mantine/form';
import { ContactInfoFormData } from '../schemas/forms/contact-info.schema';
import { JuridicalPersonFormData } from '../schemas/forms/juridical-person.schema';
import { NaturalPersonFormData } from '../schemas/forms/natural-person.schema';
import { PersonTypeFormData } from '../schemas/forms/person-type.schema';
import { SecurityInfoFormData } from '../schemas/forms/security-info.schema';
import { PersonType } from '../types';
import { useFormValidation } from './useFormValidation';
import { useNavigationActions } from './useNavigationActions';
import { useRegistrationForms } from './useRegistrationForms';
import { useStepNavigation, type Step } from './useStepNavigation';

export type UseRegistrationReturn = {
  currentStep: Step;
  personType: PersonType | '';
  getStepIndex: (step: Step) => number;
  handleNext: () => void;
  handleBack: () => void;
  goToSuccess: () => void;
  resetStepper: () => void;
  setPersonTypeAndNext: (selectedPersonType: PersonType) => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  isSuccessStep: boolean;
  progress: number;
  personTypeForm: UseFormReturnType<PersonTypeFormData>;
  naturalPersonBasicForm: UseFormReturnType<NaturalPersonFormData>;
  juridicalPersonBasicForm: UseFormReturnType<JuridicalPersonFormData>;
  contactInfoForm: UseFormReturnType<ContactInfoFormData>;
  securityInfoForm: UseFormReturnType<SecurityInfoFormData>;
  getCurrentForm: () => UseFormReturnType<any>;
  validateAllForms: () => boolean;
  getFormData: () => any;
  handleFormNext: () => void;
  handleFormSubmit: () => void;
};

export const useRegistration = (): UseRegistrationReturn => {
  const stepNavigation = useStepNavigation();
  const forms = useRegistrationForms();

  const formValidation = useFormValidation({
    currentStep: stepNavigation.currentStep,
    personType: stepNavigation.personType,
    ...forms,
  });

  const navigationActions = useNavigationActions({
    currentStep: stepNavigation.currentStep,
    personTypeForm: forms.personTypeForm,
    getCurrentForm: formValidation.getCurrentForm,
    validateAllForms: formValidation.validateAllForms,
    getFormData: formValidation.getFormData,
    handleNext: stepNavigation.handleNext,
    setPersonTypeAndNext: stepNavigation.setPersonTypeAndNext,
    goToSuccess: stepNavigation.goToSuccess,
  });

  return {
    ...stepNavigation,
    ...forms,
    ...formValidation,
    ...navigationActions,
  };
};
