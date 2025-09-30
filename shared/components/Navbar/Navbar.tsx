import {
  IconCalendarTime,
  IconCreditCard,
  IconLogin,
  IconPigMoney,
  IconUserPlus,
} from '@tabler/icons-react';
import { Button, NavLink, Stack, Text } from '@mantine/core';

export function Navbar() {
  const accountTypes = [
    {
      icon: IconPigMoney,
      title: 'Cuenta de Ahorros',
      description: 'Ahorra y gana intereses',
      href: '/cuentas/ahorros',
    },
    {
      icon: IconCreditCard,
      title: 'Cuenta Corriente',
      description: 'Para tus operaciones diarias',
      href: '/cuentas/corriente',
    },
    {
      icon: IconCalendarTime,
      title: 'Cuenta a Plazo Fijo',
      description: 'Inversión a largo plazo',
      href: '/cuentas/plazo-fijo',
    },
  ];

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
      {/* Navigation Links */}
      <Stack gap="md">
        <Text size="md" fw={700} c="dimmed" tt="uppercase" px="sm" lts={1}>
          Tipos de Cuenta
        </Text>

        {accountTypes.map((account) => (
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

      {/* Action Buttons */}
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
        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
          fullWidth
          component="a"
          href="/login"
          size="lg"
          leftSection={<IconLogin size={20} />}
          styles={{
            root: {
              borderRadius: '0.75rem',
              height: '3.25rem',
              fontWeight: 700,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 0.75rem 1.25rem rgba(59, 130, 246, 0.3)',
              '&:hover': {
                transform: 'translateY(-0.25rem)',
                boxShadow: '0 0.75rem 2rem rgba(59, 130, 246, 0.4)',
              },
            },
          }}
        >
          Login
        </Button>
      </Stack>
    </Stack>
  );
}
