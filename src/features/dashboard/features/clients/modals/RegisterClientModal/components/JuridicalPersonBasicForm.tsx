import React from 'react';
import { IconBuilding, IconId, IconUser } from '@tabler/icons-react';
import { Button, Grid, Loader, Stack, Text, TextInput } from '@mantine/core';
import { useAutoFocus } from '@/lib/hooks/utils/useAutoFocus';
import { useRucToForm } from '../../../hooks/useRucToForm';
import { useRegistrationContext } from '../context/RegistrationContext';

export const JuridicalPersonBasicForm: React.FC = () => {
  const { juridicalPersonBasicForm } = useRegistrationContext();
  const firstInputRef = useAutoFocus<HTMLInputElement>();
  // const rucMutation = useRucStore();
  const rucMutation = useRucToForm();
  // Nuevo estado para saber si ya se intentó consultar el RUC
  const [hasConsultedRuc, setHasConsultedRuc] = React.useState(false);

  // Cuando se llama mutate, marcamos que ya se consultó
  const handleRucSearch = () => {
    const ruc = juridicalPersonBasicForm.values.ruc;
    if (ruc && ruc.length === 11) {
      setHasConsultedRuc(true);
      rucMutation.mutate(ruc);
    }
  };

  return (
    <Stack gap="lg">
      <div>
        <Text size="lg" fw={600} mb="xs">
          Información de la Empresa
        </Text>
        <Text size="sm" c="dimmed">
          Ingresa el RUC para consultar los datos automáticamente
        </Text>
      </div>
      <Grid>
        <Grid.Col span={8}>
          <TextInput
            ref={firstInputRef}
            label="RUC"
            placeholder="12345678901"
            leftSection={<IconId size={16} />}
            required
            maxLength={11}
            {...juridicalPersonBasicForm.getInputProps('ruc')}
          />
        </Grid.Col>
        <Grid.Col span={4} style={{ display: 'flex', alignItems: 'end' }}>
          <Button
            variant="filled"
            onClick={handleRucSearch}
            loading={rucMutation.isPending}
            disabled={rucMutation.isPending || juridicalPersonBasicForm.values.ruc.length !== 11}
          >
            Consultar RUC
          </Button>
        </Grid.Col>
        {/* Solo mostrar loader o campos si ya se consultó al menos una vez */}
        {hasConsultedRuc &&
          (rucMutation.isPending ? (
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
              <Text mt="md">Consultando datos de SUNAT...</Text>
            </Grid.Col>
          ) : (
            <>
              <Grid.Col span={12}>
                <TextInput
                  label="Razón Social"
                  placeholder="Nombre completo de la empresa"
                  leftSection={<IconBuilding size={16} />}
                  required
                  {...juridicalPersonBasicForm.getInputProps('businessName')}
                  disabled={rucMutation.isPending}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Representante Legal"
                  placeholder="Nombre del representante"
                  leftSection={<IconUser size={16} />}
                  required
                  {...juridicalPersonBasicForm.getInputProps('legalRepresentative')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="DNI del Representante"
                  placeholder="12345678"
                  leftSection={<IconId size={16} />}
                  required
                  maxLength={8}
                  {...juridicalPersonBasicForm.getInputProps('representativeDni')}
                />
              </Grid.Col>
            </>
          ))}
      </Grid>
    </Stack>
  );
};
