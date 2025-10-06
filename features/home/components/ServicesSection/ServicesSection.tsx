import { IconShieldCheck } from '@tabler/icons-react';
import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';

const services = [
  'Registro de Clientes (Natural y Jurídica)',
  'Apertura y Cierre de Cuentas',
  'Depósitos y Retiros',
  'Transferencias entre Cuentas',
  'Cuentas a Plazo Fijo',
  'Consulta de Movimientos',
  'Manejo de Embargos Judiciales',
];

const stats = [
  { value: '24/7', label: 'Disponibilidad' },
  { value: '100%', label: 'Seguridad' },
  { value: '∞', label: 'Operaciones' },
];

// Componente reutilizable para servicios
function ServiceItem({ service }: { service: string }) {
  return (
    <Flex gap="md" align="center" style={{ transition: 'all 0.3s ease' }}>
      <ThemeIcon
        size={24}
        variant="gradient"
        gradient={{ from: 'teal', to: 'green', deg: 45 }}
        radius="xl"
        style={{ boxShadow: '0 0.25rem 1rem rgba(16, 185, 129, 0.3)' }}
      >
        <IconShieldCheck size={14} />
      </ThemeIcon>
      <Text
        fw={500}
        size="md"
        c="var(--mantine-color-text-secondary)"
        style={{ transition: 'color 0.3s ease' }}
      >
        {service}
      </Text>
    </Flex>
  );
}

// Componente reutilizable para estadísticas
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <Box ta="center">
      <Text fw={800} fz="3xl" c="var(--mantine-color-header-title-2)">
        {value}
      </Text>
      <Text size="md" c="var(--mantine-color-text-quaternary)" fw={500}>
        {label}
      </Text>
    </Box>
  );
}

export function ServicesSection() {
  return (
    <Container size="xl" py={{ base: 32, md: 64 }} px={{ base: 'lg', md: '2xl' }}>
      <Grid gutter={{ base: 30, md: 60 }} align="center">
        <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 6 }}>
          <Stack gap="xl" ta={{ base: 'center', md: 'left' }}>
            <Title
              order={2}
              fz="5xl"
              fw={800}
              c="var(--mantine-color-header-title)"
              style={{ transition: 'color 0.3s ease' }}
            >
              Servicios Disponibles
            </Title>

            <Text
              c="var(--mantine-color-text-tertiary)"
              size="xl"
              fw={400}
              lh={1.8}
              style={{ transition: 'color 0.3s ease' }}
            >
              Gestiona todas tus operaciones bancarias desde un solo lugar:
            </Text>

            <Stack gap="md" align="center" hiddenFrom="md">
              {services.map((service, index) => (
                <ServiceItem key={index} service={service} />
              ))}
            </Stack>

            <Stack gap="md" align="flex-start" visibleFrom="md">
              {services.map((service, index) => (
                <ServiceItem key={index} service={service} />
              ))}
            </Stack>
          </Stack>
        </Grid.Col>

        <Grid.Col
          span={{ base: 12, sm: 8, md: 6, lg: 6 }}
          offset={{ base: 0, sm: 2, md: 0, lg: 0 }}
        >
          <Card
            padding="lg"
            radius="xl"
            style={{
              background: 'var(--mantine-color-card)',
              border: 'var(--mantine-color-border)',
              boxShadow: 'var(--mantine-color-card-shadow)',
            }}
          >
            <Stack gap="xl" ta="center">
              <Title
                order={3}
                fz="2xl"
                c="var(--mantine-color-header-title-2)"
                fw={700}
                style={{ transition: 'color 0.3s ease' }}
              >
                Sistema Integral
              </Title>
              <Text
                c="var(--mantine-color-text-quaternary)"
                lh={1.8}
                fw={400}
                size="lg"
                style={{ transition: 'color 0.3s ease' }}
              >
                Plataforma web robusta que integra todos los servicios bancarios con validación
                SUNAT/RENIEC y cumplimiento normativo completo.
              </Text>
              <Group justify="center" gap="2xl">
                {stats.map((stat, index) => (
                  <StatItem key={index} value={stat.value} label={stat.label} />
                ))}
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
