import { Button, Group, Stack, Text } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useUnfreezeAccount } from '../../hooks/useUnfreezeAccount';

interface UnfreezeAccountModalProps {
  accountNumber: string;
}

export const UnfreezeAccountModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<UnfreezeAccountModalProps>) => {
  const unfreezeAccountMutation = useUnfreezeAccount();

  const handleUnfreeze = () => {
    unfreezeAccountMutation.mutate(innerProps.accountNumber, {
      onSuccess: () => context.closeModal(id),
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUnfreeze();
      }}
    >
      <Stack>
        <Text>
          ¿Deseas desembargar la cuenta <b>{innerProps.accountNumber}</b>?
        </Text>
        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            onClick={() => context.closeModal(id)}
            disabled={unfreezeAccountMutation.isPending}
          >
            Cancelar
          </Button>
          <Button type="submit" loading={unfreezeAccountMutation.isPending} color="green">
            Desembargar
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
