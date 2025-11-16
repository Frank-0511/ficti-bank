import { IconCircleCheck } from '@tabler/icons-react';
import { Stack, Text } from '@mantine/core';

interface RegistrationSuccessProps {}

export const RegistrationSuccess: React.FC<RegistrationSuccessProps> = () => {
  return (
    <>
      <Stack gap="xl" align="center" py="xl">
        <IconCircleCheck size={86} color="var(--mantine-color-green-6)" stroke={1.5} />
        <Stack gap="sm" align="center">
          <Text size="xl" fw={600} ta="center" c="green">
            ¡Registro Exitoso!
          </Text>
          <Text size="md" c="dimmed" ta="center">
            El cliente ha sido creada correctamente.
          </Text>
        </Stack>
      </Stack>
    </>
  );
};
