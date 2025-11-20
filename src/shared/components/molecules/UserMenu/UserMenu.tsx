import { IconLogout, IconUser } from '@tabler/icons-react';
import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { useLogout } from '@/lib/hooks/auth/useLogout';
import { useAuthStore } from '@/lib/store/auth.store';
import styles from './UserMenu.module.css';

export function UserMenu() {
  const user = useAuthStore((state) => state.user);
  const handleLogout = useLogout();

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton className={styles.userButton}>
          <Group gap="sm">
            <Avatar color="blue" radius="xl">
              {getInitials(user.name)}
            </Avatar>
            <div style={{ flex: 1 }} className={styles.userInfo}>
              <Text size="sm" fw={500}>
                {user.name}
              </Text>
              <Text size="xs" c="dimmed">
                {user.role === 'A' ? 'Administrador' : 'Empleado'}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Mi cuenta</Menu.Label>
        <Menu.Item leftSection={<IconUser size={14} />}>Ver perfil</Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<IconLogout size={14} />} color="red" onClick={handleLogout}>
          Cerrar sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
