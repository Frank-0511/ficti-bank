import { Box } from '@mantine/core';
import { FeaturesSection, Footer, HeroSection, ServicesSection } from '../components';

export default function IndexPage() {
  return (
    <Box
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, var(--mantine-color-gray-1) 0%, var(--mantine-color-blue-1) 100%)',
      }}
    >
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <Footer />
    </Box>
  );
}
