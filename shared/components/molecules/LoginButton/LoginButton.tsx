import { IconLogin } from '@tabler/icons-react';
import { Button, type ButtonProps } from '@mantine/core';
import { useAuthModals } from '@/lib/hooks';

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
  const { openLogin } = useAuthModals();

  const handleClick = () => {
    if (customOnClick) {
      customOnClick();
    } else {
      openLogin();
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
