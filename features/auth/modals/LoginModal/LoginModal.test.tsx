import { AUTH_MODES } from '../../../../lib/constants';
import { useAuthModal } from '../../../../lib/store';
import { fireEvent, render, screen } from '../../../../test-utils';
import { LoginModal } from './LoginModal';

// Mock the auth modal store
jest.mock('../../../lib/store', () => ({
  useAuthModal: jest.fn(),
}));

const mockUseAuthModal = useAuthModal as jest.MockedFunction<typeof useAuthModal>;

describe('LoginModal', () => {
  const mockClose = jest.fn();
  const mockOpen = jest.fn();

  beforeEach(() => {
    mockClose.mockClear();
    mockOpen.mockClear();
    mockUseAuthModal.mockReturnValue({
      isOpen: true,
      mode: AUTH_MODES.LOGIN,
      open: mockOpen,
      close: mockClose,
    });
  });

  it('renders when modal is open and mode is LOGIN', () => {
    render(<LoginModal />);

    // Buscar por el título en lugar de texto duplicado
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Contraseña')).toBeInTheDocument();
  });

  it('does not render when modal is closed', () => {
    mockUseAuthModal.mockReturnValue({
      isOpen: false,
      mode: AUTH_MODES.LOGIN,
      open: mockOpen,
      close: mockClose,
    });

    render(<LoginModal />);

    expect(screen.queryByText('Email')).not.toBeInTheDocument();
  });

  it('does not render when mode is not LOGIN', () => {
    mockUseAuthModal.mockReturnValue({
      isOpen: true,
      mode: AUTH_MODES.REGISTER,
      open: mockOpen,
      close: mockClose,
    });

    render(<LoginModal />);

    expect(screen.queryByText('Email')).not.toBeInTheDocument();
  });

  it('renders email and password fields', () => {
    render(<LoginModal />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<LoginModal />);

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('renders forgot password link', () => {
    render(<LoginModal />);

    expect(screen.getByText('¿Olvidaste tu contraseña?')).toBeInTheDocument();
  });

  it('renders switch to register link', () => {
    render(<LoginModal />);

    expect(screen.getByText('¿No tienes cuenta?')).toBeInTheDocument();
    expect(screen.getByText('Regístrate aquí')).toBeInTheDocument();
  });

  it('switches to register mode when register link is clicked', () => {
    render(<LoginModal />);

    const registerLink = screen.getByText('Regístrate aquí');
    fireEvent.click(registerLink);

    expect(mockOpen).toHaveBeenCalledWith(AUTH_MODES.REGISTER);
  });

  it('submits form with valid data', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<LoginModal />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const form = emailInput.closest('form')!;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form);

    expect(consoleSpy).toHaveBeenCalledWith('Login values:', {
      email: 'test@example.com',
      password: 'password123',
    });

    consoleSpy.mockRestore();
  });

  it('autofocuses email field', () => {
    render(<LoginModal />);

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('data-autofocus');
  });

  it('has required fields', () => {
    render(<LoginModal />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    expect(emailInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('required');
  });
});
