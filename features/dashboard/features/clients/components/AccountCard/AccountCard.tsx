import { IconX } from '@tabler/icons-react';
import { Badge, Button, Card, Group, Stack, Text } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import {
  ACCOUNT_STATUS,
  ACCOUNT_STATUS_LABELS,
  ACCOUNT_TYPE_LABELS,
  CURRENCY_LABELS,
  CURRENCY_SYMBOLS,
} from '@/lib/constants';
import type { Account } from '@/lib/types';
import styles from './AccountCard.module.css';

interface AccountCardProps {
  account: Account;
  onClose: (accountNumber: string) => void;
}

export const AccountCard = ({ account, onClose }: AccountCardProps) => {
  const getStatusColor = (status: Account['status']) => {
    switch (status) {
      case ACCOUNT_STATUS.ACTIVE:
        return 'green';
      case ACCOUNT_STATUS.INACTIVE:
        return 'gray';
      case ACCOUNT_STATUS.BLOCKED:
        return 'red';
      case ACCOUNT_STATUS.CANCELLED:
        return 'dark';
      default:
        return 'gray';
    }
  };

  const formatCurrency = (amount: number) => {
    return `${CURRENCY_SYMBOLS[account.currency]}${amount.toFixed(2)}`;
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.card}>
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Text fw={600} size="lg">
              {ACCOUNT_TYPE_LABELS[account.accountType]}
            </Text>
            <Text size="xs" c="dimmed">
              {account.accountNumber}
            </Text>
          </div>
          <Badge color={getStatusColor(account.status)} variant="light">
            {ACCOUNT_STATUS_LABELS[account.status]}
          </Badge>
        </Group>

        <div className={styles.balanceSection}>
          <div>
            <Text size="xs" c="dimmed">
              Saldo Disponible
            </Text>
            <Text size="xl" fw={700} className={styles.balance}>
              {formatCurrency(account.availableBalance)}
            </Text>
          </div>
          <Text size="xs" c="dimmed">
            {CURRENCY_LABELS[account.currency]}
          </Text>
        </div>

        <Group gap="xs" className={styles.details}>
          <div className={styles.detailItem}>
            <Text size="xs" c="dimmed">
              Saldo Actual
            </Text>
            <Text size="sm" fw={500}>
              {formatCurrency(account.currentBalance)}
            </Text>
          </div>
          {account.accountType === 'CC' && account.overdraftLimit && (
            <div className={styles.detailItem}>
              <Text size="xs" c="dimmed">
                Sobregiro
              </Text>
              <Text size="sm" fw={500}>
                {formatCurrency(account.overdraftLimit)}
              </Text>
            </div>
          )}
          {account.accountType === 'PF' && (
            <>
              <div className={styles.detailItem}>
                <Text size="xs" c="dimmed">
                  Plazo
                </Text>
                <Text size="sm" fw={500}>
                  {account.term} meses
                </Text>
              </div>
              <div className={styles.detailItem}>
                <Text size="xs" c="dimmed">
                  Interés
                </Text>
                <Text size="sm" fw={500}>
                  {account.monthlyInterest}%
                </Text>
              </div>
            </>
          )}
        </Group>

        {/* Botón para inactivar cuenta solo para CA y CC */}
        {account.status === ACCOUNT_STATUS.ACTIVE &&
          (account.accountType === 'CA' || account.accountType === 'CC') && (
            <Button
              variant="light"
              color="gray"
              size="xs"
              onClick={() =>
                openContextModal({
                  modal: 'inactivateAccount',
                  title: 'Inactivar Cuenta',
                  innerProps: { accountNumber: account.accountNumber },
                })
              }
              style={{ marginBottom: 8 }}
            >
              Inactivar Cuenta
            </Button>
          )}
        {account.status === ACCOUNT_STATUS.ACTIVE && (
          <Button
            variant="light"
            color="red"
            size="xs"
            leftSection={<IconX size={14} />}
            onClick={() => onClose(account.accountNumber)}
            disabled={account.currentBalance !== 0}
          >
            Cerrar Cuenta
          </Button>
        )}
      </Stack>
    </Card>
  );
};
