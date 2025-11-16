import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { ENTITY_STATUS } from '@/lib/constants';
import { Client } from '@/lib/types';

interface ClientRowActionsProps {
  client: Client;
  onView?: (client: Client) => void;
  onEdit?: (client: Client) => void;
  onDeactivate?: (client: Client) => void;
}

export const ClientRowActions = ({
  client,
  onView,
  onEdit,
  onDeactivate,
}: ClientRowActionsProps) => {
  return (
    <Group gap={4} wrap="nowrap">
      <Tooltip label="Ver detalles">
        <ActionIcon size="sm" variant="subtle" color="blue" onClick={() => onView?.(client)}>
          <IconEye size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Editar">
        <ActionIcon size="sm" variant="subtle" color="yellow" onClick={() => onEdit?.(client)}>
          <IconEdit size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Desactivar">
        <ActionIcon
          size="sm"
          variant="subtle"
          color="red"
          onClick={() => onDeactivate?.(client)}
          disabled={client.status === ENTITY_STATUS.INACTIVE}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
