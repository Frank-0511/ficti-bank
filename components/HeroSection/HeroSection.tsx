import { IconBuildingBank } from '@tabler/icons-react';
import {
  Button,
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
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <Container size="lg" py={{ base: rem(60), md: rem(120) }} px={{ base: 'md', md: 'xl' }}>
      <Grid gutter={{ base: 20, md: 50 }} align="center">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="xl">
            <Title order={1} size={rem(42)} fw={900} lh={1.1}>
              <Text component="span" c="dark.8" fw={700} inherit>
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

            <Text size="md" c="dark.6" maw={500} lh={1.6} fw={500}>
              Sistema integral de gestión bancaria diseñado para brindar seguridad, eficiencia y
              control total sobre tus operaciones financieras. Maneja cuentas, transferencias y
              consultas con la confianza que mereces.
            </Text>

            <Group gap="sm">
              <Button
                size="md"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                style={{
                  boxShadow: '0 8px 25px rgb(34 139 230 / 30%)',
                  transition: 'all 0.3s ease',
                }}
                className={styles.buttonSignIn}
              >
                Iniciar Sesión
              </Button>
              <Button
                size="md"
                variant="outline"
                color="dark"
                style={{
                  borderWidth: '2px',
                  transition: 'all 0.3s ease',
                }}
                className={styles.buttonKnowMore}
              >
                Conocer Más
              </Button>
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }} visibleFrom="md">
          <Flex justify="center" align="center" p="xl">
            <ThemeIcon
              size={rem(200)}
              radius="xl"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
            >
              <IconBuildingBank size={rem(100)} />
            </ThemeIcon>
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
