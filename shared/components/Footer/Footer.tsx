import Link from 'next/link';
import { Anchor, Box, Container, Group, Text } from '@mantine/core';

export function Footer() {
  return (
    <Box
      style={{
        borderTop: 'var(--mantine-color-border)',
        transition: 'all 0.3s ease',
      }}
    >
      <Container size="xl" py="md">
        <Group justify="space-between" align="center" wrap="wrap">
          <Text size="md" fw={600}>
            © 2025 Ficti Bank. Todos los derechos reservados.
          </Text>
          <Group gap="2xl" wrap="wrap">
            <Anchor component={Link} href="/terms" size="md" fw={500}>
              Términos
            </Anchor>
            <Anchor component={Link} href="/privacy" size="md" fw={500}>
              Privacidad
            </Anchor>
            <Anchor component={Link} href="/support" size="md" fw={500}>
              Soporte
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
