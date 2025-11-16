import { IconArrowLeft, IconLogout, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Badge, Box, Burger, Button, Group, Text, Title } from '@mantine/core';
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
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const { openAccountModal } = useAccountModals();

  return (
    <Group justify="space-between" align="center" py="md" px={{ base: 0, md: 'md' }}>
      <Group>
        <style>{`
          .mantine-Button-section {
            margin-inline-end: 0 !important;
          }
        `}</style>
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={18} />}
          onClick={() => navigate(-1)}
          w="max-content"
          pr={{
            base: 12,
            xs: 18,
          }}
        >
          <Text fw={600} visibleFrom="xs" pl={{ base: 12, xs: 18 }}>
            Volver
          </Text>
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
          onClick={() => client && openAccountModal(client.code)}
          visibleFrom="sm"
        >
          Aperturar Cuenta
        </Button>
        <Badge size="md" color={client?.status === ENTITY_STATUS.ACTIVE ? 'green' : 'red'}>
          <Text visibleFrom="xs" size="sm" fw={600}>
            {client?.status === ENTITY_STATUS.ACTIVE ? 'Activo' : 'Inactivo'}
          </Text>
        </Badge>
      </Group>
      <Group gap="md" visibleFrom="sm" wrap="nowrap">
        <ColorSchemeToggle />
        <ActionIcon variant="subtle" size="lg" onClick={handleLogout} title="Cerrar sesión">
          <IconLogout size={20} />
        </ActionIcon>
      </Group>
      <Group gap="sm" hiddenFrom="sm" wrap="nowrap">
        <Box visibleFrom="xxs">
          <ColorSchemeToggle />
        </Box>
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
