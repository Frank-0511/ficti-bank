import { useEffect } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { Alert, Center, Loader, SimpleGrid, Text } from '@mantine/core';
import { mockAccounts } from '@/lib/mocks';
import { useAccountStore } from '@/lib/store';
import { useAccountModals } from '../../hooks';
import { AccountCard } from '../AccountCard';
import styles from './AccountsList.module.css';

export const AccountsList = () => {
  const { accounts, isLoading, setAccounts, setLoading } = useAccountStore();
  const { openCloseAccountModal } = useAccountModals();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAccounts(mockAccounts);
      setLoading(false);
    }, 500);
  }, [setAccounts, setLoading]);

  if (isLoading) {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (accounts.length === 0) {
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
