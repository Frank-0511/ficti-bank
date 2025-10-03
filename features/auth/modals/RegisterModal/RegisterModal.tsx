import { useEffect } from 'react';
import { IconUserPlus } from '@tabler/icons-react';
import { Anchor, Divider, Group, Stack, Text } from '@mantine/core';
import { modals, type ContextModalProps } from '@mantine/modals';
import { useAuthModals } from '@/lib/hooks';
import {
  ContactInfoForm,
  JuridicalPersonBasicForm,
  NaturalPersonBasicForm,
  PersonTypeSelector,
  RegistrationNavigation,
  RegistrationProgress,
  RegistrationSuccess,
  SecurityInfoForm,
} from './components';
import { PERSON_TYPE } from './constants';
import { RegistrationProvider, useRegistrationContext } from './context';

const RegisterModalContent: React.FC<{ id: string }> = ({ id }) => {
  const { switchToLogin } = useAuthModals();
  const { currentStep, resetStepper, isSuccessStep, personType } = useRegistrationContext();

  // Cleanup cuando el componente se desmonte
  useEffect(() => {
    return () => {
      resetStepper();
    };
  }, [resetStepper]);

  // Cambiar el título del modal basado en el paso actual
  useEffect(() => {
    if (currentStep === 'success') {
      // Ocultar el título cuando esté en success
      modals.updateModal({ modalId: id, title: null });
    } else {
      // Restaurar el título original
      modals.updateModal({
        modalId: id,
        title: (
          <Group gap="sm">
            <IconUserPlus size={20} />
            <Text fw={600}>Crear Cuenta</Text>
          </Group>
        ),
      });
    }
  }, [currentStep, id]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 'personType':
        return <PersonTypeSelector />;
      case 'basicInfo':
        return personType === PERSON_TYPE.NATURAL ? (
          <NaturalPersonBasicForm />
        ) : (
          <JuridicalPersonBasicForm />
        );
      case 'contactInfo':
        return <ContactInfoForm />;
      case 'securityInfo':
        return <SecurityInfoForm />;
      default:
        return null;
    }
  };

  return (
    <Stack gap="lg">
      {/* Progress bar - only show if not on success step */}
      {!isSuccessStep && <RegistrationProgress />}

      {/* Step content */}
      {isSuccessStep ? (
        <RegistrationSuccess onSwitchToLogin={switchToLogin} />
      ) : (
        <>
          {renderStepContent()}

          {/* Navigation buttons */}
          <RegistrationNavigation />

          {/* Switch to Login */}
          <Divider label="o" labelPosition="center" />
          <Group justify="center" gap="xs">
            <Text size="sm" c="dimmed">
              ¿Ya tienes cuenta?
            </Text>
            <Anchor size="sm" onClick={switchToLogin}>
              Inicia sesión aquí
            </Anchor>
          </Group>
        </>
      )}
    </Stack>
  );
};

export const RegisterModal: React.FC<ContextModalProps> = ({ id }) => {
  return (
    <RegistrationProvider>
      <RegisterModalContent id={id} />
    </RegistrationProvider>
  );
};
