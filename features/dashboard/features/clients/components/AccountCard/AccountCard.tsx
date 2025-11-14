// ...existing code...
import { Badge, Card, Group, Stack, Text } from '@mantine/core';
import {
  ACCOUNT_STATUS,
  ACCOUNT_STATUS_LABELS,
  ACCOUNT_TYPE,
  ACCOUNT_TYPE_LABELS,
  CURRENCY_LABELS,
  CURRENCY_SYMBOLS,
} from '@/lib/constants';
import type { Account } from '@/lib/types';
import { AccountActionsMenu } from './AccountActionsMenu';
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
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Text
              fw={600}
              size="lg"
              style={{ flex: 1, minWidth: 0, wordBreak: 'break-word', whiteSpace: 'normal' }}
            >
              {ACCOUNT_TYPE_LABELS[account.accountType]}
            </Text>
            <div style={{ flexShrink: 0 }}>
              <AccountActionsMenu account={account} onClose={onClose} />
            </div>
          </Group>
        </Card.Section>

        <Group justify="space-between" align="flex-start">
          <Text size="sm" c="gray.6" fw="600">
            {account.accountNumber}
          </Text>
          <Group gap={4} align="flex-start">
            <Badge color={getStatusColor(account.status)} variant="light">
              {ACCOUNT_STATUS_LABELS[account.status]}
            </Badge>
          </Group>
        </Group>

        <div className={styles.balanceSection}>
          <div>
            <Text size="xs" c="dimmed">
              Saldo Disponible
            </Text>
            <Text
              size="xl"
              fw={700}
              className={styles.balance}
              c={
                account.currentBalance < 0 ||
                (account.currentBalance === 0 && account.status === ACCOUNT_STATUS.BLOCKED)
                  ? 'red'
                  : undefined
              }
            >
              {formatCurrency(account.currentBalance)}
            </Text>
          </div>
          <Text size="xs" c="dimmed">
            {CURRENCY_LABELS[account.currency]}
          </Text>
        </div>

        <Group gap="xs" className={styles.details}>
          {account.accountType === ACCOUNT_TYPE.CHECKING && account.overdraftLimit && (
            <div className={styles.detailItem}>
              <Text size="xs" c="dimmed">
                Sobregiro
              </Text>
              <Text size="sm" fw={500}>
                {formatCurrency(account.overdraftLimit)}
              </Text>
            </div>
          )}
          {account.accountType === ACCOUNT_TYPE.FIXED_TERM && (
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

        {/* ...resto del contenido... */}
      </Stack>
    </Card>
  );
};
