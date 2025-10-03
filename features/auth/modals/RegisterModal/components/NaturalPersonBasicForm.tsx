import { IconCalendar, IconId, IconUser } from '@tabler/icons-react';
import { Grid, Stack, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { type UseFormReturnType } from '@mantine/form';
import { useAutoFocus } from '@/lib/hooks';
import { type NaturalPersonBasicFormValues } from '../../../schemas';

interface NaturalPersonBasicFormProps {
  form: UseFormReturnType<NaturalPersonBasicFormValues>;
}

export const NaturalPersonBasicForm: React.FC<NaturalPersonBasicFormProps> = ({ form }) => {
  const firstInputRef = useAutoFocus<HTMLInputElement>();

  // Calcular fecha mínima para ser mayor de 18 años
  const maxAllowedDate = new Date();
  maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() - 18);

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
        <Grid.Col span={6}>
          <TextInput
            ref={firstInputRef}
            label="Nombres"
            placeholder="Tu nombre"
            leftSection={<IconUser size={16} />}
            required
            {...form.getInputProps('firstName')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Apellidos"
            placeholder="Tus apellidos"
            leftSection={<IconUser size={16} />}
            required
            {...form.getInputProps('lastName')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="DNI"
            placeholder="12345678"
            leftSection={<IconId size={16} />}
            required
            maxLength={8}
            {...form.getInputProps('dni')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <DatePickerInput
            label="Fecha de Nacimiento"
            placeholder="Selecciona tu fecha de nacimiento"
            leftSection={<IconCalendar size={16} />}
            required
            maxDate={maxAllowedDate}
            valueFormat="DD/MM/YYYY"
            clearable
            {...form.getInputProps('birthDate')}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
