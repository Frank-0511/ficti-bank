import { IconArrowLeft, IconArrowRight, IconUserPlus } from '@tabler/icons-react';
import { Button, Group } from '@mantine/core';
import { useRegistrationContext } from '../context/RegistrationContext';

export const RegistrationNavigation: React.FC = () => {
  const { isFirstStep, isLastStep, handleBack, handleFormNext, handleFormSubmit } =
    useRegistrationContext();

  return (
    <Group justify="space-between" mt="xl">
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        onClick={handleBack}
        disabled={isFirstStep}
      >
        Anterior
      </Button>

      {isLastStep ? (
        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
          leftSection={<IconUserPlus size={16} />}
          onClick={handleFormSubmit}
        >
          Crear Cuenta
        </Button>
      ) : (
        <Button
          variant="outline"
          rightSection={<IconArrowRight size={16} />}
          onClick={handleFormNext}
        >
          Siguiente
        </Button>
      )}
    </Group>
  );
};
