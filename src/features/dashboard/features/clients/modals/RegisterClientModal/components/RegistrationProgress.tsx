import { Group, Progress, Text } from '@mantine/core';
import { useRegistrationContext } from '../context/RegistrationContext';
import { STEPS } from '../hooks/useStepNavigation';

export const RegistrationProgress: React.FC = () => {
  const { currentStep, progress, getStepIndex } = useRegistrationContext();

  return (
    <div>
      <Progress value={progress} size="sm" radius="xl" />
      <Group justify="space-between" mt="xs">
        <Text size="sm" fw={500}>
          {STEPS[currentStep].title}
        </Text>
        <Text size="sm" c="dimmed">
          Paso {getStepIndex(currentStep) + 1} de 4
        </Text>
      </Group>
    </div>
  );
};
