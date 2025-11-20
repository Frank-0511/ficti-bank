import { ColorSchemeToggle } from '@shared/components/molecules/ColorSchemeToggle/ColorSchemeToggle';
import { IconLogout } from '@tabler/icons-react';
import { ActionIcon, Badge, Burger, Container, Group, Loader, Text, Title } from '@mantine/core';
import { useLogout, useScrolled } from '@/lib/hooks';
import { useAuthStore } from '@/lib/store';
import { useExchangeRateToday } from '../../features/administration';
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
  const { data: exchangeRateData, isLoading: isLoadingRate } = useExchangeRateToday();

  const exchangeRate = exchangeRateData?.data;

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
          {isLoadingRate ? (
            <Loader size="sm" />
          ) : exchangeRate ? (
            <Badge size="lg" variant="light" color="blue">
              USD: S/. {exchangeRate.rate.toFixed(2)}
            </Badge>
          ) : (
            <Badge size="lg" variant="light" color="red">
              Sin tipo de cambio
            </Badge>
          )}
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
