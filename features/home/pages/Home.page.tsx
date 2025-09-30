import { FeaturesSection, HeroSection, ServicesSection } from '..';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Footer, Header, Navbar } from '../../../shared';
import styles from './Home.module.css';

export const HomePage = () => {
  const [mobileNavOpened, { toggle: toggleMobileNav }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { desktop: true, mobile: !mobileNavOpened },
      }}
      aside={{
        width: 300,
        breakpoint: 'md',
        collapsed: { desktop: true, mobile: !mobileNavOpened },
      }}
      className={styles.appShell}
    >
      <AppShell.Header className={styles.appShellHeader}>
        <Header mobileNavOpened={mobileNavOpened} toggleMobileNav={toggleMobileNav} />
      </AppShell.Header>
      <AppShell.Aside style={{ borderLeft: 'none' }}>
        <Navbar />
      </AppShell.Aside>
      <AppShell.Main className={styles.appShellMain}>
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
};
