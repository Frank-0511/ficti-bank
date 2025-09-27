import { IconShieldCheck } from '@tabler/icons-react';
import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  rem,
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

export function ServicesSection() {
  return (
    <Box
      py={{ base: rem(40), md: rem(80) }}
      style={{
        background: 'rgb(255 255 255 / 70%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container size="lg" px={{ base: 'md', md: 'xl' }}>
        <Grid gutter={{ base: 20, md: 50 }} align="center">
          <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 6 }}>
            <Stack gap="lg" ta={{ base: 'center', md: 'left' }}>
              <Title order={2} size={rem(32)} fw={700} c="dark.8">
                Servicios Disponibles
              </Title>

              <Text c="dark.5" size="lg" fw={500}>
                Gestiona todas tus operaciones bancarias desde un solo lugar:
              </Text>

              <Stack gap="sm" align="center" hiddenFrom="md">
                {services.map((service, index) => (
                  <Flex key={index} gap="sm" align="center">
                    <ThemeIcon size={20} color="green" variant="filled" radius="xl">
                      <IconShieldCheck size={12} />
                    </ThemeIcon>
                    <Text fw={500} c="dark.8">
                      {service}
                    </Text>
                  </Flex>
                ))}
              </Stack>

              <Stack gap="sm" align="flex-start" visibleFrom="md">
                {services.map((service, index) => (
                  <Flex key={index} gap="sm" align="center">
                    <ThemeIcon size={20} color="green" variant="filled" radius="xl">
                      <IconShieldCheck size={12} />
                    </ThemeIcon>
                    <Text fw={500} c="dark.8">
                      {service}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col
            span={{ base: 12, sm: 8, md: 6, lg: 6 }}
            offset={{ base: 0, sm: 2, md: 0, lg: 0 }}
          >
            <Card
              padding="xl"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, var(--mantine-color-blue-0) 100%)',
                border: '1px solid var(--mantine-color-gray-3)',
                boxShadow: '0 10px 30px rgb(0 0 0 / 10%)',
              }}
            >
              <Stack gap="lg" ta="center">
                <Title order={3} c="blue" fw={600}>
                  Sistema Integral
                </Title>
                <Text c="dark.4" lh={1.6} fw={500}>
                  Plataforma web robusta que integra todos los servicios bancarios con validación
                  SUNAT/RENIEC y cumplimiento normativo completo.
                </Text>
                <Group justify="center" gap="lg">
                  <Box ta="center">
                    <Text fw={700} size="xl" c="blue">
                      24/7
                    </Text>
                    <Text size="sm" c="dark.4" fw={500}>
                      Disponibilidad
                    </Text>
                  </Box>
                  <Box ta="center">
                    <Text fw={700} size="xl" c="blue">
                      100%
                    </Text>
                    <Text size="sm" c="dark.4" fw={500}>
                      Seguridad
                    </Text>
                  </Box>
                  <Box ta="center">
                    <Text fw={700} size="xl" c="blue">
                      ∞
                    </Text>
                    <Text size="sm" c="dark.4" fw={500}>
                      Operaciones
                    </Text>
                  </Box>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
