import { IconBuilding, IconUser } from '@tabler/icons-react';
import { Group, Radio, Stack, Text, UnstyledButton } from '@mantine/core';
import { PERSON_TYPE } from '../constants';
import { useRegistrationContext } from '../context';
import { type PersonTypeFormData } from '../schemas';

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
            style={(theme) => ({
              borderRadius: theme.radius.md,
              border: `1px solid ${
                value === PERSON_TYPE.NATURAL ? theme.colors.blue[6] : theme.colors.gray[3]
              }`,
              backgroundColor:
                value === PERSON_TYPE.NATURAL ? theme.colors.blue[0] : theme.colors.gray[0],
              transition: 'all 0.2s ease',
            })}
            p="md"
          >
            <Group>
              <Radio value={PERSON_TYPE.NATURAL} />
              <IconUser size={24} color={value === PERSON_TYPE.NATURAL ? '#1c7ed6' : '#868e96'} />
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
            onClick={() => onChange(PERSON_TYPE.BUSINESS)}
            style={(theme) => ({
              borderRadius: theme.radius.md,
              border: `1px solid ${
                value === PERSON_TYPE.BUSINESS ? theme.colors.blue[6] : theme.colors.gray[3]
              }`,
              backgroundColor:
                value === PERSON_TYPE.BUSINESS ? theme.colors.blue[0] : theme.colors.gray[0],
              transition: 'all 0.2s ease',
            })}
            p="md"
          >
            <Group>
              <Radio value={PERSON_TYPE.BUSINESS} />
              <IconBuilding
                size={24}
                color={value === PERSON_TYPE.BUSINESS ? '#1c7ed6' : '#868e96'}
              />
              <div style={{ flex: 1 }}>
                <Text fw={500} size="md">
                  Persona Jurídica
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
