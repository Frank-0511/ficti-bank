import { useEffect } from 'react';
import { IconUserPlus } from '@tabler/icons-react';
import { Group, Stack, Text } from '@mantine/core';
import { modals, type ContextModalProps } from '@mantine/modals';
import { PERSON_TYPE } from '@/lib/constants/person.constants';
import { ContactInfoForm } from './components/ContactInfoForm';
import { JuridicalPersonBasicForm } from './components/JuridicalPersonBasicForm';
import { NaturalPersonBasicForm } from './components/NaturalPersonBasicForm';
import { PersonTypeSelector } from './components/PersonTypeSelector';
import { RegistrationNavigation } from './components/RegistrationNavigation';
import { RegistrationProgress } from './components/RegistrationProgress';
import { RegistrationSuccess } from './components/RegistrationSuccess';
import { RegistrationProvider, useRegistrationContext } from './context/RegistrationContext';

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
