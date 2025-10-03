import { IconLock } from '@tabler/icons-react';
import { Grid, PasswordInput, Stack, Text } from '@mantine/core';
import { useAutoFocus } from '@/lib/hooks';
import { useRegistrationContext } from '../context';

export const SecurityInfoForm: React.FC = () => {
  const { securityInfoForm } = useRegistrationContext();
  const firstInputRef = useAutoFocus<HTMLInputElement>();

  return (
    <Stack gap="lg">
      <div>
        <Text size="lg" fw={600} mb="xs">
          Información de Seguridad
        </Text>
        <Text size="sm" c="dimmed">
          Crea una contraseña segura para tu cuenta
        </Text>
      </div>

      <Grid>
        <Grid.Col span={6}>
          <PasswordInput
            ref={firstInputRef}
            label="Contraseña"
            placeholder="Tu contraseña"
            leftSection={<IconLock size={16} />}
            required
            {...securityInfoForm.getInputProps('password')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <PasswordInput
            label="Confirmar Contraseña"
            placeholder="Confirma tu contraseña"
            leftSection={<IconLock size={16} />}
            required
            {...securityInfoForm.getInputProps('confirmPassword')}
          />
        </Grid.Col>
      </Grid>

      <div>
        <Text size="xs" c="dimmed">
          La contraseña debe tener al menos 8 caracteres e incluir:
        </Text>
        <Text size="xs" c="dimmed" ml="md">
          • Al menos una letra mayúscula
        </Text>
        <Text size="xs" c="dimmed" ml="md">
          • Al menos una letra minúscula
        </Text>
        <Text size="xs" c="dimmed" ml="md">
          • Al menos un número
        </Text>
      </div>
    </Stack>
  );
};
