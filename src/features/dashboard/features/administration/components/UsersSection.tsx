import { useMemo } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { ActionIcon, Badge, Group, Skeleton, Stack, Table, Title, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { ENTITY_STATUS, USER_ROLE_LABELS } from '@/lib/constants';
import type { User } from '@/lib/types';
import { useUsers } from '../hooks/useUsers';

export function UsersSection() {
  const { users, isLoading, deleteUser, isDeleting } = useUsers();

  const handleEdit = (user: User) => {
    modals.openConfirmModal({
      title: 'Editar Usuario',
      children: `¿Deseas editar el usuario ${user.name}?`,
      labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
      onConfirm: () => {
        // TODO: Implementar modal de edición completo
      },
    });
  };

  const handleDelete = (user: User) => {
    modals.openConfirmModal({
      title: 'Desactivar Usuario',
      children: `¿Estás seguro de desactivar al usuario ${user.name}? Esta acción cambiará su estado a Inactivo.`,
      labels: { confirm: 'Desactivar', cancel: 'Cancelar' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteUser(user.id);
      },
    });
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'code',
        header: 'Código',
      },
      {
        accessorKey: 'name',
        header: 'Nombre',
      },
      {
        accessorKey: 'username',
        header: 'Usuario',
      },
      {
        accessorKey: 'email',
        header: 'Correo',
      },
      {
        accessorKey: 'role',
        header: 'Rol',
        Cell: ({ cell }) => {
          const role = cell.getValue<string>();
          return USER_ROLE_LABELS[role as keyof typeof USER_ROLE_LABELS] || role;
        },
      },
      {
        accessorKey: 'status',
        header: 'Estado',
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          const isActive = status === ENTITY_STATUS.ACTIVE;
          return (
            <Badge color={isActive ? 'green' : 'red'} variant="light">
              {isActive ? 'Activo' : 'Inactivo'}
            </Badge>
          );
        },
      },
      {
        id: 'actions',
        header: 'Acciones',
        Cell: ({ row }) => (
          <Group gap="xs">
            <Tooltip label="Editar usuario">
              <ActionIcon variant="light" color="blue" onClick={() => handleEdit(row.original)}>
                <IconEdit size={18} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Desactivar usuario">
              <ActionIcon
                variant="light"
                color="red"
                onClick={() => handleDelete(row.original)}
                disabled={isDeleting || row.original.status === ENTITY_STATUS.INACTIVE}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
        ),
      },
    ],
    [isDeleting]
  );

  if (isLoading) {
    return (
      <Stack gap="xl">
        <Title order={2} mb="md">
          Gestión de Usuarios
        </Title>
        <Table withTableBorder striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Código</Table.Th>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Usuario</Table.Th>
              <Table.Th>Correo</Table.Th>
              <Table.Th>Rol</Table.Th>
              <Table.Th>Estado</Table.Th>
              <Table.Th>Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <Table.Tr key={i}>
                {Array.from({ length: 7 }).map((_, j) => (
                  <Table.Td key={j}>
                    <Skeleton height={18} radius="sm" />
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    );
  }

  return (
    <Stack gap="xl">
      <Title order={2} mb="md">
        Gestión de Usuarios
      </Title>
      <MantineReactTable
        columns={columns}
        data={users}
        enableColumnActions={false}
        enableSorting
        enablePagination
        initialState={{
          pagination: { pageSize: 10, pageIndex: 0 },
        }}
      />
    </Stack>
  );
}
