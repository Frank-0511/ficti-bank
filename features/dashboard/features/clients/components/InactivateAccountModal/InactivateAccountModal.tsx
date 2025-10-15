import { IconAlertCircle } from '@tabler/icons-react';
import { Alert, Button, Group, Stack, Text } from '@mantine/core';
import { type ContextModalProps } from '@mantine/modals';
import { useAccounts, useInactivateAccount } from '../../hooks';

export const InactivateAccountModal: React.FC<ContextModalProps<{ accountNumber: string }>> = ({
  id,
  context,
  innerProps,
}) => {
  const { data: accounts } = useAccounts();
  const inactivateAccountMutation = useInactivateAccount();
  const account = accounts?.find((acc) => acc.accountNumber === innerProps.accountNumber);

  const handleConfirmInactivate = () => {
    inactivateAccountMutation.mutate(innerProps.accountNumber, {
      onSuccess: () => {
        context.closeModal(id);
      },
    });
  };

  if (!account) {
    return null;
  }

  return (
    <Stack gap="md">
      <Text size="sm">
        ¿Estás seguro que deseas inactivar la cuenta <strong>{account.accountNumber}</strong>?
      </Text>
      <Alert icon={<IconAlertCircle size={20} />} title="Advertencia" color="yellow">
        <Text size="sm">
          Esta acción no se puede deshacer. La cuenta quedará inactiva y no podrá recibir ni
          realizar operaciones.
        </Text>
      </Alert>
      <Group justify="flex-end" gap="sm">
        <Button variant="default" onClick={() => context.closeModal(id)}>
          Cancelar
        </Button>
        <Button
          color="gray"
          onClick={handleConfirmInactivate}
          loading={inactivateAccountMutation.isPending}
        >
          Inactivar Cuenta
        </Button>
      </Group>
    </Stack>
  );
};
