import { useEffect, useState } from 'react';
import {
  IconBuildingBank,
  IconCalendarTime,
  IconChevronDown,
  IconCreditCard,
  IconLogin,
  IconPigMoney,
  IconUserPlus,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Burger,
  Button,
  Container,
  Group,
  Menu,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import styles from './Header.module.css';

interface HeaderProps {
  mobileNavOpened?: boolean;
  toggleMobileNav?: () => void;
}

export function Header({ mobileNavOpened = false, toggleMobileNav }: HeaderProps) {
  const isScrolled = useScrolled();

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

  const getHeaderClasses = () => {
    const baseClass = styles.headerContainer;
    // Cambiar color si hay scroll O si el burger está abierto
    const shouldChangeColor = isScrolled || mobileNavOpened;
    return `${baseClass} ${shouldChangeColor ? styles.scrolled : styles.initial}`;
  };

  return (
    <Container size="100%" h="100%" className={getHeaderClasses()}>
      <Container size="xl" h="100%" className={styles.innerContainer}>
        <Group h="100%" justify="space-between" wrap="nowrap">
          {/* Logo */}
          <Group gap="md" wrap="nowrap">
            <UnstyledButton component="a" href="/" className={styles.logoLink}>
              <Group gap="sm" wrap="nowrap">
                <ActionIcon
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                  size="lg"
                >
                  <IconBuildingBank size={20} />
                </ActionIcon>
                <Title
                  order={3}
                  fw={700}
                  c="blue"
                  hiddenFrom="xs"
                  visibleFrom="sm"
                  className={styles.logoTitle}
                >
                  Ficti Bank
                </Title>
              </Group>
            </UnstyledButton>

            {/* Menú Tipos de Cuenta */}
            <Menu shadow="md" width={280}>
              <Menu.Target>
                <UnstyledButton className={styles.menuTrigger}>
                  <Group gap={4} visibleFrom="md">
                    <Text fw={500} size="sm" className={styles.menuText}>
                      Tipos de Cuenta
                    </Text>
                    <IconChevronDown size={14} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Selecciona el tipo de cuenta</Menu.Label>
                {accountTypes.map((account) => (
                  <Menu.Item
                    key={account.title}
                    leftSection={<account.icon size={16} />}
                    component="a"
                    href={account.href}
                  >
                    <div>
                      <Text fw={500} size="sm">
                        {account.title}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {account.description}
                      </Text>
                    </div>
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>
          {/* Menú Desktop */}
          <Group gap="md" visibleFrom="md">
            <ColorSchemeToggle />

            <Button
              variant="light"
              size="sm"
              component="a"
              href="/registro"
              leftSection={<IconUserPlus size={16} />}
            >
              Registro
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
              size="sm"
              component="a"
              href="/login"
              leftSection={<IconLogin size={16} />}
            >
              Login
            </Button>
          </Group>
          {/* Menú Mobile */}
          <Group gap="sm" hiddenFrom="md">
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
}

/* hook para scroll */
function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
