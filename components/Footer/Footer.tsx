import { Anchor, Box, Container, Group, rem, Text } from '@mantine/core';

export function Footer() {
  return (
    <Box
      py={rem(30)}
      style={{
        background: 'rgb(248 249 250 / 90%)',
        borderTop: '1px solid var(--mantine-color-gray-3)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container size="lg" py="xl">
        <Group justify="space-between" align="center">
          <Text c="dark.4" size="sm" fw={500}>
            © 2025 Ficti Bank. Todos los derechos reservados.
          </Text>
          <Group gap="lg">
            <Anchor href="#" size="sm" c="dark.4" fw={500}>
              Términos
            </Anchor>
            <Anchor href="#" size="sm" c="dark.4" fw={500}>
              Privacidad
            </Anchor>
            <Anchor href="#" size="sm" c="dark.4" fw={500}>
              Soporte
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
