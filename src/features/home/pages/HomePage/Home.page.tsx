import { FeaturesSection } from '@features/home/components/FeaturesSection/FeaturesSection';
import { HeroSection } from '@features/home/components/HeroSection/HeroSection';
import { ServicesSection } from '@features/home/components/ServicesSection/ServicesSection';
import { Footer } from '@shared/components/organisms/Footer/Footer';
import { Header } from '@shared/components/organisms/Header/Header';
import { Navbar } from '@shared/components/organisms/Navbar/Navbar';
import { AppShell, RemoveScroll } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
