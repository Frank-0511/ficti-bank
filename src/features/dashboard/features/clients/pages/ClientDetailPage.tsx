import { useEffect, useState } from 'react';
import { IconUserOff } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppShell, Button, Center, Container, Stack, Text } from '@mantine/core';
import styles from '@/features/dashboard/pages/Dashboard.module.css';
import { Client } from '@/lib/types';
import { AccountsList } from '../components/AccountsList';
import { ClientDetailHeader } from '../components/ClientDetailHeader';
import { ClientDetailNavbar } from '../components/ClientDetailNavbar';
import { clientService } from '../services/client.service';

function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
        <ClientDetailNavbar client={client} loadingData={loading} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Container size="xl" py="xl">
          {!client && !loading ? (
            <Center h={340}>
              <Stack align="center" gap={8}>
                <IconUserOff size={64} color="#adb5bd" />
                <Text size="lg" fw={600} c="dimmed">
                  No se encontró el cliente
                </Text>
                <Button variant="light" onClick={() => navigate('/dashboard')} mt={8}>
                  Ir al inicio
                </Button>
              </Stack>
            </Center>
          ) : (
            <AccountsList clientCode={client?.code} loadingData={loading} />
          )}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
export default ClientDetailPage;
