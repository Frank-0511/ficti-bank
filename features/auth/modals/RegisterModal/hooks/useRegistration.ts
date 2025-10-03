import { useFormValidation } from './useFormValidation';
import { useNavigationActions } from './useNavigationActions';
import { useRegistrationForms } from './useRegistrationForms';
import { useStepNavigation } from './useStepNavigation';

/**
 * Hook principal que compone todos los hooks específicos
 * Responsabilidad: Solo composición y orchestración
 */
export const useRegistration = () => {
  // Composición de hooks específicos
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

  // Retornar la interfaz completa combinando todos los hooks
  return {
    // Step navigation
    ...stepNavigation,

    // Forms
    ...forms,

    // Form validation
    ...formValidation,

    // Navigation actions
    ...navigationActions,
  };
};
