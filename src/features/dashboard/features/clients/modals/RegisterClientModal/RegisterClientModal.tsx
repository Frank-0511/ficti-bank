import { useEffect } from 'react';
import { IconUserPlus } from '@tabler/icons-react';
import { Group, Stack, Text } from '@mantine/core';
import { modals, type ContextModalProps } from '@mantine/modals';
import { PERSON_TYPE } from '@/lib/constants';
import {
  ContactInfoForm,
  JuridicalPersonBasicForm,
  NaturalPersonBasicForm,
  PersonTypeSelector,
  RegistrationNavigation,
  RegistrationProgress,
  RegistrationSuccess,
} from './components';
import { RegistrationProvider, useRegistrationContext } from './context';

const RegisterModalContent: React.FC<{ id: string }> = ({ id }) => {
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
      default:
        return null;
    }
  };

  return (
    <Stack gap="lg">
      {!isSuccessStep && <RegistrationProgress />}

      {isSuccessStep ? (
        <RegistrationSuccess />
      ) : (
        <>
          {renderStepContent()}

          <RegistrationNavigation />
        </>
      )}
    </Stack>
  );
};

export const RegisterClientModal: React.FC<ContextModalProps> = ({ id }) => {
  return (
    <RegistrationProvider>
      <RegisterModalContent id={id} />
    </RegistrationProvider>
  );
};
