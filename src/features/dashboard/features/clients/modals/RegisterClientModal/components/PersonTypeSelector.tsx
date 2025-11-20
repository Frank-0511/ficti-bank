import { IconBuilding, IconUser } from '@tabler/icons-react';
import { Group, Radio, Stack, Text, UnstyledButton } from '@mantine/core';
import { PERSON_TYPE, PERSON_TYPE_LABELS } from '@/lib/constants/person.constants';
import { useRegistrationContext } from '../context/RegistrationContext';
import { type PersonTypeFormData } from '../schemas/forms/person-type.schema';

export const PersonTypeSelector: React.FC = () => {
  const { personTypeForm } = useRegistrationContext();

  const value = personTypeForm.values.personType;
  const error = personTypeForm.errors.personType as string;
  const onChange = (val: string) =>
    personTypeForm.setFieldValue('personType', val as PersonTypeFormData['personType']);

  return (
    <Stack gap="md">
      <div>
        <Text size="lg" fw={600} mb="xs">
          ¿Qué tipo de cuenta deseas crear?
        </Text>
        <Text size="sm" c="dimmed">
          Selecciona el tipo de persona para continuar con el registro
        </Text>
      </div>

      <Radio.Group value={value} onChange={onChange} error={error}>
        <Stack gap="sm">
          <UnstyledButton
            onClick={() => onChange(PERSON_TYPE.NATURAL)}
            style={() => ({
              borderRadius: 'var(--mantine-radius-md)',
              border: `1px solid ${
                value === PERSON_TYPE.NATURAL
                  ? 'var(--mantine-border-card-selector)'
                  : 'var(--mantine-color-default-border)'
              }`,
              backgroundColor:
                value === PERSON_TYPE.NATURAL
                  ? 'var(--mantine-color-blue-light)'
                  : 'var(--mantine-color-body)',
              transition: 'all 0.2s ease',
            })}
            p="md"
          >
            <Group>
              <Radio value={PERSON_TYPE.NATURAL} />
              <IconUser
                size={24}
                color={
                  value === PERSON_TYPE.NATURAL
                    ? 'var(--mantine-border-card-selector)'
                    : 'var(--mantine-color-gray-6)'
                }
              />
              <div style={{ flex: 1 }}>
                <Text fw={500} size="md">
                  Persona Natural
                </Text>
                <Text size="sm" c="dimmed">
                  Para personas individuales con DNI
                </Text>
              </div>
            </Group>
          </UnstyledButton>

          <UnstyledButton
            onClick={() => onChange(PERSON_TYPE.JURIDICAL)}
            style={() => ({
              borderRadius: 'var(--mantine-radius-md)',
              border: `1px solid ${
                value === PERSON_TYPE.JURIDICAL
                  ? 'var(--mantine-border-card-selector)'
                  : 'var(--mantine-color-default-border)'
              }`,
              backgroundColor:
                value === PERSON_TYPE.JURIDICAL
                  ? 'var(--mantine-color-blue-light)'
                  : 'var(--mantine-color-body)',
              transition: 'all 0.2s ease',
            })}
            p="md"
          >
            <Group>
              <Radio value={PERSON_TYPE.JURIDICAL} />
              <IconBuilding
                size={24}
                color={
                  value === PERSON_TYPE.JURIDICAL
                    ? 'var(--mantine-border-card-selector)'
                    : 'var(--mantine-color-gray-6)'
                }
              />
              <div style={{ flex: 1 }}>
                <Text fw={500} size="md">
                  {PERSON_TYPE_LABELS[PERSON_TYPE.JURIDICAL]}
                </Text>
                <Text size="sm" c="dimmed">
                  Para empresas y organizaciones con RUC
                </Text>
              </div>
            </Group>
          </UnstyledButton>
        </Stack>
      </Radio.Group>
    </Stack>
  );
};
