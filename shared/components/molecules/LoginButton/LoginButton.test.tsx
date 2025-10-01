import { AUTH_MODES } from '../../../../lib/constants';
import { useAuthModal } from '../../../../lib/store';
import { fireEvent, render, screen } from '../../../../test-utils';
import { LoginButton } from './LoginButton';

// Mock the auth modal store
jest.mock('../../../../lib/store', () => ({
  useAuthModal: jest.fn(),
}));

const mockUseAuthModal = useAuthModal as jest.MockedFunction<typeof useAuthModal>;

describe('LoginButton', () => {
  const mockOpen = jest.fn();

  beforeEach(() => {
    mockOpen.mockClear();
    mockUseAuthModal.mockReturnValue({
      isOpen: false,
      mode: AUTH_MODES.LOGIN,
      open: mockOpen,
      close: jest.fn(),
    });
  });

  it('renders with default props', () => {
    render(<LoginButton />);

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders with custom children text', () => {
    render(<LoginButton>Entrar</LoginButton>);

    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('opens auth modal when clicked in navigation mode (default)', () => {
    render(<LoginButton />);

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(button);

    expect(mockOpen).toHaveBeenCalledWith(AUTH_MODES.LOGIN);
    expect(mockOpen).toHaveBeenCalledTimes(1);
  });

  it('does not open modal when clicked in submit mode', () => {
    render(<LoginButton mode="submit" />);

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(button);

    expect(mockOpen).not.toHaveBeenCalled();
  });

  it('renders as submit button when mode is submit', () => {
    render(<LoginButton mode="submit" />);

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders with icon by default', () => {
    render(<LoginButton />);

    // Verificar que existe el ícono (SVG)
    const icon = screen.getByRole('button').querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('does not render icon when showIcon is false', () => {
    render(<LoginButton showIcon={false} />);

    // Verificar que NO existe el ícono
    const icon = screen.getByRole('button').querySelector('svg');
    expect(icon).not.toBeInTheDocument();
  });

  it('applies gradient variant by default', () => {
    render(<LoginButton />);

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(button).toHaveAttribute('data-variant', 'gradient');
  });

  it('applies custom variant', () => {
    render(<LoginButton variant="light" />);

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(button).toHaveAttribute('data-variant', 'light');
  });

  it('applies custom size', () => {
    render(<LoginButton size="lg" />);

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('accepts custom leftSection', () => {
    const customIcon = <span data-testid="custom-icon">🔐</span>;
    render(<LoginButton leftSection={customIcon} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('handles leftSection as null explicitly', () => {
    render(<LoginButton leftSection={null} />);

    // leftSection es null (no undefined), por lo que se usa null en lugar del ícono por defecto
    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    const icon = button.querySelector('svg');
    expect(icon).not.toBeInTheDocument();
  });

  it('uses leftSection when provided even with showIcon false', () => {
    const customIcon = <span data-testid="custom-icon">🔐</span>;
    render(<LoginButton leftSection={customIcon} showIcon={false} />);

    // leftSection tiene prioridad sobre showIcon
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('handles leftSection as empty string', () => {
    render(<LoginButton leftSection="" />);

    // leftSection es "" (no undefined), por lo que se usa "" en lugar del ícono por defecto
    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    const icon = button.querySelector('svg');
    expect(icon).not.toBeInTheDocument();
  });

  it('does not apply gradient props when variant is not gradient', () => {
    render(<LoginButton variant="filled" />);

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(button).toHaveAttribute('data-variant', 'filled');
    // Verificar que no hay propiedades de gradiente aplicadas
    expect(button).not.toHaveAttribute('data-gradient');
  });

  it('accepts additional button props', () => {
    render(<LoginButton disabled data-testid="login-btn" />);

    const button = screen.getByTestId('login-btn');
    expect(button).toBeDisabled();
  });

  it('handles multiple clicks properly in navigation mode', () => {
    render(<LoginButton />);

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockOpen).toHaveBeenCalledTimes(3);
    expect(mockOpen).toHaveBeenCalledWith(AUTH_MODES.LOGIN);
  });

  it('maintains accessibility standards', () => {
    render(<LoginButton />);

    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAccessibleName();
  });
});
