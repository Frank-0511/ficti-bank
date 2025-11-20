import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { Container, Skeleton, Table, Title } from '@mantine/core';
import { MOVEMENT_TYPE_LABELS } from '@/lib/constants/movement.constants';
import { AccountMovement, MovementType } from '@/lib/types/movement.type';
import { useDailyMovements } from '../hooks';

export function DailySummarySection() {
  const { data, isLoading, isFetching } = useDailyMovements();
  const columns = (): MRT_ColumnDef<AccountMovement>[] => [
    {
      header: 'Fecha',
      accessorKey: 'date',
      Cell: ({ cell }) => {
        const value = cell.getValue<string>();
        // Asegura que el valor sea un string ISO válido
        const date = value ? new Date(value) : null;
        return date && !isNaN(date.getTime())
          ? date.toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' })
          : '-';
      },
    },
    {
      accessorKey: 'type',
      header: 'Tipo',
      Cell: ({ cell }) => {
        const value = cell.getValue<MovementType>();
        return MOVEMENT_TYPE_LABELS[value] || value;
      },
    },
    {
      accessorKey: 'amount',
      header: 'Monto',
      Cell: ({ cell }) =>
        cell.getValue<number>().toLocaleString('es-PE', {
          style: 'currency',
          currency: 'PEN',
        }),
    },
    {
      accessorKey: 'accountNumber',
      header: 'N° Cuenta',
    },
    {
      accessorKey: 'description',
      header: 'Descripción',
    },
  ];

  if (isLoading || isFetching) {
    return (
      <Container size="xl" py="xl">
        <Title order={2} mb="md">
          Resumen de Operaciones del Día
        </Title>
        <Table withTableBorder striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Fecha</Table.Th>
              <Table.Th>Tipo</Table.Th>
              <Table.Th>Monto</Table.Th>
              <Table.Th>N° Cuenta</Table.Th>
              <Table.Th>Descripción</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <Table.Tr key={i}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Table.Td key={j}>
                    <Skeleton height={18} radius="sm" />
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Title order={2} mb="md">
        Resumen de Operaciones del Día
      </Title>
      <MantineReactTable
        columns={columns()}
        data={Array.isArray(data) ? data : []}
        enableColumnActions={false}
        enableSorting
        enablePagination
      />
    </Container>
  );
}
