import { IconBuilding, IconId, IconUser } from '@tabler/icons-react';
import { Grid, Stack, Text, TextInput } from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';
import { useAutoFocus } from '@/lib/hooks';
import { type JuridicalPersonBasicFormValues } from '../../../schemas';

interface JuridicalPersonBasicFormProps {
  form: UseFormReturnType<JuridicalPersonBasicFormValues>;
}

export const JuridicalPersonBasicForm: React.FC<JuridicalPersonBasicFormProps> = ({ form }) => {
  const firstInputRef = useAutoFocus<HTMLInputElement>();

  return (
    <Stack gap="lg">
      <div>
        <Text size="lg" fw={600} mb="xs">
          Información de la Empresa
        </Text>
        <Text size="sm" c="dimmed">
          Ingresa los datos básicos de tu empresa
        </Text>
      </div>

      <Grid>
        <Grid.Col span={12}>
          <TextInput
            ref={firstInputRef}
            label="Razón Social"
            placeholder="Nombre completo de la empresa"
            leftSection={<IconBuilding size={16} />}
            required
            {...form.getInputProps('businessName')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="RUC"
            placeholder="12345678901"
            leftSection={<IconId size={16} />}
            required
            maxLength={11}
            {...form.getInputProps('ruc')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Representante Legal"
            placeholder="Nombre del representante"
            leftSection={<IconUser size={16} />}
            required
            {...form.getInputProps('legalRepresentative')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="DNI del Representante"
            placeholder="12345678"
            leftSection={<IconId size={16} />}
            required
            maxLength={8}
            {...form.getInputProps('representativeDni')}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
