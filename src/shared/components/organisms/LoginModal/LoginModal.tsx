import { useEffect, useState } from 'react';
import { LoginButton } from '@shared/components/molecules/LoginButton/LoginButton';
import { IconAt, IconLock } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useNavigate } from 'react-router-dom';
import { Anchor, Group, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { type ContextModalProps } from '@mantine/modals';
import { useLogin } from './hooks/useLogin';
import { loginSchema, type LoginFormValues } from './schemas';

export const LoginModal: React.FC<ContextModalProps> = ({ id, context }) => {
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    validate: zod4Resolver(loginSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [blockSeconds, setBlockSeconds] = useState<number | null>(null);

  useEffect(() => {
    if (
      loginMutation.isError &&
      loginMutation.error &&
      typeof loginMutation.error === 'object' &&
      'response' in loginMutation.error &&
      loginMutation.error?.response?.status === 429
    ) {
      // Extraer segundos del mensaje de error si existe
      const msg = loginMutation.error.response?.data?.message as string;
      const match = msg && msg.match(/(\d+)\s*segundos/);
      if (match) {
        setBlockSeconds(Number(match[1]));
      } else {
        setBlockSeconds(30);
      }
    }
  }, [loginMutation.isError, loginMutation.error, form.values.email]);

  useEffect(() => {
    if (blockSeconds !== null && blockSeconds > 0) {
      const interval = setInterval(() => {
        setBlockSeconds((s) => (s && s > 0 ? s - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [blockSeconds]);

  const handleSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        navigate('/dashboard');
        context.closeModal(id);
      },
      onError: (error: any) => {
        // Si está bloqueado, setear contador
        if (error?.response?.status === 429) {
          const msg = error.response?.data?.message as string;
          const match = msg && msg.match(/(\d+)\s*segundos/);
          if (match) {
            setBlockSeconds(Number(match[1]));
          } else {
            setBlockSeconds(30);
          }
        }
      },
    });
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
          disabled={blockSeconds !== null && blockSeconds > 0}
        />

        <PasswordInput
          label="Contraseña"
          placeholder="Tu contraseña"
          leftSection={<IconLock size={16} />}
          required
          {...form.getInputProps('password')}
          disabled={blockSeconds !== null && blockSeconds > 0}
        />

        <LoginButton
          mode="submit"
          size="md"
          fullWidth
          loading={loginMutation.isPending}
          disabled={blockSeconds !== null && blockSeconds > 0}
        />

        {blockSeconds !== null && blockSeconds > 0 && (
          <Text ta="center" c="red" size="sm">
            Usuario bloqueado por intentos fallidos.
            <br />
            Intenta nuevamente en {blockSeconds} segundos.
          </Text>
        )}

        <Group justify="center">
          <Anchor size="sm" c="dimmed">
            ¿Olvidaste tu contraseña?
          </Anchor>
        </Group>
      </Stack>
    </form>
  );
};
