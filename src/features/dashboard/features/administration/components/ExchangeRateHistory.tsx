import { Badge, Paper, ScrollArea, Stack, Table, Text } from '@mantine/core';
import { useExchangeRates } from '../hooks';

export function ExchangeRateHistory() {
  const { data, isLoading } = useExchangeRates();

  const rates = data?.data || [];

  if (isLoading) {
    return (
      <Paper p="md" withBorder mt="md">
        <Text>Cargando historial...</Text>
      </Paper>
    );
  }

  if (rates.length === 0) {
    return (
      <Paper p="md" withBorder mt="md">
        <Text c="dimmed">No hay historial de tipos de cambio</Text>
      </Paper>
    );
  }

  return (
    <Paper p="md" withBorder mt="md">
      <Stack gap="md">
        <Text fw={600} size="lg">
          Historial de Tipos de Cambio
        </Text>

        <ScrollArea>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Fecha</Table.Th>
                <Table.Th>Tipo de Cambio</Table.Th>
                <Table.Th>Estado</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rates.map((rate) => {
                const isToday = rate.date === new Date().toISOString().split('T')[0];
                return (
                  <Table.Tr key={rate.id} bg="transparent">
                    <Table.Td>{new Date(rate.date).toLocaleDateString('es-PE')}</Table.Td>
                    <Table.Td>S/. {rate.rate.toFixed(2)}</Table.Td>
                    <Table.Td>
                      {isToday ? (
                        rate.updatedAt ? (
                          <Badge size="sm" color="blue" ml={isToday ? 'xs' : 0}>
                            Actualizado
                          </Badge>
                        ) : (
                          <Badge size="sm" color="green">
                            Hoy
                          </Badge>
                        )
                      ) : (
                        <Badge size="sm" color="gray">
                          Histórico
                        </Badge>
                      )}
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </Paper>
  );
}
