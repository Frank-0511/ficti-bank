import { Paper, Skeleton, Stack } from '@mantine/core';

export const ClientsTableSkeleton = () => {
  return (
    <Paper withBorder p="md">
      <Stack gap="md">
        {/* Header de búsqueda */}
        <Skeleton height={40} radius="sm" />

        {/* Tabla */}
        <Stack gap="xs">
          {/* Header de tabla */}
          <Skeleton height={45} radius="sm" />

          {/* Filas */}
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height={60} radius="sm" />
          ))}
        </Stack>

        {/* Paginación */}
        <Skeleton height={36} width={200} radius="sm" ml="auto" />
      </Stack>
    </Paper>
  );
};
