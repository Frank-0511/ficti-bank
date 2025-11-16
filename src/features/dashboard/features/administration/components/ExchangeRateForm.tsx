import { useState } from 'react';
import { Button, NumberInput, Paper, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useExchangeRateToday, useRegisterExchangeRate, useUpdateExchangeRate } from '../hooks';

export function ExchangeRateForm() {
  const [rate, setRate] = useState<number | string>(0);
  const { data: todayData } = useExchangeRateToday();
  const registerMutation = useRegisterExchangeRate();
  const updateMutation = useUpdateExchangeRate();

  const todayRate = todayData?.data;
  const isLoading = registerMutation.isPending || updateMutation.isPending;

  const handleSubmit = () => {
    const rateValue = typeof rate === 'string' ? parseFloat(rate) : rate;

    if (rateValue <= 0) {
      return;
    }

    if (todayRate) {
      // Ya existe un tipo de cambio, mostrar confirmación
      modals.openConfirmModal({
        title: 'Actualizar tipo de cambio',
        children: (
          <Text size="sm">
            Ya existe un tipo de cambio registrado para hoy (S/. {todayRate.rate.toFixed(2)}).
            ¿Desea actualizarlo a S/. {rateValue.toFixed(2)}?
          </Text>
        ),
        labels: { confirm: 'Actualizar', cancel: 'Cancelar' },
        confirmProps: { color: 'blue' },
        onConfirm: () => {
          updateMutation.mutate({ rate: rateValue });
        },
      });
    } else {
      // No existe, registrar
      registerMutation.mutate({ rate: rateValue });
    }
  };

  // Actualizar el valor del input cuando se carga el tipo de cambio del día
  useState(() => {
    if (todayRate) {
      setRate(todayRate.rate);
    }
  });

  return (
    <Paper p="md" withBorder>
      <Stack gap="md">
        <Text fw={600} size="lg">
          Tipo de Cambio del Día
        </Text>

        <NumberInput
          label="Tipo de cambio (USD a PEN)"
          placeholder="Ejemplo: 3.75"
          value={rate}
          onChange={setRate}
          min={0.01}
          step={0.01}
          decimalScale={2}
          fixedDecimalScale
          leftSection="S/."
          required
        />

        <Button onClick={handleSubmit} loading={isLoading} disabled={isLoading}>
          {todayRate ? 'Actualizar' : 'Registrar'} Tipo de Cambio
        </Button>
      </Stack>
    </Paper>
  );
}
