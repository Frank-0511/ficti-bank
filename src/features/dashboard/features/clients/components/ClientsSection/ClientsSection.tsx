import { IconPlus } from '@tabler/icons-react';
import { Button, Container, Group, Title } from '@mantine/core';
import { useClientModals, useClients } from '../../hooks';
import { ClientsTable } from '../ClientsTable';
import { ClientsTableSkeleton } from '../ClientsTableSkeleton';

export const ClientsSection = () => {
  const { openRegisterClientModal } = useClientModals();
  const { data: clients, isLoading } = useClients();

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2}>Gestión de Clientes</Title>
        <Button leftSection={<IconPlus size={18} />} onClick={openRegisterClientModal}>
          Registrar Cliente
        </Button>
      </Group>

      {isLoading ? <ClientsTableSkeleton /> : clients && <ClientsTable clients={clients} />}
    </Container>
  );
};
