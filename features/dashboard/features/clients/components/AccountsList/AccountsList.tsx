import { IconInfoCircle } from '@tabler/icons-react';
import { Alert, Center, SimpleGrid, Text } from '@mantine/core';
import { useAccountModals, useAccounts } from '../../hooks';
import { AccountCard } from '../AccountCard';
import { AccountCardSkeleton } from '../AccountCardSkeleton';
import styles from './AccountsList.module.css';

interface AccountsListProps {
  clientCode?: string;
}

export const AccountsList = ({ clientCode }: AccountsListProps) => {
  const { data: accounts, isLoading } = useAccounts(clientCode);
  const { openCloseAccountModal } = useAccountModals();

  if (isLoading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg" className={styles.grid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <AccountCardSkeleton key={index} />
        ))}
      </SimpleGrid>
    );
  }

  if (!accounts || accounts.length === 0) {
    return (
      <Center h={400}>
        <Alert
          icon={<IconInfoCircle size={20} />}
          title="No tienes cuentas"
          color="blue"
          variant="light"
        >
          <Text size="sm">
            Aún no tienes cuentas bancarias. Haz clic en &quot;Aperturar Cuenta&quot; para crear tu
            primera cuenta.
          </Text>
        </Alert>
      </Center>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg" className={styles.grid}>
      {accounts.map((account) => (
        <AccountCard
          key={account.accountNumber}
          account={account}
          onClose={openCloseAccountModal}
        />
      ))}
    </SimpleGrid>
  );
};
