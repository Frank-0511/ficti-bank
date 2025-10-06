import { useState } from 'react';
import { PERSON_TYPE } from '../constants';
import type { PersonType } from '../schemas';

export type Step = 'personType' | 'basicInfo' | 'contactInfo' | 'securityInfo' | 'success';

interface StepConfig {
  title: string;
  description: string;
}

export const STEPS: Record<Step, StepConfig> = {
  personType: {
    title: 'Tipo de Persona',
    description: 'Selecciona el tipo de cuenta',
  },
  basicInfo: {
    title: 'Datos Básicos',
    description: 'Información principal',
  },
  contactInfo: {
    title: 'Información de Contacto',
    description: 'Datos de contacto y ubicación',
  },
  securityInfo: {
    title: 'Seguridad',
    description: 'Contraseña y confirmación',
  },
  success: {
    title: '¡Registro Exitoso!',
    description: 'Tu cuenta ha sido creada correctamente',
  },
};

export const useStepNavigation = () => {
  const [currentStep, setCurrentStep] = useState<Step>('personType');
  const [personType, setPersonType] = useState<PersonType | ''>('');

  const getStepIndex = (step: Step): number => {
    const steps: Step[] = ['personType', 'basicInfo', 'contactInfo', 'securityInfo', 'success'];
    return steps.indexOf(step);
  };

  const handleNext = () => {
    const steps: Step[] = ['personType', 'basicInfo', 'contactInfo', 'securityInfo'];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['personType', 'basicInfo', 'contactInfo', 'securityInfo'];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const goToSuccess = () => {
    setCurrentStep('success');
  };

  const resetStepper = () => {
    setCurrentStep('personType');
    setPersonType('');
  };

  const setPersonTypeAndNext = (selectedPersonType: PersonType) => {
    if (selectedPersonType === PERSON_TYPE.NATURAL || selectedPersonType === PERSON_TYPE.BUSINESS) {
      setPersonType(selectedPersonType);
    }
    setCurrentStep('basicInfo');
  };

  // Computed values
  const isLastStep = currentStep === 'securityInfo';
  const isFirstStep = currentStep === 'personType';
  const isSuccessStep = currentStep === 'success';
  const progress = isSuccessStep ? 100 : ((getStepIndex(currentStep) + 1) / 4) * 100;

  return {
    currentStep,
    personType,
    getStepIndex,
    handleNext,
    handleBack,
    goToSuccess,
    resetStepper,
    setPersonTypeAndNext,
    isLastStep,
    isFirstStep,
    isSuccessStep,
    progress,
  };
};
