import { IconLogin } from '@tabler/icons-react';
import { Button, type ButtonProps } from '@mantine/core';
import { useAuthModals } from '@/lib/hooks';

interface LoginButtonProps extends ButtonProps {
  /** Button text */
  children?: React.ReactNode;
  /** Show icon */
  showIcon?: boolean;
  /**
   * Button mode:
   * - 'navigation': Opens login modal (default)
   * - 'submit': Acts as form submit button
   */
  mode?: 'navigation' | 'submit';
}

/**
 * Standardized Login Button component used across the app
 *
 * @example
 * ```tsx
 * // Navigation mode (default) - Opens modal
 * <LoginButton>Iniciar Sesión</LoginButton>
 *
 * // Submit mode - For forms
 * <LoginButton mode="submit" type="submit">Iniciar Sesión</LoginButton>
 *
 * // Custom variant
 * <LoginButton variant="light" size="lg">Login</LoginButton>
 *
 * // Without icon
 * <LoginButton showIcon={false}>Entrar</LoginButton>
 * ```
 */
export function LoginButton({
  children = 'Iniciar Sesión',
  showIcon = true,
  variant = 'gradient',
  size = 'sm',
  mode = 'navigation',
  leftSection,
  ...props
}: LoginButtonProps) {
  const { openLogin } = useAuthModals();

  const handleNavigationClick = () => {
    openLogin();
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
      {...(mode === 'navigation' ? { onClick: handleNavigationClick } : { type: 'submit' })}
      leftSection={iconSection}
      {...gradientProps}
      {...props}
    >
      {children}
    </Button>
  );
}
