import { IconAlertCircle } from '@tabler/icons-react';
import { Alert, Button, Group, Stack, Text } from '@mantine/core';
import { type ContextModalProps } from '@mantine/modals';
import { CURRENCY_SYMBOLS } from '@/lib/constants/account.constants';
import { Currency } from '@/lib/types';
import { useCloseAccount } from '../../hooks';

export const CloseAccountModal: React.FC<
  ContextModalProps<{
    accountNumber: string;
    clientCode: string;
    currency: Currency;
    currentBalance: number;
  }>
> = ({ id, context, innerProps }) => {
  const closeAccountMutation = useCloseAccount();

  const handleConfirmClose = () => {
    closeAccountMutation.mutate(innerProps.accountNumber, {
      onSuccess: () => {
        context.closeModal(id);
      },
    });
  };

  const hasBalance = innerProps.currentBalance !== 0;

  return (
    <Stack gap="md">
      <Text size="sm">
        ¿Estás seguro que deseas cerrar la cuenta <strong>{innerProps.accountNumber}</strong>?
      </Text>

      {hasBalance && (
        <Alert icon={<IconAlertCircle size={20} />} title="No se puede cerrar" color="red">
          <Text size="sm">
            Esta cuenta tiene un saldo de{' '}
            <strong>
              {CURRENCY_SYMBOLS[innerProps.currency]}
              {innerProps.currentBalance.toFixed(2)}
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
        <Button
          color="red"
          onClick={handleConfirmClose}
          disabled={hasBalance}
          loading={closeAccountMutation.isPending}
        >
          Cerrar Cuenta
        </Button>
      </Group>
    </Stack>
  );
};
