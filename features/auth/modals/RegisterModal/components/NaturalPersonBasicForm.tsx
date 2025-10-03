import { IconCalendar, IconId, IconUser } from '@tabler/icons-react';
import { Grid, Stack, Text, TextInput } from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';
import { type NaturalPersonBasicFormValues } from '../../../schemas';

interface NaturalPersonBasicFormProps {
  form: UseFormReturnType<NaturalPersonBasicFormValues>;
}

export const NaturalPersonBasicForm: React.FC<NaturalPersonBasicFormProps> = ({ form }) => {
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
            data-autofocus
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
          <TextInput
            label="Fecha de Nacimiento"
            placeholder="DD/MM/YYYY"
            type="date"
            leftSection={<IconCalendar size={16} />}
            required
            {...form.getInputProps('birthDate')}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
