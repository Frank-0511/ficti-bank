import { IconAt, IconLock, IconLogin } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Anchor, Divider, Group, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AUTH_MODES } from '@/lib/constants';
import { useAuthModal } from '@/lib/store';
import { BaseModal, LoginButton } from '@/shared/components';
import { loginSchema, type LoginFormValues } from '../schemas';

export const LoginModal = () => {
  const { isOpen, close, mode, open } = useAuthModal();

  const form = useForm<LoginFormValues>({
    validate: zod4Resolver(loginSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (values: LoginFormValues) => {
    // eslint-disable-next-line no-console
    console.log('Login values:', values);
    // await loginUser(values);
    // close();
  };

  const handleSwitchToRegister = () => {
    form.reset();
    open(AUTH_MODES.REGISTER);
  };

  return (
    <BaseModal
      opened={isOpen && mode === AUTH_MODES.LOGIN}
      onClose={close}
      title={
        <Group gap="sm">
          <IconLogin size={20} />
          <Text fw={600}>Iniciar Sesión</Text>
        </Group>
      }
      size="md"
      onExitTransitionEnd={form.reset}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="lg">
          {/* Email Field */}
          <TextInput
            data-autofocus
            label="Email"
            placeholder="tu@email.com"
            leftSection={<IconAt size={16} />}
            required
            {...form.getInputProps('email')}
          />

          {/* Password Field */}
          <PasswordInput
            label="Contraseña"
            placeholder="Tu contraseña"
            leftSection={<IconLock size={16} />}
            required
            {...form.getInputProps('password')}
          />

          {/* Submit Button */}
          <LoginButton mode="submit" size="md" fullWidth />

          {/* Forgot Password */}
          <Group justify="center">
            <Anchor size="sm" c="dimmed">
              ¿Olvidaste tu contraseña?
            </Anchor>
          </Group>

          <Divider label="o" labelPosition="center" />

          {/* Switch to Register */}
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
    </BaseModal>
  );
};
