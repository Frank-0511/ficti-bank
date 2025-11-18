import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Group, NumberInput, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { type ContextModalProps } from '@mantine/modals';
import { useRenewFixedTerm } from '../../hooks';
import { renewFixedTermSchema, type RenewFixedTermFormValues } from './schema';

interface RenewFixedTermModalProps {
  accountNumber: string;
  currentTerm: number;
  currentInterest: number;
}

export const RenewFixedTermModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<RenewFixedTermModalProps>) => {
  const renewMutation = useRenewFixedTerm();

  const form = useForm<RenewFixedTermFormValues>({
    validate: zod4Resolver(renewFixedTermSchema),
    initialValues: {
      term: innerProps.currentTerm,
      monthlyInterest: innerProps.currentInterest,
    },
  });

  const handleSubmit = (values: RenewFixedTermFormValues) => {
    renewMutation.mutate(
      {
        accountNumber: innerProps.accountNumber,
        ...values,
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
      <Stack gap="md">
        <Text size="sm">
          Renovar la cuenta a plazo fijo <strong>{innerProps.accountNumber}</strong>
        </Text>

        <NumberInput
          label="Nuevo Plazo (meses)"
          placeholder="Ingrese el plazo en meses"
          min={1}
          max={120}
          {...form.getInputProps('term')}
          required
        />

        <NumberInput
          label="Interés Mensual (%)"
          placeholder="Ingrese el interés mensual"
          min={0.01}
          max={15}
          step={0.01}
          decimalScale={2}
          {...form.getInputProps('monthlyInterest')}
          required
        />

        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            onClick={() => context.closeModal(id)}
            disabled={renewMutation.isPending}
          >
            Cancelar
          </Button>
          <Button type="submit" loading={renewMutation.isPending} color="blue">
            Renovar Cuenta
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
