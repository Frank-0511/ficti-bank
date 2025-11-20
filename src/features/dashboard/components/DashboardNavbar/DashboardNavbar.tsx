import { IconChevronRight, IconLogout } from '@tabler/icons-react';
import { Button, Divider, NavLink, ScrollArea, Stack, Text } from '@mantine/core';
import { useLogout } from '@/lib/hooks/auth/useLogout';
import { useAuthStore } from '@/lib/store/auth.store';
import { DASHBOARD_MENU, filterMenuByRole } from '../../constants/menu.constants';
import styles from './DashboardNavbar.module.css';

interface DashboardNavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DashboardNavbar({ activeSection, onSectionChange }: DashboardNavbarProps) {
  const handleLogout = useLogout();
  const user = useAuthStore((state) => state.user);

  const menuItems = user ? filterMenuByRole(DASHBOARD_MENU, user.role) : [];

  const handleSectionClick = (section: string) => {
    onSectionChange(section);
  };

  return (
    <Stack p="lg" h="100%" gap="md" className={styles.navbar}>
      <Text size="xs" fw={700} c="dimmed" tt="uppercase" px="sm" lts={1}>
        Menú
      </Text>

      <ScrollArea flex={1}>
        <Stack gap="xs">
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.items) {
              return (
                <NavLink
                  key={item.label}
                  leftSection={<Icon size={22} />}
                  label={item.label}
                  childrenOffset={28}
                  defaultOpened
                  className={styles.navLink}
                >
                  {item.items.map((subItem) => {
                    const sectionId = subItem.path.split('/').pop() || '';
                    return (
                      <NavLink
                        key={subItem.path}
                        label={subItem.label}
                        onClick={() => handleSectionClick(sectionId)}
                        active={activeSection === sectionId}
                        className={styles.subNavLink}
                      />
                    );
                  })}
                </NavLink>
              );
            }

            const sectionId = item.path?.split('/').pop() || '';
            return (
              <NavLink
                key={item.label}
                leftSection={<Icon size={22} />}
                rightSection={<IconChevronRight size={16} />}
                label={item.label}
                onClick={() => handleSectionClick(sectionId)}
                active={activeSection === sectionId}
                className={styles.navLink}
              />
            );
          })}
        </Stack>
      </ScrollArea>

      <Divider hiddenFrom="sm" />

      <Stack gap="md" pt="md" hiddenFrom="sm">
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
