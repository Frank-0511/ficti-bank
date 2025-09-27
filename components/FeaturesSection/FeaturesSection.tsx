import {
  IconChartLine,
  IconClock24,
  IconCreditCard,
  IconLock,
  IconShieldCheck,
  IconUsers,
} from '@tabler/icons-react';
import { Card, Container, Grid, rem, Stack, Text, ThemeIcon, Title } from '@mantine/core';

const features = [
  {
    icon: IconShieldCheck,
    title: 'Seguridad Garantizada',
    description:
      'Tecnología de encriptación de última generación para proteger tus datos y transacciones.',
    color: 'blue',
  },
  {
    icon: IconClock24,
    title: 'Disponible 24/7',
    description:
      'Accede a tus cuentas y realiza operaciones bancarias en cualquier momento del día.',
    color: 'green',
  },
  {
    icon: IconUsers,
    title: 'Atención Personalizada',
    description:
      'Soporte especializado para personas naturales y jurídicas con sus necesidades específicas.',
    color: 'violet',
  },
  {
    icon: IconCreditCard,
    title: 'Múltiples Productos',
    description:
      'Cuentas de ahorro, corrientes y a plazo en soles y dólares según tus necesidades.',
    color: 'orange',
  },
  {
    icon: IconChartLine,
    title: 'Control Total',
    description:
      'Consulta movimientos, transferencias y mantén el control completo de tus finanzas.',
    color: 'teal',
  },
  {
    icon: IconLock,
    title: 'Cumplimiento Legal',
    description:
      'Sistema que cumple con todas las regulaciones bancarias y manejo de embargos judiciales.',
    color: 'red',
  },
];

export function FeaturesSection() {
  return (
    <Container size="lg" py={rem(80)}>
      <Stack gap="xl" align="center">
        <Title order={2} ta="center" size={rem(40)} fw={700} c="dark.8">
          Características del Sistema
        </Title>

        <Text ta="center" c="dark.5" maw={600} size="lg" fw={500}>
          Nuestro sistema bancario ofrece todas las herramientas necesarias para la gestión
          eficiente de operaciones financieras.
        </Text>

        <Grid gutter="xl" mt="xl">
          {features.map((feature, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
              <Card
                padding="lg"
                shadow="sm"
                h="100%"
                style={{
                  transition: 'all 0.3s ease',
                  border: '1px solid var(--mantine-color-gray-3)',
                  background: 'rgb(255 255 255 / 80%)',
                  backdropFilter: 'blur(10px)',
                }}
                styles={{
                  root: {
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgb(0 0 0 / 10%)',
                      borderColor: 'var(--mantine-color-blue-4)',
                    },
                  },
                }}
              >
                <Stack gap="md" align="center" ta="center">
                  <ThemeIcon size={rem(60)} radius="xl" variant="light" color={feature.color}>
                    <feature.icon size={rem(30)} />
                  </ThemeIcon>

                  <Title order={4} fw={600} c="dark.8">
                    {feature.title}
                  </Title>

                  <Text c="dark.4" size="sm" lh={1.5} fw={500}>
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
