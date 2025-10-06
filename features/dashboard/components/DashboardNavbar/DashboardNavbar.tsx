import { IconLogout, IconPlus, IconWallet } from '@tabler/icons-react';
import { Button, Divider, NavLink, Stack, Text } from '@mantine/core';
import { useLogout } from '@/lib/hooks';
import { useAccountModals } from '../../hooks';
import styles from './DashboardNavbar.module.css';

export function DashboardNavbar() {
  const handleLogout = useLogout();
  const { openAccountModal } = useAccountModals();

  return (
    <Stack p="lg" h="100%" gap="md" className={styles.navbar}>
      <Stack gap="xs">
        <Text size="xs" fw={700} c="dimmed" tt="uppercase" px="sm" lts={1}>
          Acciones
        </Text>

        <NavLink
          leftSection={<IconPlus size={22} />}
          label="Aperturar Cuenta"
          description="Abre una nueva cuenta bancaria"
          onClick={openAccountModal}
          className={styles.navLink}
        />

        <NavLink
          leftSection={<IconWallet size={22} />}
          label="Mis Cuentas"
          description="Ver todas mis cuentas"
          disabled
          className={styles.navLink}
        />
      </Stack>

      <Divider />

      <Stack gap="md" mt="auto" pt="md">
        <Button
          variant="light"
          color="red"
          fullWidth
          size="md"
          leftSection={<IconLogout size={18} />}
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Cerrar Sesión
        </Button>
      </Stack>
    </Stack>
  );
}
