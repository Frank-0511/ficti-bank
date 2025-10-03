import { IconLock } from '@tabler/icons-react';
import { Grid, PasswordInput, Stack, Text } from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';
import { useAutoFocus } from '@/lib/hooks';
import { type SecurityInfoFormValues } from '../../../schemas';

interface SecurityInfoFormProps {
  form: UseFormReturnType<SecurityInfoFormValues>;
}

export const SecurityInfoForm: React.FC<SecurityInfoFormProps> = ({ form }) => {
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
            {...form.getInputProps('password')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <PasswordInput
            label="Confirmar Contraseña"
            placeholder="Confirma tu contraseña"
            leftSection={<IconLock size={16} />}
            required
            {...form.getInputProps('confirmPassword')}
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
