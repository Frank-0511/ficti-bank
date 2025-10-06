import { IconAlertCircle } from '@tabler/icons-react';
import { Alert, Button, Group, Stack, Text } from '@mantine/core';
import { type ContextModalProps } from '@mantine/modals';
import { CURRENCY_SYMBOLS } from '@/lib/constants/account.constants';
import { useAccountStore } from '@/lib/store/account.store';

export const CloseAccountModal: React.FC<ContextModalProps<{ accountNumber: string }>> = ({
  id,
  context,
  innerProps,
}) => {
  const { accounts } = useAccountStore();
  const account = accounts.find((acc) => acc.accountNumber === innerProps.accountNumber);

  const handleConfirmClose = () => {
    context.closeModal(id);
  };

  if (!account) {
    return null;
  }

  const hasBalance = account.currentBalance !== 0;

  return (
    <Stack gap="md">
      <Text size="sm">
        ¿Estás seguro que deseas cerrar la cuenta <strong>{account.accountNumber}</strong>?
      </Text>

      {hasBalance && (
        <Alert icon={<IconAlertCircle size={20} />} title="No se puede cerrar" color="red">
          <Text size="sm">
            Esta cuenta tiene un saldo de{' '}
            <strong>
              {CURRENCY_SYMBOLS[account.currency]}
              {account.currentBalance.toFixed(2)}
            </strong>
            . Para cerrar la cuenta, el saldo debe ser S/ 0.00.
          </Text>
        </Alert>
      )}

      {!hasBalance && (
        <Alert icon={<IconAlertCircle size={20} />} title="Advertencia" color="yellow">
          <Text size="sm">Esta acción no se puede deshacer.</Text>
        </Alert>
      )}

      <Group justify="flex-end" gap="sm">
        <Button variant="default" onClick={() => context.closeModal(id)}>
          Cancelar
        </Button>
        <Button color="red" onClick={handleConfirmClose} disabled={hasBalance}>
          Cerrar Cuenta
        </Button>
      </Group>
    </Stack>
  );
};
