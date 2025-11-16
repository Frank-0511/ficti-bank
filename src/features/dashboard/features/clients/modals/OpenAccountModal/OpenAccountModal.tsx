import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, NumberInput, Select, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { type ContextModalProps } from '@mantine/modals';
import {
  ACCOUNT_TYPE,
  ACCOUNT_TYPE_OPTIONS,
  CURRENCY,
  CURRENCY_OPTIONS,
  CURRENCY_SYMBOLS,
} from '@/lib/constants/account.constants';
import { useOpenAccount } from '../../hooks';
import { openAccountSchema, type OpenAccountFormData } from './schema';

export const OpenAccountModal: React.FC<ContextModalProps<{ clientCode?: string }>> = ({
  id,
  context,
  innerProps,
}) => {
  const { clientCode } = innerProps;
  const openAccountMutation = useOpenAccount();

  const form = useForm<OpenAccountFormData>({
    mode: 'uncontrolled',
    validate: zod4Resolver(openAccountSchema),
    initialValues: {
      accountType: ACCOUNT_TYPE.SAVINGS,
      currency: CURRENCY.SOLES,
      initialBalance: 0,
    },
  });

  const handleSubmit = (values: OpenAccountFormData) => {
    openAccountMutation.mutate(
      { ...values, clientCode },
      {
        onSuccess: () => {
          context.closeModal(id);
          form.reset();
        },
      }
    );
  };

  const isFixedTerm = form.values.accountType === ACCOUNT_TYPE.FIXED_TERM;
  const isChecking = form.values.accountType === ACCOUNT_TYPE.CHECKING;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <Select
          label="Tipo de Cuenta"
          placeholder="Selecciona el tipo de cuenta"
          data={ACCOUNT_TYPE_OPTIONS}
          required
          {...form.getInputProps('accountType')}
        />

        <Select
          label="Moneda"
          placeholder="Selecciona la moneda"
          data={CURRENCY_OPTIONS}
          required
          {...form.getInputProps('currency')}
        />

        {(isFixedTerm || isChecking) && (
          <NumberInput
            label="Saldo Inicial"
            placeholder="0.00"
            min={0}
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator=","
            prefix={`${CURRENCY_SYMBOLS[form.values.currency]} `}
            required={isFixedTerm}
            {...form.getInputProps('initialBalance')}
          />
        )}

        {!isFixedTerm && !isChecking && (
          <Text size="sm" c="dimmed">
            Las cuentas de ahorro se aperturan con saldo inicial de S/ 0.00
          </Text>
        )}

        {isFixedTerm && (
          <>
            <NumberInput
              label="Plazo (meses)"
              placeholder="12"
              min={1}
              max={120}
              required
              {...form.getInputProps('term')}
            />

            <NumberInput
              label="Interés Mensual (%)"
              placeholder="2.5"
              min={0.1}
              max={100}
              decimalScale={2}
              fixedDecimalScale
              step={0.1}
              required
              {...form.getInputProps('monthlyInterest')}
            />
          </>
        )}

        {isChecking && (
          <NumberInput
            label="Límite de Sobregiro (Opcional)"
            placeholder="0.00"
            min={0}
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator=","
            prefix={`${CURRENCY_SYMBOLS[form.values.currency]} `}
            {...form.getInputProps('overdraftLimit')}
          />
        )}

        <Button type="submit" fullWidth loading={openAccountMutation.isPending}>
          Aperturar Cuenta
        </Button>
      </Stack>
    </form>
  );
};
