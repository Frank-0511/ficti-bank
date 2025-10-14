import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppShell, Center, Container, Loader, Text } from '@mantine/core';
import styles from '@/features/dashboard/pages/Dashboard.module.css';
import { Client } from '@/lib/types';
import { AccountsList } from '../components/AccountsList';
import { ClientDetailHeader } from '../components/ClientDetailHeader';
import { ClientDetailNavbar } from '../components/ClientDetailNavbar';
import { clientService } from '../services/client.service';

export function ClientDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileNavOpened, setMobileNavOpened] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    clientService
      .getById(id as string)
      .then((res) => setClient(res.data))
      .catch(() => setClient(null))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: false, mobile: !mobileNavOpened },
      }}
      className={styles.appShell}
    >
      <AppShell.Header>
        <ClientDetailHeader
          client={client}
          mobileNavOpened={mobileNavOpened}
          toggleMobileNav={() => setMobileNavOpened((v) => !v)}
        />
      </AppShell.Header>
      <AppShell.Navbar className={styles.appShellAside}>
        <ClientDetailNavbar client={client} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Container size="xl" py="xl">
          {loading ? (
            <Center h={300}>
              <Loader />
            </Center>
          ) : !client ? (
            <Center h={300}>
              <Text>No se encontró el cliente</Text>
            </Center>
          ) : (
            <AccountsList clientCode={client.code} />
          )}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
