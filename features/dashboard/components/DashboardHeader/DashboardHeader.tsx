import { IconLogout } from '@tabler/icons-react';
import { ActionIcon, Burger, Container, Group, Text, Title } from '@mantine/core';
import { useLogout, useScrolled } from '@/lib/hooks';
import { useAuthStore } from '@/lib/store';
import { ColorSchemeToggle } from '@/shared/components';
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
  const isScrolled = useScrolled();

  const getHeaderClasses = () => {
    const baseClass = styles.headerContainer;
    const shouldChangeColor = isScrolled || mobileNavOpened;
    return `${baseClass} ${shouldChangeColor ? styles.scrolled : styles.initial}`;
  };

  return (
    <Container size="100%" h="100%" px={{ base: 'lg', md: 'xl' }} className={getHeaderClasses()}>
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
  );
};
