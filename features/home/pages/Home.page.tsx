import { FeaturesSection, HeroSection, ServicesSection } from '..';
import { AppShell, RemoveScroll } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Footer, Header, Navbar } from '@/shared/components';
import styles from './Home.module.css';

export const HomePage = () => {
  const [mobileNavOpened, { toggle: toggleMobileNav }] = useDisclosure();

  return (
    <RemoveScroll enabled={mobileNavOpened}>
      <AppShell
        header={{ height: 60 }}
        aside={{
          width: 300,
          breakpoint: 'md',
          collapsed: { desktop: true, mobile: !mobileNavOpened },
        }}
        className={styles.appShell}
      >
        <AppShell.Header>
          <Header mobileNavOpened={mobileNavOpened} toggleMobileNav={toggleMobileNav} />
        </AppShell.Header>
        <AppShell.Aside className={styles.appShellAside}>
          <Navbar />
        </AppShell.Aside>
        <AppShell.Main>
          <HeroSection />
          <FeaturesSection />
          <ServicesSection />
          <Footer />
        </AppShell.Main>
      </AppShell>
    </RemoveScroll>
  );
};
