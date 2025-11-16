import { Stack, Title } from '@mantine/core';
import { ExchangeRateForm } from './ExchangeRateForm';
import { ExchangeRateHistory } from './ExchangeRateHistory';

export function ExchangeRateSection() {
  return (
    <Stack gap="xl">
      <Title order={1}>Tipo de Cambio</Title>
      <ExchangeRateForm />
      <ExchangeRateHistory />
    </Stack>
  );
}
