import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Group, NumberInput, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { CURRENCY_SYMBOLS } from '@/lib/constants/account.constants';
import { useTransferAccount } from '../../hooks/useTransferAccount';
import { TransferFormValues, transferSchema } from './schema';

interface TransferAccountModalProps {
  accountNumber: string;
  currency: keyof typeof CURRENCY_SYMBOLS;
}

export const TransferAccountModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<TransferAccountModalProps>) => {
  const form = useForm<TransferFormValues>({
    initialValues: { amount: 0, destinationAccount: '' },
    validate: zod4Resolver(transferSchema),
  });

  const transferAccountMutation = useTransferAccount();

  const handleSubmit = (values: TransferFormValues) => {
    transferAccountMutation.mutate(
      {
        accountNumber: innerProps.accountNumber,
        destinationAccount: values.destinationAccount,
        amount: values.amount,
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
          Transferencia desde <b>{innerProps.accountNumber}</b>
        </Text>
        <TextInput
          label="Cuenta destino"
          placeholder="Número de cuenta destino"
          {...form.getInputProps('destinationAccount')}
        />
        <NumberInput
          label="Monto a transferir"
          min={0.01}
          hideControls
          step={0.01}
          decimalScale={2}
          fixedDecimalScale
          thousandSeparator=","
          leftSection={CURRENCY_SYMBOLS[innerProps.currency] || ''}
          {...form.getInputProps('amount')}
        />
        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            onClick={() => context.closeModal(id)}
            disabled={transferAccountMutation.isPending}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            loading={transferAccountMutation.isPending}
            disabled={transferAccountMutation.isPending}
          >
            Transferir
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
