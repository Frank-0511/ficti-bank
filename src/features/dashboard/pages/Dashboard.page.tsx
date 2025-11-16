import { useState } from 'react';
import { AppShell, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DashboardHeader, DashboardNavbar } from '../components';
import { ExchangeRateSection } from '../features/administration';
import { ClientsSection } from '../features/clients';
import styles from './Dashboard.module.css';

export const DashboardPage: React.FC = () => {
  const [mobileNavOpened, { toggle: toggleMobileNav }] = useDisclosure();
  const [activeSection, setActiveSection] = useState('clients');

  const renderContent = () => {
    switch (activeSection) {
      case 'clients':
        return <ClientsSection />;
      case 'deposits':
        return (
          <Container size="xl" py="xl">
            Depósitos (Próximamente)
          </Container>
        );
      case 'withdrawals':
        return (
          <Container size="xl" py="xl">
            Retiros (Próximamente)
          </Container>
        );
      case 'transfers':
        return (
          <Container size="xl" py="xl">
            Transferencias (Próximamente)
          </Container>
        );
      case 'exchange-rate':
        return <ExchangeRateSection />;
      case 'daily-summary':
        return (
          <Container size="xl" py="xl">
            Resumen del Día (Próximamente)
          </Container>
        );
      case 'users':
        return (
          <Container size="xl" py="xl">
            Usuarios (Próximamente)
          </Container>
        );
      default:
        return <ClientsSection />;
    }
  };

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
        <DashboardHeader mobileNavOpened={mobileNavOpened} toggleMobileNav={toggleMobileNav} />
      </AppShell.Header>

      <AppShell.Navbar className={styles.appShellAside}>
        <DashboardNavbar activeSection={activeSection} onSectionChange={setActiveSection} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl" px={{ base: 'lg', md: 'xl' }}>
          {renderContent()}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
