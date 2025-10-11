import { useRouter } from 'next/router';
import { IconAt, IconLock } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Anchor, Divider, Group, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { type ContextModalProps } from '@mantine/modals';
import { useAuthModals } from '@/lib/hooks';
import { LoginButton } from '@/shared/components';
import { useLogin } from './hooks/useLogin';
import { loginSchema, type LoginFormValues } from './schemas';

export const LoginModal: React.FC<ContextModalProps> = ({ id }) => {
  const { switchToRegister, closeModal } = useAuthModals();
  const loginMutation = useLogin();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    validate: zod4Resolver(loginSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values, {
      onSuccess: async () => {
        await router.push('/dashboard');
        closeModal(id);
      },
    });
  };

  const handleSwitchToRegister = () => {
    form.reset();
    switchToRegister();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="lg">
        <TextInput
          data-autofocus
          label="Email"
          placeholder="tu@email.com"
          leftSection={<IconAt size={16} />}
          required
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label="Contraseña"
          placeholder="Tu contraseña"
          leftSection={<IconLock size={16} />}
          required
          {...form.getInputProps('password')}
        />

        <LoginButton mode="submit" size="md" fullWidth loading={loginMutation.isPending} />

        <Group justify="center">
          <Anchor size="sm" c="dimmed">
            ¿Olvidaste tu contraseña?
          </Anchor>
        </Group>

        <Divider label="o" labelPosition="center" />

        <Group justify="center" gap="xs">
          <Text size="sm" c="dimmed">
            ¿No tienes cuenta?
          </Text>
          <Anchor size="sm" onClick={handleSwitchToRegister}>
            Regístrate aquí
          </Anchor>
        </Group>
      </Stack>
    </form>
  );
};
