import { UseFormReturnType } from '@mantine/form';
import { useCreateClient } from '@/features/dashboard/features/clients/hooks/useCreateClient';
import { PersonType } from '@/lib/types/common.types';
import { type PersonTypeFormData } from '../schemas/forms/person-type.schema';
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

  const createClientMutation = useCreateClient();

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

  const handleFormSubmit = async () => {
    if (!validateAllForms()) {
      return;
    }

    const formData = getFormData();

    try {
      await createClientMutation.mutateAsync(formData);
      goToSuccess();
    } catch (error) {
      // La notificación de error ya la maneja el hook
    }
  };

  return {
    handleFormNext,
    handleFormSubmit,
  };
};
