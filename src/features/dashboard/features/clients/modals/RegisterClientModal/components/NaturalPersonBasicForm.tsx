import React from 'react';
import { IconCalendar, IconId, IconUser } from '@tabler/icons-react';
import { Button, Grid, Loader, Stack, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useAutoFocus } from '@/lib/hooks/utils/useAutoFocus';
import { useDniToForm } from '../../../hooks/useDniToForm';
import { useRegistrationContext } from '../context/RegistrationContext';

export const NaturalPersonBasicForm: React.FC = () => {
  const { naturalPersonBasicForm } = useRegistrationContext();
  const firstInputRef = useAutoFocus<HTMLInputElement>();
  const dniMutation = useDniToForm();
  const [hasConsultedDni, setHasConsultedDni] = React.useState(false);

  // Calcular fecha mínima para ser mayor de 18 años
  const maxAllowedDate = new Date();
  maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() - 18);

  const handleDniSearch = () => {
    const dni = naturalPersonBasicForm.values.dni;
    if (dni && dni.length === 8) {
      setHasConsultedDni(true);
      dniMutation.mutate(dni);
    }
  };

  return (
    <Stack gap="lg">
      <div>
        <Text size="lg" fw={600} mb="xs">
          Información Personal
        </Text>
        <Text size="sm" c="dimmed">
          Ingresa tus datos personales básicos
        </Text>
      </div>

      <Grid>
        <Grid.Col span={8}>
          <TextInput
            label="DNI"
            placeholder="12345678"
            leftSection={<IconId size={16} />}
            required
            maxLength={8}
            {...naturalPersonBasicForm.getInputProps('dni')}
          />
        </Grid.Col>
        <Grid.Col span={4} style={{ display: 'flex', alignItems: 'end' }}>
          <Button
            onClick={handleDniSearch}
            loading={dniMutation.isPending}
            disabled={dniMutation.isPending || naturalPersonBasicForm.values.dni.length !== 8}
          >
            Consultar DNI
          </Button>
        </Grid.Col>
        {/* Solo mostrar loader o campos si ya se consultó al menos una vez */}
        {hasConsultedDni &&
          (dniMutation.isPending ? (
            <Grid.Col
              span={12}
              pt="md"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Loader size="lg" />
              <Text mt="md">Consultando datos de RENIEC...</Text>
            </Grid.Col>
          ) : (
            <>
              <Grid.Col span={6}>
                <TextInput
                  ref={firstInputRef}
                  label="Nombres"
                  placeholder="Tu nombre"
                  leftSection={<IconUser size={16} />}
                  required
                  {...naturalPersonBasicForm.getInputProps('firstName')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Apellidos"
                  placeholder="Tus apellidos"
                  leftSection={<IconUser size={16} />}
                  required
                  {...naturalPersonBasicForm.getInputProps('lastName')}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <DatePickerInput
                  label="Fecha de Nacimiento"
                  placeholder="Selecciona tu fecha de nacimiento"
                  leftSection={<IconCalendar size={16} />}
                  required
                  maxDate={maxAllowedDate}
                  valueFormat="DD/MM/YYYY"
                  clearable
                  {...naturalPersonBasicForm.getInputProps('birthDate')}
                />
              </Grid.Col>
            </>
          ))}
      </Grid>
    </Stack>
  );
};
