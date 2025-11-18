import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Group, Select, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { ContextModalProps } from '@mantine/modals';
import { ENTITY_STATUS, USER_ROLE, USER_ROLE_LABELS } from '@/lib/constants';
import type { User } from '@/lib/types';
import { editUserSchema, type EditUserFormValues } from '../schemas';

export interface EditUserModalProps {
  user: User;
  onSubmit: (id: string, updates: Partial<User>) => void;
}

export function EditUserModal({ context, id, innerProps }: ContextModalProps<EditUserModalProps>) {
  const { user, onSubmit } = innerProps;

  const form = useForm<EditUserFormValues>({
    initialValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    },
    validate: zod4Resolver(editUserSchema),
  });

  const handleSubmit = (values: EditUserFormValues) => {
    onSubmit(user.id, values as Partial<User>);
    context.closeModal(id);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Nombre"
          placeholder="Nombre completo"
          {...form.getInputProps('name')}
          required
        />

        <TextInput
          label="Usuario"
          placeholder="username"
          {...form.getInputProps('username')}
          required
        />

        <TextInput
          label="Correo"
          placeholder="correo@ejemplo.com"
          type="email"
          {...form.getInputProps('email')}
          required
        />

        <Select
          label="Rol"
          placeholder="Selecciona un rol"
          data={[
            { value: USER_ROLE.ADMIN, label: USER_ROLE_LABELS[USER_ROLE.ADMIN] },
            { value: USER_ROLE.EMPLOYEE, label: USER_ROLE_LABELS[USER_ROLE.EMPLOYEE] },
          ]}
          {...form.getInputProps('role')}
          required
        />

        <Select
          label="Estado"
          placeholder="Selecciona un estado"
          data={[
            { value: ENTITY_STATUS.ACTIVE, label: 'Activo' },
            { value: ENTITY_STATUS.INACTIVE, label: 'Inactivo' },
          ]}
          {...form.getInputProps('status')}
          required
        />

        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={() => context.closeModal(id)}>
            Cancelar
          </Button>
          <Button type="submit">Guardar Cambios</Button>
        </Group>
      </Stack>
    </form>
  );
}
