import { useEffect, useState } from 'react';
import { IconArrowLeft, IconArrowRight, IconCircleCheck, IconUserPlus } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Anchor, Button, Divider, Group, Progress, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals, type ContextModalProps } from '@mantine/modals';
import { useAuthModals } from '@/lib/hooks';
import { LoginButton } from '../../../../shared/components';
import {
  contactInfoSchema,
  juridicalPersonBasicSchema,
  naturalPersonBasicSchema,
  personTypeSchema,
  securityInfoSchema,
  type ContactInfoFormValues,
  type JuridicalPersonBasicFormValues,
  type NaturalPersonBasicFormValues,
  type PersonType,
  type PersonTypeFormValues,
  type SecurityInfoFormValues,
} from '../../schemas';
import {
  ContactInfoForm,
  JuridicalPersonBasicForm,
  NaturalPersonBasicForm,
  PersonTypeSelector,
  SecurityInfoForm,
} from './components';

type Step = 'personType' | 'basicInfo' | 'contactInfo' | 'securityInfo' | 'success';

interface StepConfig {
  title: string;
  description: string;
}

const STEPS: Record<Step, StepConfig> = {
  personType: {
    title: 'Tipo de Persona',
    description: 'Selecciona el tipo de cuenta',
  },
  basicInfo: {
    title: 'Datos Básicos',
    description: 'Información principal',
  },
  contactInfo: {
    title: 'Información de Contacto',
    description: 'Datos de contacto y ubicación',
  },
  securityInfo: {
    title: 'Seguridad',
    description: 'Contraseña y confirmación',
  },
  success: {
    title: '¡Registro Exitoso!',
    description: 'Tu cuenta ha sido creada correctamente',
  },
};

