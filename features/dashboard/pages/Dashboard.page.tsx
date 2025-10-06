import { AppShell, Container, RemoveScroll } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AccountsList, DashboardHeader, DashboardNavbar } from '../components';
import styles from './Dashboard.module.css';

export const DashboardPage = () => {
  const [mobileNavOpened, { toggle: toggleMobileNav }] = useDisclosure();

  return (
    <RemoveScroll enabled={mobileNavOpened}>
      <AppShell
        header={{ height: 70 }}
        aside={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { desktop: true, mobile: !mobileNavOpened },
        }}
        className={styles.appShell}
      >
        <AppShell.Header>
          <DashboardHeader mobileNavOpened={mobileNavOpened} toggleMobileNav={toggleMobileNav} />
        </AppShell.Header>

        <AppShell.Aside className={styles.appShellAside}>
          <DashboardNavbar />
        </AppShell.Aside>

        <AppShell.Main>
          <Container size="xl" py="xl">
            <AccountsList />
          </Container>
        </AppShell.Main>
      </AppShell>
    </RemoveScroll>
  );
};
