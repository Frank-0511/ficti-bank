import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Group, NumberInput, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { ACCOUNT_TYPE, CURRENCY_SYMBOLS } from '@/lib/constants/account.constants';
import { useWithdrawAccount } from '../../hooks';
import { WithdrawFormValues, withdrawSchema } from './schema';

interface WithdrawAccountModalProps {
  accountNumber: string;
  currency: keyof typeof CURRENCY_SYMBOLS;
  accountType?: string;
  availableBalance?: number;
  overdraftLimit?: number;
}

export const WithdrawAccountModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<WithdrawAccountModalProps>) => {
  // Determinar el límite máximo de retiro
  const maxAmount = innerProps.availableBalance || 0;

  const schema = withdrawSchema(maxAmount);

  const form = useForm<WithdrawFormValues>({
    initialValues: { amount: undefined },
    validate: zod4Resolver(schema),
  });

  const withdrawAccountMutation = useWithdrawAccount();

  const handleSubmit = (values: WithdrawFormValues) => {
    withdrawAccountMutation.mutate(
      {
        accountNumber: innerProps.accountNumber,
        amount: values.amount as number,
      },
      {
        onSuccess: () => context.closeModal(id),
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Text size="sm" mb={4}>
          Retiro de la cuenta <b>{innerProps.accountNumber}</b>
        </Text>
        <NumberInput
          label="Monto a retirar"
          hideControls
          step={0.01}
          decimalScale={2}
          fixedDecimalScale
          thousandSeparator=","
          leftSection={CURRENCY_SYMBOLS[innerProps.currency] || ''}
          {...form.getInputProps('amount')}
        />
        <Text size="sm" c="dimmed">
          {innerProps.accountType === ACCOUNT_TYPE.CHECKING
            ? `Límite disponible: ${(CURRENCY_SYMBOLS[innerProps.currency] || '') + maxAmount.toFixed(2)} (Saldo + Sobregiro)`
            : `Saldo disponible: ${(CURRENCY_SYMBOLS[innerProps.currency] || '') + maxAmount.toFixed(2)}`}
        </Text>
        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            onClick={() => context.closeModal(id)}
            disabled={withdrawAccountMutation.isPending}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            loading={withdrawAccountMutation.isPending}
            disabled={withdrawAccountMutation.isPending}
          >
            Retirar
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
