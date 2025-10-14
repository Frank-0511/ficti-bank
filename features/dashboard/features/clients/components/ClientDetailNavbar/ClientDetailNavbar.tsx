import { IconLogout, IconPlus } from '@tabler/icons-react';
import { Button, Divider, Grid, Group, Text } from '@mantine/core';
import { PERSON_TYPE_LABELS } from '@/lib/constants/person.constants';
import { useLogout } from '@/lib/hooks';
import { Client } from '@/lib/types';
import { useAccountModals } from '../../hooks';

interface ClientDetailNavbarProps {
  client: Client | null;
}

export function ClientDetailNavbar({ client }: ClientDetailNavbarProps) {
  const { openAccountModal } = useAccountModals();
  const handleLogout = useLogout();
  if (!client) {
    return null;
  }

  return (
    <div
      style={{
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
      }}
    >
      <Text fw={700} size="md" mb="xs">
        Datos del Cliente
      </Text>
      <Divider mb="md" />
      <Grid>
        <Grid.Col span={12}>
          <Text size="sm" c="dimmed">
            Código
          </Text>
          <Text fw={500}>{client.code}</Text>
        </Grid.Col>
        <Grid.Col span={12}>
          <Text size="sm" c="dimmed">
            Tipo de Persona
          </Text>
          <Text fw={500}>{PERSON_TYPE_LABELS[client.personType]}</Text>
        </Grid.Col>
        {client.personType === 'N' ? (
          <>
            <Grid.Col span={12}>
              <Text size="sm" c="dimmed">
                Nombres
              </Text>
              <Text fw={500}>
                {client.firstName} {client.lastName}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text size="sm" c="dimmed">
                DNI
              </Text>
              <Text fw={500}>{client.dni}</Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text size="sm" c="dimmed">
                Fecha de Nacimiento
              </Text>
              <Text fw={500}>{client.birthDate || '-'}</Text>
            </Grid.Col>
          </>
        ) : (
          <>
            <Grid.Col span={12}>
              <Text size="sm" c="dimmed">
                Razón Social
              </Text>
              <Text fw={500}>{client.businessName}</Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text size="sm" c="dimmed">
                RUC
              </Text>
              <Text fw={500}>{client.ruc}</Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text size="sm" c="dimmed">
                Representante Legal
              </Text>
              <Text fw={500}>{client.legalRepresentative}</Text>
            </Grid.Col>
          </>
        )}
        <Grid.Col span={12}>
          <Text size="sm" c="dimmed">
            Email
          </Text>
          <Text fw={500}>{client.email}</Text>
        </Grid.Col>
        <Grid.Col span={12}>
          <Text size="sm" c="dimmed">
            Teléfono
          </Text>
          <Text fw={500}>{client.phone}</Text>
        </Grid.Col>
        <Grid.Col span={12}>
          <Text size="sm" c="dimmed">
            Dirección
          </Text>
          <Text fw={500}>
            {client.address}, {client.district}, {client.province}, {client.department}
          </Text>
        </Grid.Col>
      </Grid>
      <Divider my="md" hiddenFrom="sm" />
      <div style={{ marginTop: 'auto' }}>
        <Group gap="md" hiddenFrom="sm">
          <Button fullWidth leftSection={<IconPlus size={18} />} onClick={openAccountModal}>
            Aperturar Cuenta
          </Button>
          <Button
            fullWidth
            variant="outline"
            leftSection={<IconLogout size={20} />}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </Group>
      </div>
    </div>
  );
}
