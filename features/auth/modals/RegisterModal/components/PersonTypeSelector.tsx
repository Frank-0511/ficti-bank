import { IconBuilding, IconUser } from '@tabler/icons-react';
import { Group, Radio, Stack, Text, UnstyledButton } from '@mantine/core';
import { type PersonType } from '../../../schemas';

interface PersonTypeSelectorProps {
  value: PersonType | '';
  onChange: (value: PersonType) => void;
  error?: string;
}

export const PersonTypeSelector: React.FC<PersonTypeSelectorProps> = ({
  value,
  onChange,
  error,
}) => {
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

      <Radio.Group value={value} onChange={(val) => onChange(val as PersonType)} error={error}>
        <Stack gap="sm">
          <UnstyledButton
            onClick={() => onChange('natural')}
            style={(theme) => ({
              borderRadius: theme.radius.md,
              border: `1px solid ${
                value === 'natural' ? theme.colors.blue[6] : theme.colors.gray[3]
              }`,
              backgroundColor: value === 'natural' ? theme.colors.blue[0] : theme.colors.gray[0],
              transition: 'all 0.2s ease',
            })}
            p="md"
          >
            <Group>
              <Radio value="natural" />
              <IconUser size={24} color={value === 'natural' ? '#1c7ed6' : '#868e96'} />
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
            onClick={() => onChange('juridica')}
            style={(theme) => ({
              borderRadius: theme.radius.md,
              border: `1px solid ${
                value === 'juridica' ? theme.colors.blue[6] : theme.colors.gray[3]
              }`,
              backgroundColor: value === 'juridica' ? theme.colors.blue[0] : theme.colors.gray[0],
              transition: 'all 0.2s ease',
            })}
            p="md"
          >
            <Group>
              <Radio value="juridica" />
              <IconBuilding size={24} color={value === 'juridica' ? '#1c7ed6' : '#868e96'} />
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
