import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Group, Loader, Pagination, Table, Text } from '@mantine/core';
import { AccountMovement, getAccountMovements } from '../../services/accountMovements.service';

interface AccountMovementsModalProps {
  context: any;
  id: string;
  innerProps: {
    accountNumber: string;
  };
}

export function AccountMovementsModal({ innerProps }: AccountMovementsModalProps) {
  const { accountNumber } = innerProps;
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['accountMovements', accountNumber],
    queryFn: () => getAccountMovements(accountNumber),
  });

  const total = Array.isArray(data) ? data.length : 0;
  const totalPages = Math.ceil(total / pageSize);
  const pagedData = Array.isArray(data) ? data.slice((page - 1) * pageSize, page * pageSize) : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Text color="red">Error al cargar los movimientos.</Text>
      ) : !Array.isArray(data) || data.length === 0 ? (
        <Text>No hay movimientos recientes.</Text>
      ) : (
        <>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Fecha</Table.Th>
                <Table.Th>Tipo</Table.Th>
                <Table.Th>Monto</Table.Th>
                <Table.Th>Saldo</Table.Th>
                <Table.Th>Descripción</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {pagedData.map((mov: AccountMovement) => (
                <Table.Tr key={mov.id}>
                  <Table.Td>{new Date(mov.date).toLocaleString()}</Table.Td>
                  <Table.Td>{mov.type}</Table.Td>
                  <Table.Td>
                    {mov.amount.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}
                  </Table.Td>
                  <Table.Td>
                    {mov.balance.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}
                  </Table.Td>
                  <Table.Td>{mov.description || '-'}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          {totalPages > 1 && (
            <Group justify="center" mt="md">
              <Pagination value={page} onChange={setPage} total={totalPages} size="sm" />
            </Group>
          )}
        </>
      )}
    </>
  );
}
