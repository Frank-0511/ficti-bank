import type { MRT_ColumnDef } from 'mantine-react-table';
import { Badge, Text } from '@mantine/core';
import { ENTITY_STATUS } from '@/lib/constants/status.constants';
import { Client } from '@/lib/types/client.types';

const getClientName = (client: Client) => {
  if (client.personType === 'N') {
    return `${client.firstName} ${client.lastName}`;
  }
  return client.businessName || '-';
};

export const getClientsColumns = (): MRT_ColumnDef<Client>[] => [
  {
    accessorKey: 'code',
    header: 'Código',
    size: 100,
    enablePinning: true,
    Cell: ({ cell }) => <Text fw={500}>{cell.getValue<string>()}</Text>,
  },
  {
    accessorKey: 'name',
    header: 'Nombre / Razón Social',
    size: 250,
    enablePinning: true,
    accessorFn: (row) => getClientName(row),
    Cell: ({ row }) => (
      <div>
        <Text size="sm" fw={500}>
          {getClientName(row.original)}
        </Text>
        {row.original.personType === 'J' && row.original.legalRepresentative && (
          <Text size="xs" c="dimmed">
            Rep. Legal: {row.original.legalRepresentative}
          </Text>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'personType',
    header: 'Tipo',
    size: 100,
    Cell: ({ cell }) => (
      <Badge color={cell.getValue() === 'N' ? 'blue' : 'grape'} variant="light">
        {cell.getValue<string>() === 'N' ? 'Natural' : 'Jurídica'}
      </Badge>
    ),
    filterVariant: 'select',
    mantineFilterSelectProps: {
      data: [
        { value: 'N', label: 'Natural' },
        { value: 'J', label: 'Jurídica' },
      ],
    },
  },
  {
    accessorKey: 'document',
    header: 'Documento',
    size: 120,
    accessorFn: (row) => (row.personType === 'N' ? row.dni : row.ruc),
    Cell: ({ row }) => (
      <Text size="sm">{row.original.personType === 'N' ? row.original.dni : row.original.ruc}</Text>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 200,
    Cell: ({ cell }) => (
      <Text size="sm" c="dimmed">
        {cell.getValue<string>()}
      </Text>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
    size: 120,
    Cell: ({ cell }) => <Text size="sm">{cell.getValue<string>()}</Text>,
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    size: 100,
    Cell: ({ cell }) => (
      <Badge color={cell.getValue() === ENTITY_STATUS.ACTIVE ? 'green' : 'red'}>
        {cell.getValue<string>() === ENTITY_STATUS.ACTIVE ? 'Activo' : 'Inactivo'}
      </Badge>
    ),
    filterVariant: 'select',
    mantineFilterSelectProps: {
      data: [
        { value: ENTITY_STATUS.ACTIVE, label: 'Activo' },
        { value: ENTITY_STATUS.INACTIVE, label: 'Inactivo' },
      ],
    },
  },
];
