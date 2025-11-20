import { IconAlertCircle, IconInfoCircle } from '@tabler/icons-react';
import { Alert, Button, Group, Stack, Text } from '@mantine/core';
import { type ContextModalProps } from '@mantine/modals';
import { ACCOUNT_TYPE, CURRENCY_SYMBOLS } from '@/lib/constants/account.constants';
import { AccountType, Currency } from '../../../../../../lib/types/account.types';
import { useCancelFixedTerm } from '../../hooks/useCancelFixedTerm';
import { useCloseAccount } from '../../hooks/useCloseAccount';

export const CloseAccountModal: React.FC<
  ContextModalProps<{
    accountNumber: string;
    clientCode: string;
    currency: Currency;
    currentBalance: number;
    accountType?: AccountType;
    initialBalance?: number;
    openingDate?: string;
    monthlyInterest?: number;
  }>
> = ({ id, context, innerProps }) => {
  const closeAccountMutation = useCloseAccount();
  const cancelFixedTermMutation = useCancelFixedTerm();

  const isFixedTerm = innerProps.accountType === ACCOUNT_TYPE.FIXED_TERM;

  const handleConfirmClose = () => {
    if (isFixedTerm) {
      // Cancelar cuenta a plazo con cálculo de intereses
      cancelFixedTermMutation.mutate(innerProps.accountNumber, {
        onSuccess: () => {
          context.closeModal(id);
        },
      });
    } else {
      // Cerrar cuenta normal
      closeAccountMutation.mutate(innerProps.accountNumber, {
        onSuccess: () => {
          context.closeModal(id);
        },
      });
    }
  };

  const hasBalance = innerProps.currentBalance !== 0;
  const canClose = isFixedTerm || !hasBalance;

  // Calcular interés estimado para cuentas a plazo
  let estimatedInterest = 0;
  let monthsElapsed = 0;
  if (isFixedTerm && innerProps.openingDate && innerProps.monthlyInterest) {
    const openingDate = new Date(innerProps.openingDate);
    const currentDate = new Date();
    monthsElapsed = Math.floor(
      (currentDate.getTime() - openingDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    estimatedInterest =
      (innerProps.initialBalance || 0) * (innerProps.monthlyInterest / 100) * monthsElapsed;
  }

  return (
    <Stack gap="md">
      <Text size="sm">
        ¿Estás seguro que deseas {isFixedTerm ? 'cancelar' : 'cerrar'} la cuenta{' '}
        <strong>{innerProps.accountNumber}</strong>?
      </Text>

      {isFixedTerm && (
        <Alert icon={<IconInfoCircle size={20} />} title="Cancelación con Intereses" color="blue">
          <Stack gap="xs">
            <Text size="sm">
              Esta cuenta a plazo fijo será cancelada y se calculará el interés generado.
            </Text>
            <Text size="sm" fw={600}>
              Meses transcurridos: {monthsElapsed}
            </Text>
            <Text size="sm" fw={600}>
              Interés estimado: {CURRENCY_SYMBOLS[innerProps.currency]}
              {estimatedInterest.toFixed(2)}
            </Text>
            <Text size="sm" fw={600}>
              Saldo final estimado: {CURRENCY_SYMBOLS[innerProps.currency]}
              {(innerProps.currentBalance + estimatedInterest).toFixed(2)}
            </Text>
          </Stack>
        </Alert>
      )}

      {!isFixedTerm && hasBalance && (
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

      {canClose && (
        <Alert icon={<IconAlertCircle size={20} />} title="Advertencia" color="yellow">
          <Text size="sm">
            {isFixedTerm
              ? 'Una vez cancelada, la cuenta quedará cerrada y no se podrá revertir esta acción.'
              : 'Esta acción no se puede deshacer.'}
          </Text>
        </Alert>
      )}

      <Group justify="flex-end" gap="sm">
        <Button variant="default" onClick={() => context.closeModal(id)}>
          Cancelar
        </Button>
        <Button
          color={isFixedTerm ? 'orange' : 'red'}
          onClick={handleConfirmClose}
          disabled={!canClose}
          loading={closeAccountMutation.isPending || cancelFixedTermMutation.isPending}
        >
          {isFixedTerm ? 'Cancelar Cuenta' : 'Cerrar Cuenta'}
        </Button>
      </Group>
    </Stack>
  );
};
