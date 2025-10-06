import { IconLogout, IconPlus } from '@tabler/icons-react';
import { ActionIcon, Burger, Button, Container, Group, Text, Title } from '@mantine/core';
import { useLogout, useScrolled } from '@/lib/hooks';
import { useAuthStore } from '@/lib/store';
import { ColorSchemeToggle } from '@/shared/components';
import { useAccountModals } from '../../hooks';
import styles from './DashboardHeader.module.css';

interface DashboardHeaderProps {
  mobileNavOpened?: boolean;
  toggleMobileNav?: () => void;
}

export const DashboardHeader = ({
  mobileNavOpened = false,
  toggleMobileNav,
}: DashboardHeaderProps) => {
  const { user } = useAuthStore();
  const handleLogout = useLogout();
  const { openAccountModal } = useAccountModals();
  const isScrolled = useScrolled();

  const getHeaderClasses = () => {
    const baseClass = styles.headerContainer;
    const shouldChangeColor = isScrolled || mobileNavOpened;
    return `${baseClass} ${shouldChangeColor ? styles.scrolled : styles.initial}`;
  };

  return (
    <Container size="100%" h="100%" className={getHeaderClasses()}>
      <Container size="xl" h="100%" className={styles.innerContainer}>
        <Group h="100%" justify="space-between" wrap="nowrap">
          <div>
            <Title order={2} className={styles.title}>
              Mis Cuentas
            </Title>
            <Text size="sm" c="dimmed" className={styles.welcome}>
              Bienvenido, {user?.name}
            </Text>
          </div>

          <Group gap="md" visibleFrom="sm" wrap="nowrap">
            <Button leftSection={<IconPlus size={18} />} onClick={openAccountModal}>
              Aperturar Cuenta
            </Button>
            <ColorSchemeToggle />
            <ActionIcon variant="subtle" size="lg" onClick={handleLogout} title="Cerrar sesión">
              <IconLogout size={20} />
            </ActionIcon>
          </Group>

          <Group gap="sm" hiddenFrom="sm" wrap="nowrap">
            <ColorSchemeToggle />
            <Burger
              opened={mobileNavOpened}
              onClick={toggleMobileNav}
              size="sm"
              aria-label="Toggle navigation"
            />
          </Group>
        </Group>
      </Container>
    </Container>
  );
};
