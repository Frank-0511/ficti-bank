import { zod4Resolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { Button, Group, NumberInput, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { CURRENCY_SYMBOLS } from '@/lib/constants/account.constants';
import { useWithdrawAccount } from '../../hooks';

const withdrawSchema = z.object({
  amount: z.number().min(0.01, 'El monto debe ser mayor a 0').optional(),
});

type WithdrawFormValues = z.infer<typeof withdrawSchema>;

interface WithdrawAccountModalProps {
  accountNumber: string;
  currency: keyof typeof CURRENCY_SYMBOLS;
}

export const WithdrawAccountModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<WithdrawAccountModalProps>) => {
  const form = useForm<WithdrawFormValues>({
    initialValues: { amount: undefined },
    validate: zod4Resolver(withdrawSchema),
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
