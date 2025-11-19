import { useEffect, useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useNavigate } from 'react-router-dom';
import { Client } from '@/lib/types';
import { ClientRowActions } from './ClientRowActions';
import { getClientsColumns } from './columns';
import { tableLocalizationES } from './localization';

interface ClientsTableProps {
  clients: Client[];
}

export const ClientsTable = ({ clients }: ClientsTableProps) => {
  const navigate = useNavigate();
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
      columnPinning: { left: ['code', 'name'], right: ['mrt-row-actions'] },
      columnVisibility: { code: false },
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
          navigate(`/dashboard/clients/${client.id}`);
        }}
      />
    ),
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1535) {
        table.setColumnPinning({ left: [], right: [] });
      } else {
        table.setColumnPinning({ left: ['code', 'name'], right: ['mrt-row-actions'] });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [table]);

  return <MantineReactTable table={table} />;
};
