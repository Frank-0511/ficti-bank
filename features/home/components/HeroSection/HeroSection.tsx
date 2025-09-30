import { IconBuildingBank } from '@tabler/icons-react';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';

import './HeroSection.module.css';

export function HeroSection() {
  return (
    <Container size="xl" py={{ base: 40, md: 80 }} px={{ base: 'lg', md: '2xl' }}>
      <Grid gutter={{ base: 32, md: 64 }} align="center">
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Stack gap="4xl">
            <Title order={1} fz="6xl" fw={900} lh={1.0}>
              <Text
                component="span"
                c="var(--mantine-color-header-title)"
                fw={700}
                inherit
                style={{ transition: 'color 0.3s ease' }}
              >
                Bienvenido a{' '}
              </Text>
              <Text
                component="span"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                inherit
              >
                Ficti Bank
              </Text>
            </Title>

            <Text
              size="xl"
              c="var(--mantine-color-text-tertiary)"
              maw={600}
              lh={1.8}
              fw={400}
              style={{ transition: 'color 0.3s ease' }}
            >
              Sistema integral de gestión bancaria diseñado para brindar seguridad, eficiencia y
              control total sobre tus operaciones financieras. Maneja cuentas, transferencias y
              consultas con la confianza que mereces.
            </Text>

            <Group gap="sm">
              <Button size="md" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 45 }}>
                Iniciar Sesión
              </Button>
              <Button size="md" variant="outline" color="var(--mantine-color-text-tertiary)">
                Conocer Más
              </Button>
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 5 }} visibleFrom="md">
          <Flex justify="center" align="center" p="xl" pos="relative">
            {/* Elementos decorativos de fondo */}
            <Box
              pos="absolute"
              top={20}
              right={50}
              opacity={0.1}
              style={{
                animation: 'float 4s ease-in-out infinite',
              }}
            >
              <IconBuildingBank size={30} />
            </Box>
            <Box
              pos="absolute"
              bottom={40}
              left={30}
              opacity={0.08}
              style={{
                animation: 'float 3s ease-in-out infinite reverse',
              }}
            >
              <IconBuildingBank size={40} />
            </Box>

            {/* Ícono principal con animación flotante */}
            <ThemeIcon
              size={220}
              radius="xl"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
              style={{
                boxShadow: 'var(--mantine-color-primary-icon-shadow)',
                animation: 'float 3s ease-in-out infinite',
              }}
            >
              <IconBuildingBank size={110} />
            </ThemeIcon>
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
