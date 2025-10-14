import { IconAt, IconMapPin, IconPhone } from '@tabler/icons-react';
import { Grid, Select, Stack, Text, TextInput } from '@mantine/core';
import { useAutoFocus } from '@/lib/hooks';
import { useRegistrationContext } from '../context';

// Datos de ubicación del Perú (ejemplo simplificado)
const DEPARTAMENTOS = [
  { value: 'lima', label: 'Lima' },
  { value: 'arequipa', label: 'Arequipa' },
  { value: 'cusco', label: 'Cusco' },
  { value: 'trujillo', label: 'Trujillo' },
  { value: 'piura', label: 'Piura' },
  { value: 'chiclayo', label: 'Chiclayo' },
  { value: 'huancayo', label: 'Huancayo' },
  { value: 'iquitos', label: 'Iquitos' },
];

const PROVINCIAS: Record<string, Array<{ value: string; label: string }>> = {
  lima: [
    { value: 'lima', label: 'Lima' },
    { value: 'callao', label: 'Callao' },
    { value: 'cañete', label: 'Cañete' },
    { value: 'huaral', label: 'Huaral' },
  ],
  arequipa: [
    { value: 'arequipa', label: 'Arequipa' },
    { value: 'camana', label: 'Camaná' },
    { value: 'caylloma', label: 'Caylloma' },
  ],
  // Agregar más provincias según necesidades
};

const DISTRITOS: Record<string, Array<{ value: string; label: string }>> = {
  lima: [
    { value: 'miraflores', label: 'Miraflores' },
    { value: 'san-isidro', label: 'San Isidro' },
    { value: 'surco', label: 'Surco' },
    { value: 'la-molina', label: 'La Molina' },
    { value: 'san-borja', label: 'San Borja' },
    { value: 'pueblo-libre', label: 'Pueblo Libre' },
    { value: 'jesus-maria', label: 'Jesús María' },
    { value: 'lince', label: 'Lince' },
  ],
  callao: [
    { value: 'callao', label: 'Callao' },
    { value: 'bellavista', label: 'Bellavista' },
    { value: 'carmen-de-la-legua', label: 'Carmen de la Legua' },
  ],
  // Agregar más distritos según necesidades
};

export const ContactInfoForm: React.FC = () => {
  const { contactInfoForm } = useRegistrationContext();
  const firstInputRef = useAutoFocus<HTMLInputElement>();

  // Obtener provincias del departamento seleccionado
  const selectedDepartment = contactInfoForm.values.department;
  const availableProvinces = selectedDepartment ? PROVINCIAS[selectedDepartment] || [] : [];

  // Obtener distritos de la provincia seleccionada
  const selectedProvince = contactInfoForm.values.province;
  const availableDistricts = selectedProvince ? DISTRITOS[selectedProvince] || [] : [];

  // Limpiar provincia y distrito cuando cambia el departamento
  const handleDepartmentChange = (value: string | null) => {
    contactInfoForm.setFieldValue('department', value || '');
    contactInfoForm.setFieldValue('province', '');
    contactInfoForm.setFieldValue('district', '');
  };

  // Limpiar distrito cuando cambia la provincia
  const handleProvinceChange = (value: string | null) => {
    contactInfoForm.setFieldValue('province', value || '');
    contactInfoForm.setFieldValue('district', '');
  };

  return (
    <Stack gap="lg">
      <div>
        <Text size="lg" fw={600} mb="xs">
          Información de Contacto
        </Text>
        <Text size="sm" c="dimmed">
          Completa tu información de contacto y ubicación
        </Text>
      </div>

      <Grid>
        <Grid.Col span={12}>
          <TextInput
            ref={firstInputRef}
            label="Dirección"
            placeholder="Tu dirección completa"
            leftSection={<IconMapPin size={16} />}
            required
            {...contactInfoForm.getInputProps('address')}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            label="Departamento"
            placeholder="Selecciona"
            data={DEPARTAMENTOS}
            searchable
            required
            value={contactInfoForm.values.department}
            onChange={handleDepartmentChange}
            error={contactInfoForm.errors.department}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            label="Provincia"
            placeholder="Selecciona"
            data={availableProvinces}
            searchable
            required
            disabled={!selectedDepartment}
            value={contactInfoForm.values.province}
            onChange={handleProvinceChange}
            error={contactInfoForm.errors.province}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            label="Distrito"
            placeholder="Selecciona"
            data={availableDistricts}
            searchable
            required
            disabled={!selectedProvince}
            {...contactInfoForm.getInputProps('district')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Teléfono"
            placeholder="01-1234567"
            leftSection={<IconPhone size={16} />}
            {...contactInfoForm.getInputProps('phone')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Celular"
            placeholder="987654321"
            leftSection={<IconPhone size={16} />}
            required
            maxLength={9}
            {...contactInfoForm.getInputProps('mobile')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Email"
            placeholder="tu@email.com"
            leftSection={<IconAt size={16} />}
            required
            {...contactInfoForm.getInputProps('email')}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
