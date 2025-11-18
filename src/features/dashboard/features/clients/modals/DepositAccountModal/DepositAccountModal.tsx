import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Group, NumberInput, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { CURRENCY_SYMBOLS } from '@/lib/constants/account.constants';
import { useDepositAccount } from '../../hooks';
import { DepositFormValues, depositSchema } from './schema';

interface DepositAccountModalProps {
  accountNumber: string;
  currency: keyof typeof CURRENCY_SYMBOLS;
}

export const DepositAccountModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<DepositAccountModalProps>) => {
  const form = useForm<DepositFormValues>({
    initialValues: { amount: 0, authKey: '' },
    validate: zod4Resolver(depositSchema),
  });

  const depositAccountMutation = useDepositAccount();

  const handleSubmit = (values: DepositFormValues) => {
    depositAccountMutation.mutate(
      {
        accountNumber: innerProps.accountNumber,
        amount: values.amount,
        authKey: values.authKey,
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
          Depósito a la cuenta <b>{innerProps.accountNumber}</b>
        </Text>
        <NumberInput
          label="Monto a depositar"
          min={0.01}
          hideControls
          step={0.01}
          decimalScale={2}
          fixedDecimalScale
          thousandSeparator=","
          leftSection={CURRENCY_SYMBOLS[innerProps.currency] || ''}
          {...form.getInputProps('amount')}
        />

        {form.values.amount > 2000 && (
          <TextInput
            label="Clave de autorización"
            placeholder="Ingrese la clave de autorización"
            type="password"
            {...form.getInputProps('authKey')}
          />
        )}
        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            onClick={() => context.closeModal(id)}
            disabled={depositAccountMutation.isPending}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            loading={depositAccountMutation.isPending}
            disabled={depositAccountMutation.isPending}
          >
            Depositar
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
