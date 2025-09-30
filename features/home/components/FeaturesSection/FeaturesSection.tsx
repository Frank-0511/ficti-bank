import {
  IconChartLine,
  IconClock24,
  IconCreditCard,
  IconLock,
  IconShieldCheck,
  IconUsers,
} from '@tabler/icons-react';
import { Card, Container, Grid, Stack, Text, ThemeIcon, Title } from '@mantine/core';

const features = [
  {
    icon: IconShieldCheck,
    title: 'Seguridad Garantizada',
    description:
      'Tecnología de encriptación de última generación para proteger tus datos y transacciones.',
    color: 'blue',
    gradient: { from: 'blue', to: 'cyan', deg: 45 },
  },
  {
    icon: IconClock24,
    title: 'Disponible 24/7',
    description:
      'Accede a tus cuentas y realiza operaciones bancarias en cualquier momento del día.',
    color: 'green',
    gradient: { from: 'teal', to: 'green', deg: 45 },
  },
  {
    icon: IconUsers,
    title: 'Atención Personalizada',
    description:
      'Soporte especializado para personas naturales y jurídicas con sus necesidades específicas.',
    color: 'violet',
    gradient: { from: 'violet', to: 'grape', deg: 45 },
  },
  {
    icon: IconCreditCard,
    title: 'Múltiples Productos',
    description:
      'Cuentas de ahorro, corrientes y a plazo en soles y dólares según tus necesidades.',
    color: 'orange',
    gradient: { from: 'orange', to: 'red', deg: 45 },
  },
  {
    icon: IconChartLine,
    title: 'Control Total',
    description:
      'Consulta movimientos, transferencias y mantén el control completo de tus finanzas.',
    color: 'teal',
    gradient: { from: 'teal', to: 'cyan', deg: 45 },
  },
  {
    icon: IconLock,
    title: 'Cumplimiento Legal',
    description:
      'Sistema que cumple con todas las regulaciones bancarias y manejo de embargos judiciales.',
    color: 'red',
    gradient: { from: 'pink', to: 'red', deg: 45 },
  },
];

export function FeaturesSection() {
  return (
    <Container size="xl" py={{ base: 24, md: 48 }} px={{ base: 'lg', md: '2xl' }}>
      <Stack gap="4xl" align="center">
        <Title
          order={2}
          ta="center"
          fz="5xl"
          fw={800}
          c="var(--mantine-color-header-title)"
          style={{ transition: 'color 0.3s ease' }}
        >
          Características del Sistema
        </Title>

        <Text
          ta="center"
          c="var(--mantine-color-text-tertiary)"
          maw={700}
          size="xl"
          fw={400}
          lh={1.8}
          style={{ transition: 'color 0.3s ease' }}
        >
          Nuestro sistema bancario ofrece todas las herramientas necesarias para la gestión
          eficiente de operaciones financieras.
        </Text>

        <Grid gutter="xl" mt="xl">
          {features.map((feature, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
              <Card
                padding="xl"
                shadow="lg"
                h="100%"
                style={{
                  backgroundColor: 'var(--mantine-color-card)',
                  border: 'var(--mantine-color-border)',
                  boxShadow: 'var(--mantine-color-card-shadow)',
                }}
              >
                <Stack gap="lg" align="center" ta="center">
                  <ThemeIcon
                    size={72}
                    radius="xl"
                    variant="gradient"
                    gradient={feature.gradient}
                    style={{
                      boxShadow: `0 0.625rem 2rem rgba(var(--mantine-color-${feature.color}-5-rgb), 0.3)`,
                    }}
                  >
                    <feature.icon size={64} />
                  </ThemeIcon>

                  <Title
                    order={3}
                    fw={700}
                    c="var(--mantine-color-header-title)"
                    style={{ transition: 'color 0.3s ease' }}
                  >
                    {feature.title}
                  </Title>

                  <Text
                    c="var(--mantine-color-text-tertiary)"
                    size="sm"
                    lh={1.6}
                    fw={400}
                    style={{ transition: 'color 0.3s ease' }}
                  >
                    {feature.description}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
