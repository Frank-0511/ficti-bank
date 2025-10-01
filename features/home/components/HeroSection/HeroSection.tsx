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
import { LoginButton } from '@/shared/components/molecules/LoginButton';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <Container size="xl" py={{ base: 40, md: 80 }} px={{ base: 'lg', md: '2xl' }}>
      <Grid gutter={{ base: 32, md: 64 }} align="center">
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Stack gap="4xl">
            <Title order={1} fz="6xl" fw={900} lh={1.0}>
              <Text component="span" c="var(--mantine-color-header-title)" fw={700} inherit>
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

            <Text size="xl" c="var(--mantine-color-text-tertiary)" maw={600} lh={1.8} fw={400}>
              Sistema integral de gestión bancaria diseñado para brindar seguridad, eficiencia y
              control total sobre tus operaciones financieras. Maneja cuentas, transferencias y
              consultas con la confianza que mereces.
            </Text>

            <Group gap="sm">
              <LoginButton size="md" showIcon={false} />
              <Button size="md" variant="outline" color="var(--mantine-color-text-tertiary)">
                Conocer Más
              </Button>
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 5 }} visibleFrom="md">
          <Flex justify="center" align="center" p="xl" pos="relative">
            {/* Elementos decorativos de fondo */}
            <Box className={`${styles.decorativeTopRight} ${styles.decorativeIcon}`}>
              <IconBuildingBank size={30} />
            </Box>
            <Box className={`${styles.decorativeBottomLeft} ${styles.decorativeIconReverse}`}>
              <IconBuildingBank size={40} />
            </Box>

            {/* Ícono principal con animación flotante */}
            <ThemeIcon
              size={220}
              radius="xl"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
              className={styles.mainIcon}
            >
              <IconBuildingBank size={110} />
            </ThemeIcon>
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
