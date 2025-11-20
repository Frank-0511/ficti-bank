import { IconEye } from '@tabler/icons-react';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { Client } from '@/lib/types/client.types';

interface ClientRowActionsProps {
  client: Client;
  onView?: (client: Client) => void;
}

export const ClientRowActions = ({
  client,
  onView,
  // onEdit,
  // onDeactivate,
}: ClientRowActionsProps) => {
  return (
    <Group gap={4} wrap="nowrap" justify="center">
      <Tooltip label="Ver detalles">
        <ActionIcon size="sm" variant="subtle" color="blue" onClick={() => onView?.(client)}>
          <IconEye size={16} />
        </ActionIcon>
      </Tooltip>
      {/* Botones de editar y desactivar ocultos temporalmente */}
    </Group>
  );
};
