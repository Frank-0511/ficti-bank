import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Group, NumberInput, Radio, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { CURRENCY_SYMBOLS } from '@/lib/constants/account.constants';
import { useFreezeAccount } from '../../hooks';
import { FreezeFormValues, freezeSchema } from './schema';

interface FreezeAccountModalProps {
  accountNumber: string;
  currency: keyof typeof CURRENCY_SYMBOLS;
}

export const FreezeAccountModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<FreezeAccountModalProps>) => {
  const freezeAccountMutation = useFreezeAccount();

  const form = useForm<FreezeFormValues>({
    initialValues: { type: 'total', amount: undefined },
    transformValues: (values) => ({
      ...values,
      amount:
        typeof values.amount === 'string' && values.amount.trim() === ''
          ? undefined
          : values.amount,
    }),
    validate: zod4Resolver(freezeSchema),
  });

  const type = form.values.type;

  const handleSubmit = (values: FreezeFormValues) => {
    freezeAccountMutation.mutate(
      {
        accountNumber: innerProps.accountNumber,
        type: values.type,
        amount: values.amount ? Number(values.amount) : undefined,
      },
      {
        onSuccess: () => {
          context.closeModal(id);
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Text>
          ¿Cómo deseas embargar la cuenta <b>{innerProps.accountNumber}</b>?
        </Text>
        <Radio.Group
          name="type"
          label="Tipo de embargo"
          value={form.values.type}
          onChange={(value) => form.setFieldValue('type', value as 'total' | 'partial')}
        >
          <Group pt="sm">
            <Radio value="total" label="Total (todo el saldo disponible)" />
            <Radio value="partial" label="Parcial (monto específico)" />
          </Group>
        </Radio.Group>
        {type === 'partial' && (
          <NumberInput
            label="Monto a embargar"
            {...form.getInputProps('amount')}
            hideControls
            step={0.01}
            leftSection={CURRENCY_SYMBOLS[innerProps.currency] || ''}
          />
        )}
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={() => context.closeModal(id)}>
            Cancelar
          </Button>
          <Button type="submit" color="red">
            Embargar
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
