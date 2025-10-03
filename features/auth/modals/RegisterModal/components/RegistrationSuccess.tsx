import { IconCircleCheck } from '@tabler/icons-react';
import { Group, Stack, Text } from '@mantine/core';
import { LoginButton } from '@/shared/components';

interface RegistrationSuccessProps {
  onSwitchToLogin: () => void;
}

export const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({ onSwitchToLogin }) => {
  return (
    <>
      <Stack gap="xl" align="center" py="xl">
        <IconCircleCheck size={86} color="var(--mantine-color-green-6)" stroke={1.5} />
        <Stack gap="sm" align="center">
          <Text size="xl" fw={600} ta="center" c="green">
            ¡Registro Exitoso!
          </Text>
          <Text size="md" c="dimmed" ta="center">
            Tu cuenta ha sido creada correctamente. Ya puedes iniciar sesión.
          </Text>
        </Stack>
      </Stack>

      <Group justify="center">
        <LoginButton
          size="lg"
          showIcon={false}
          color="green"
          variant="filled"
          onClick={onSwitchToLogin}
        />
      </Group>
    </>
  );
};