export const RegisterModal: React.FC<ContextModalProps> = ({ id }) => {
  const { switchToLogin } = useAuthModals();
  const [currentStep, setCurrentStep] = useState<Step>('personType');
  const [personType, setPersonType] = useState<PersonType | ''>('');

  // Cambiar el título del modal basado en el paso actual
  useEffect(() => {
    if (currentStep === 'success') {
      // Ocultar el título cuando esté en success
      modals.updateModal({ modalId: id, title: null });
    } else {
      // Restaurar el título original
      modals.updateModal({
        modalId: id,
        title: (
          <Group gap="sm">
            <IconUserPlus size={20} />
            <Text fw={600}>Crear Cuenta</Text>
          </Group>
        ),
      });
    }
  }, [currentStep, id]);

  // Formularios para cada paso
  const personTypeForm = useForm<PersonTypeFormValues>({
    validate: zod4Resolver(personTypeSchema),
    initialValues: { personType: 'natural' },
  });

  const naturalPersonBasicForm = useForm<NaturalPersonBasicFormValues>({
    validate: zod4Resolver(naturalPersonBasicSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      dni: '',
      birthDate: null,
    },
  });

  const juridicalPersonBasicForm = useForm<JuridicalPersonBasicFormValues>({
    validate: zod4Resolver(juridicalPersonBasicSchema),
    initialValues: {
      businessName: '',
      ruc: '',
      legalRepresentative: '',
      representativeDni: '',
    },
  });

  const contactInfoForm = useForm<ContactInfoFormValues>({
    validate: zod4Resolver(contactInfoSchema),
    initialValues: {
      address: '',
      department: '',
      province: '',
      district: '',
      phone: '',
      mobile: '',
      email: '',
    },
  });

  const securityInfoForm = useForm<SecurityInfoFormValues>({
    validate: zod4Resolver(securityInfoSchema),
    initialValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const getStepIndex = (step: Step): number => {
    const steps: Step[] = ['personType', 'basicInfo', 'contactInfo', 'securityInfo', 'success'];
    return steps.indexOf(step);
  };

  const getCurrentForm = () => {
    switch (currentStep) {
      case 'personType':
        return personTypeForm;
      case 'basicInfo':
        return personType === 'natural' ? naturalPersonBasicForm : juridicalPersonBasicForm;
      case 'contactInfo':
        return contactInfoForm;
      case 'securityInfo':
        return securityInfoForm;
      default:
        return personTypeForm;
    }
  };

  const handleNext = () => {
    const form = getCurrentForm();

    if (currentStep === 'personType') {
      const isValid = personTypeForm.validate();
      if (isValid.hasErrors) {
        return;
      }

      const selectedPersonType = personTypeForm.values.personType;
      setPersonType(selectedPersonType);
      setCurrentStep('basicInfo');
      return;
    }

    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }

    const steps: Step[] = ['personType', 'basicInfo', 'contactInfo', 'securityInfo'];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['personType', 'basicInfo', 'contactInfo', 'securityInfo'];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
    // Validar todos los formularios
    const personTypeValidation = personTypeForm.validate();
    const basicFormValidation =
      personType === 'natural'
        ? naturalPersonBasicForm.validate()
        : juridicalPersonBasicForm.validate();
    const contactValidation = contactInfoForm.validate();
    const securityValidation = securityInfoForm.validate();

    if (
      personTypeValidation.hasErrors ||
      basicFormValidation.hasErrors ||
      contactValidation.hasErrors ||
      securityValidation.hasErrors
    ) {
      return;
    }

    // Combinar todos los datos
    const formData = {
      personType: personTypeForm.values.personType,
      ...(personType === 'natural'
        ? naturalPersonBasicForm.values
        : juridicalPersonBasicForm.values),
      ...contactInfoForm.values,
      ...securityInfoForm.values,
    };

    // eslint-disable-next-line no-console
    console.log('Register values:', formData);
    // await registerUser(formData);

    // Ir al paso de éxito en lugar de cerrar
    setCurrentStep('success');
  };

  const handleSwitchToLogin = () => {
    // Resetear todos los formularios
    personTypeForm.reset();
    naturalPersonBasicForm.reset();
    juridicalPersonBasicForm.reset();
    contactInfoForm.reset();
    securityInfoForm.reset();
    setCurrentStep('personType');
    setPersonType('');
    switchToLogin();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'personType':
        return (
          <PersonTypeSelector
            value={personTypeForm.values.personType}
            onChange={(value) => personTypeForm.setFieldValue('personType', value)}
            error={personTypeForm.errors.personType as string}
          />
        );
      case 'basicInfo':
        return personType === 'natural' ? (
          <NaturalPersonBasicForm form={naturalPersonBasicForm} />
        ) : (
          <JuridicalPersonBasicForm form={juridicalPersonBasicForm} />
        );
      case 'contactInfo':
        return <ContactInfoForm form={contactInfoForm} />;
      case 'securityInfo':
        return <SecurityInfoForm form={securityInfoForm} />;
      case 'success':
        return (
          <Stack gap="xl" align="center" py="xl">
            <IconCircleCheck size={86} color="var(--mantine-color-green-6)" stroke={1.5} />
            <Stack gap="sm" align="center">
              <Text size="xl" fw={600} ta="center" c="green">
                ¡Registro Exitoso!
              </Text>
              <Text size="md" c="dimmed" ta="center">
                Tu cuenta ha sido creada correctamente. Ya puedes iniciar sesión.
              </Text>
            </Stack>
          </Stack>
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStep === 'securityInfo';
  const isFirstStep = currentStep === 'personType';
  const isSuccessStep = currentStep === 'success';
  const progress = isSuccessStep ? 100 : ((getStepIndex(currentStep) + 1) / 4) * 100;

  return (
    <Stack gap="lg">
      {/* Progress bar - only show if not on success step */}
      {!isSuccessStep && (
        <div>
          <Progress value={progress} size="sm" radius="xl" />
          <Group justify="space-between" mt="xs">
            <Text size="sm" fw={500}>
              {STEPS[currentStep].title}
            </Text>
            <Text size="sm" c="dimmed">
              Paso {getStepIndex(currentStep) + 1} de 4
            </Text>
          </Group>
        </div>
      )}

      {/* Step content */}
      {renderStepContent()}

      {/* Navigation buttons */}
      {!isSuccessStep ? (
        <Group justify="space-between" mt="xl">
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={handleBack}
            disabled={isFirstStep}
          >
            Anterior
          </Button>

          {isLastStep ? (
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
              leftSection={<IconUserPlus size={16} />}
              onClick={handleSubmit}
            >
              Crear Cuenta
            </Button>
          ) : (
            <Button rightSection={<IconArrowRight size={16} />} onClick={handleNext}>
              Siguiente
            </Button>
          )}
        </Group>
      ) : (
        <Group justify="center">
          <LoginButton
            size="lg"
            showIcon={false}
            color="green"
            variant="filled"
            onClick={handleSwitchToLogin}
          />
        </Group>
      )}

      {/* Switch to Login - only show if not on success step */}
      {!isSuccessStep && (
        <>
          <Divider label="o" labelPosition="center" />
          <Group justify="center" gap="xs">
            <Text size="sm" c="dimmed">
              ¿Ya tienes cuenta?
            </Text>
            <Anchor size="sm" onClick={handleSwitchToLogin}>
              Inicia sesión aquí
            </Anchor>
          </Group>
        </>
      )}
    </Stack>
  );
};
