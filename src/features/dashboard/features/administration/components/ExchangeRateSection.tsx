import { Container, Title } from '@mantine/core';
import { ExchangeRateForm } from './ExchangeRateForm';
import { ExchangeRateHistory } from './ExchangeRateHistory';

export function ExchangeRateSection() {
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="md">
        Tipo de Cambio
      </Title>
      <ExchangeRateForm />
      <ExchangeRateHistory />
    </Container>
  );
}
