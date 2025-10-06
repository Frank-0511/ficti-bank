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

  useEffect(() => {
    return () => {
      resetStepper();
    };
  }, []);

  useEffect(() => {
    if (currentStep === 'success') {
      modals.updateModal({ modalId: id, title: null });
    } else {
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
      {!isSuccessStep && <RegistrationProgress />}

      {isSuccessStep ? (
        <RegistrationSuccess onSwitchToLogin={switchToLogin} />
      ) : (
        <>
          {renderStepContent()}

          <RegistrationNavigation />

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
