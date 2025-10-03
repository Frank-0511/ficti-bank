import { UseFormReturnType } from '@mantine/form';
import { type PersonType, type PersonTypeFormData } from '../schemas';
import { type Step } from './useStepNavigation';

interface NavigationActionsParams {
  currentStep: Step;
  personTypeForm: UseFormReturnType<PersonTypeFormData>;
  getCurrentForm: () => UseFormReturnType<any>;
  validateAllForms: () => boolean;
  getFormData: () => any;
  handleNext: () => void;
  setPersonTypeAndNext: (personType: PersonType) => void;
  goToSuccess: () => void;
}

/**
 * Hook para manejar las acciones de navegación del formulario
 * Responsabilidad: Solo la lógica de navegación con validación
 */
export const useNavigationActions = (params: NavigationActionsParams) => {
  const {
    currentStep,
    personTypeForm,
    getCurrentForm,
    validateAllForms,
    getFormData,
    handleNext,
    setPersonTypeAndNext,
    goToSuccess,
  } = params;

  const handleFormNext = () => {
    const form = getCurrentForm();

    if (currentStep === 'personType') {
      const isValid = personTypeForm.validate();
      if (isValid.hasErrors) {
        return;
      }

      const selectedPersonType = personTypeForm.values.personType as PersonType;
      setPersonTypeAndNext(selectedPersonType);
      return;
    }

    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }

    handleNext();
  };

  const handleFormSubmit = () => {
    if (!validateAllForms()) {
      return;
    }

    const formData = getFormData();

    // eslint-disable-next-line no-console
    console.log('Register values:', formData);
    // TODO: await registerUser(formData);

    goToSuccess();
  };

  return {
    handleFormNext,
    handleFormSubmit,
  };
};
