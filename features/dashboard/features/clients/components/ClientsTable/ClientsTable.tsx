import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Client } from '@/lib/types';
import { ClientRowActions } from './ClientRowActions';
import { getClientsColumns } from './columns';
import { tableLocalizationES } from './localization';

interface ClientsTableProps {
  clients: Client[];
}

export const ClientsTable = ({ clients }: ClientsTableProps) => {
  const router = useRouter();
  const columns = useMemo(() => getClientsColumns(), []);

  const table = useMantineReactTable({
    columns,
    data: clients,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableColumnPinning: true,
    enableStickyHeader: true,
    enableRowActions: true,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    positionActionsColumn: 'last',
    initialState: {
      density: 'xs',
      pagination: { pageSize: 10, pageIndex: 0 },
      columnPinning: { left: ['code', 'name'] },
    },
    mantineTableContainerProps: {
      style: { maxHeight: 600 },
    },
    mantineSearchTextInputProps: {
      placeholder: 'Buscar clientes...',
    },
    localization: tableLocalizationES,
    renderRowActions: ({ row }) => (
      <ClientRowActions
        client={row.original}
        onView={(client) => {
          router.push(`/dashboard/clients/${client.id}`);
        }}
        onEdit={(_client) => {
          // TODO: Implementar edición de cliente
        }}
        onDeactivate={(_client) => {
          // TODO: Implementar desactivación
        }}
      />
    ),
  });

  return <MantineReactTable table={table} />;
};
