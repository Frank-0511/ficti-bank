import { createContext, useContext, type ReactNode } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { useRegistration, type Step } from '../hooks';
import {
  type ContactInfoFormData,
  type JuridicalPersonFormData,
  type NaturalPersonFormData,
  type PersonType,
  type PersonTypeFormData,
  type SecurityInfoFormData,
} from '../schemas';

interface RegistrationContextType {
  // Stepper state and actions
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

  // Forms
  personTypeForm: UseFormReturnType<PersonTypeFormData>;
  naturalPersonBasicForm: UseFormReturnType<NaturalPersonFormData>;
  juridicalPersonBasicForm: UseFormReturnType<JuridicalPersonFormData>;
  contactInfoForm: UseFormReturnType<ContactInfoFormData>;
  securityInfoForm: UseFormReturnType<SecurityInfoFormData>;

  // Form utilities
  getCurrentForm: () => UseFormReturnType<any>;
  validateAllForms: () => boolean;
  getFormData: () => any;

  // High-level navigation actions
  handleFormNext: () => void;
  handleFormSubmit: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

interface RegistrationProviderProps {
  children: ReactNode;
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children }) => {
  const registrationHook = useRegistration();

  return (
    <RegistrationContext.Provider value={registrationHook}>{children}</RegistrationContext.Provider>
  );
};

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistrationContext must be used within a RegistrationProvider');
  }
  return context;
};
