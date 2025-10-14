import { useRouter } from 'next/router';
import { IconArrowLeft, IconLogout, IconPlus } from '@tabler/icons-react';
import { ActionIcon, Badge, Burger, Button, Group, Title } from '@mantine/core';
import { ENTITY_STATUS } from '@/lib/constants';
import { useLogout } from '@/lib/hooks';
import { Client } from '@/lib/types';
import { ColorSchemeToggle } from '@/shared/components';
import { useAccountModals } from '../../hooks';

interface ClientDetailHeaderProps {
  client: Client | null;
  mobileNavOpened: boolean;
  toggleMobileNav: () => void;
}

export function ClientDetailHeader({
  client,
  mobileNavOpened,
  toggleMobileNav,
}: ClientDetailHeaderProps) {
  const router = useRouter();
  const handleLogout = useLogout();
  const { openAccountModal } = useAccountModals();

  return (
    <Group justify="space-between" align="center" py="md" px={{ base: 0, md: 'md' }}>
      <Group>
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={18} />}
          onClick={() => router.back()}
        >
          Volver
        </Button>
        <Title order={3} fw={700}>
          {client
            ? client.personType === 'N'
              ? `${client.firstName} ${client.lastName}`
              : client.businessName
            : ''}
        </Title>
        <Button
          ml="md"
          leftSection={<IconPlus size={18} />}
          onClick={openAccountModal}
          visibleFrom="sm"
        >
          Aperturar Cuenta
        </Button>
        <Badge size="md" color={client?.status === ENTITY_STATUS.ACTIVE ? 'green' : 'red'}>
          {client?.status === ENTITY_STATUS.ACTIVE ? 'Activo' : 'Inactivo'}
        </Badge>
      </Group>
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
  );
}
