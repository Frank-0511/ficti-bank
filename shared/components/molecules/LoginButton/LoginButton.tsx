import { IconLogin } from '@tabler/icons-react';
import { Button, Group, Text, type ButtonProps } from '@mantine/core';
import { modals } from '@mantine/modals';

interface LoginButtonProps extends ButtonProps {
  children?: React.ReactNode;
  showIcon?: boolean;
  mode?: 'navigation' | 'submit';
  onClick?: () => void;
}

export function LoginButton({
  children = 'Iniciar Sesión',
  showIcon = true,
  variant = 'gradient',
  size = 'sm',
  mode = 'navigation',
  leftSection,
  onClick: customOnClick,
  ...props
}: LoginButtonProps) {
  const handleClick = () => {
    if (customOnClick) {
      customOnClick();
    } else {
      modals.openContextModal({
        modal: 'login',
        modalId: 'auth-login-modal',
        title: (
          <Group gap="sm">
            <IconLogin size={20} />
            <Text fw={600}>Iniciar Sesión</Text>
          </Group>
        ),
        size: 'md',
        centered: true,
        closeOnClickOutside: true,
        closeOnEscape: true,
        trapFocus: true,
        innerProps: {},
      });
    }
  };

  const gradientProps =
    variant === 'gradient'
      ? {
          gradient: { from: 'blue', to: 'cyan', deg: 45 },
        }
      : {};

  // Use custom leftSection if provided, otherwise use icon based on showIcon
  const iconSection =
    leftSection !== undefined ? leftSection : showIcon ? <IconLogin size={16} /> : undefined;

  return (
    <Button
      variant={variant}
      size={size}
      {...(mode === 'navigation' ? { onClick: handleClick } : { type: 'submit' })}
      leftSection={iconSection}
      {...gradientProps}
      {...props}
    >
      {children}
    </Button>
  );
}
