import { IconUserPlus } from '@tabler/icons-react';
import { Button, NavLink, Stack, Text } from '@mantine/core';
import { ACCOUNT_TYPES } from '@/shared/constants/navigation.constants';
import { LoginButton } from '../../molecules/LoginButton/LoginButton';

export function Navbar() {
  return (
    <Stack
      p="lg"
      h="100%"
      gap="xl"
      bg="--mantine-color-scrolled-background"
      style={{
        backgroundColor: 'var(--mantine-color-scrolled-background)',
        borderTop: 'var(--mantine-color-border)',
        transition: 'all 0.3s ease',
      }}
    >
      <Stack gap="md">
        <Text size="md" fw={700} c="dimmed" tt="uppercase" px="sm" lts={1}>
          Tipos de Cuenta
        </Text>

        {ACCOUNT_TYPES.map((account) => (
          <NavLink
            key={account.title}
            href={account.href}
            component="a"
            leftSection={<account.icon size={22} />}
            label={
              <div>
                <Text fw={600} size="md">
                  {account.title}
                </Text>
                <Text size="sm" c="dimmed" lh={1.4}>
                  {account.description}
                </Text>
              </div>
            }
            styles={{
              root: {
                padding: '1rem',
                borderRadius: '0.75rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'var(--mantine-color-blue-light)',
                  transform: 'translateX(0.5rem)',
                },
              },
            }}
          />
        ))}
      </Stack>

      <Stack
        gap="lg"
        mt="auto"
        pt="lg"
        style={{
          borderTop: 'var(--mantine-color-border)',
        }}
      >
        <Button
          variant="light"
          fullWidth
          component="a"
          href="/registro"
          size="lg"
          leftSection={<IconUserPlus size={20} />}
          styles={{
            root: {
              borderRadius: '0.75rem',
              height: '3.25rem',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-0.25rem)',
                boxShadow: '0 0.75rem 1.25rem rgba(0, 0, 0, 0.15)',
              },
            },
          }}
        >
          Registro
        </Button>
        <LoginButton fullWidth size="lg" />
      </Stack>
    </Stack>
  );
}
