import { fireEvent, render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { useAuthModals } from '../../../../lib/hooks';
import { LoginModal } from './LoginModal';

// Mock the auth modals hook
jest.mock('../../../../lib/hooks', () => ({
  useAuthModals: jest.fn(),
}));

const mockUseAuthModals = useAuthModals as jest.MockedFunction<typeof useAuthModals>;

// Custom render function with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MantineProvider>
      <ModalsProvider>{ui}</ModalsProvider>
    </MantineProvider>
  );
};

describe('LoginModal', () => {
  const mockSwitchToRegister = jest.fn();
  const mockCloseModal = jest.fn();

  const defaultProps = {
    id: 'test-modal',
    context: {} as any, // Simple mock for context
    innerProps: {},
  };

  beforeEach(() => {
    mockSwitchToRegister.mockClear();
    mockCloseModal.mockClear();
    mockUseAuthModals.mockReturnValue({
      openLogin: jest.fn(),
      openRegister: jest.fn(),
      switchToRegister: mockSwitchToRegister,
      switchToLogin: jest.fn(),
      closeModal: mockCloseModal,
      closeAll: jest.fn(),
    });
  });

  it('renders email and password fields', () => {
    renderWithProviders(<LoginModal {...defaultProps} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    renderWithProviders(<LoginModal {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('renders forgot password link', () => {
    renderWithProviders(<LoginModal {...defaultProps} />);

    expect(screen.getByText('¿Olvidaste tu contraseña?')).toBeInTheDocument();
  });

  it('renders switch to register link', () => {
    renderWithProviders(<LoginModal {...defaultProps} />);

    expect(screen.getByText('¿No tienes cuenta?')).toBeInTheDocument();
    expect(screen.getByText('Regístrate aquí')).toBeInTheDocument();
  });

  it('switches to register modal when register link is clicked', () => {
    renderWithProviders(<LoginModal {...defaultProps} />);

    const registerLink = screen.getByText('Regístrate aquí');
    fireEvent.click(registerLink);

    expect(mockSwitchToRegister).toHaveBeenCalledWith('test-modal');
  });

  it('submits form with valid data', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    renderWithProviders(<LoginModal {...defaultProps} />);

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
    expect(mockCloseModal).toHaveBeenCalledWith('test-modal');

    consoleSpy.mockRestore();
  });

  it('autofocuses email field', () => {
    renderWithProviders(<LoginModal {...defaultProps} />);

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('data-autofocus');
  });

  it('has required fields', () => {
    renderWithProviders(<LoginModal {...defaultProps} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    expect(emailInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('required');
  });
});
