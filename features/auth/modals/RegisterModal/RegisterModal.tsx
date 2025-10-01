import {
  IconAt,
  IconCalendar,
  IconId,
  IconLock,
  IconMapPin,
  IconPhone,
  IconUser,
  IconUserPlus,
} from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import {
  Anchor,
  Button,
  Divider,
  Grid,
  Group,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { type ContextModalProps } from '@mantine/modals';
import { useAuthModals } from '@/lib/hooks';
import { registerSchema, type RegisterFormValues } from '../../schemas';

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

export const RegisterModal: React.FC<ContextModalProps> = ({ id }) => {
  const { switchToLogin, closeModal } = useAuthModals();

  const form = useForm<RegisterFormValues>({
    validate: zod4Resolver(registerSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      dni: '',
      birthDate: '',
      address: '',
      department: '',
      province: '',
      district: '',
      phone: '',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = (values: RegisterFormValues) => {
    // eslint-disable-next-line no-console
    console.log('Register values:', values);
    // await registerUser(values);
    closeModal(id);
  };

  const handleSwitchToLogin = () => {
    form.reset();
    switchToLogin(id);
  };

  // Obtener provincias del departamento seleccionado
  const selectedDepartment = form.values.department;
  const availableProvinces = selectedDepartment ? PROVINCIAS[selectedDepartment] || [] : [];

  // Obtener distritos de la provincia seleccionada
  const selectedProvince = form.values.province;
  const availableDistricts = selectedProvince ? DISTRITOS[selectedProvince] || [] : [];

  // Limpiar provincia y distrito cuando cambia el departamento
  const handleDepartmentChange = (value: string | null) => {
    form.setFieldValue('department', value || '');
    form.setFieldValue('province', '');
    form.setFieldValue('district', '');
  };

  // Limpiar distrito cuando cambia la provincia
  const handleProvinceChange = (value: string | null) => {
    form.setFieldValue('province', value || '');
    form.setFieldValue('district', '');
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="lg">
        {/* Información Personal */}
        <div>
          <Text size="sm" fw={500} mb="xs" c="dimmed">
            Información Personal
          </Text>
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
        </div>

        {/* Información de Contacto */}
        <div>
          <Text size="sm" fw={500} mb="xs" c="dimmed">
            Información de Contacto
          </Text>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                label="Dirección"
                placeholder="Tu dirección completa"
                leftSection={<IconMapPin size={16} />}
                required
                {...form.getInputProps('address')}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Departamento"
                placeholder="Selecciona"
                data={DEPARTAMENTOS}
                searchable
                required
                value={form.values.department}
                onChange={handleDepartmentChange}
                error={form.errors.department}
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
                value={form.values.province}
                onChange={handleProvinceChange}
                error={form.errors.province}
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
                {...form.getInputProps('district')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Teléfono"
                placeholder="01-1234567"
                leftSection={<IconPhone size={16} />}
                {...form.getInputProps('phone')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Celular"
                placeholder="987654321"
                leftSection={<IconPhone size={16} />}
                required
                maxLength={9}
                {...form.getInputProps('mobile')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="Email"
                placeholder="tu@email.com"
                leftSection={<IconAt size={16} />}
                required
                {...form.getInputProps('email')}
              />
            </Grid.Col>
          </Grid>
        </div>

        {/* Información de Seguridad */}
        <div>
          <Text size="sm" fw={500} mb="xs" c="dimmed">
            Información de Seguridad
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <PasswordInput
                label="Contraseña"
                placeholder="Tu contraseña"
                leftSection={<IconLock size={16} />}
                required
                {...form.getInputProps('password')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PasswordInput
                label="Confirmar Contraseña"
                placeholder="Confirma tu contraseña"
                leftSection={<IconLock size={16} />}
                required
                {...form.getInputProps('confirmPassword')}
              />
            </Grid.Col>
          </Grid>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
          size="md"
          fullWidth
          leftSection={<IconUserPlus size={16} />}
        >
          Crear Cuenta
        </Button>

        <Divider label="o" labelPosition="center" />

        {/* Switch to Login */}
        <Group justify="center" gap="xs">
          <Text size="sm" c="dimmed">
            ¿Ya tienes cuenta?
          </Text>
          <Anchor size="sm" onClick={handleSwitchToLogin}>
            Inicia sesión aquí
          </Anchor>
        </Group>
      </Stack>
    </form>
  );
};
