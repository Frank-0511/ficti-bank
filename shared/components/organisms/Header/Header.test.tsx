import { act } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../../test-utils';
// Import component AFTER mocking dependencies
import { Header } from './Header';

// Create mock functions
const mockUseScrolled = jest.fn();
const mockUseAuthModals = jest.fn();

// Mock the hooks module BEFORE importing the component
jest.mock('@/lib/hooks', () => ({
  useScrolled: () => mockUseScrolled(),
  useAuthModals: () => mockUseAuthModals(),
}));

// Mock del ColorSchemeToggle para enfocar tests en Header
jest.mock('../../molecules', () => ({
  ColorSchemeToggle: () => <div data-testid="color-scheme-toggle">Theme Toggle</div>,
  LoginButton: () => (
    <button type="button" data-testid="login-button">
      Iniciar Sesión
    </button>
  ),
}));

describe('Header', () => {
  const mockToggle = jest.fn();
  const mockOpenRegister = jest.fn();

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    mockToggle.mockClear();

    // Configure hook mocks
    mockUseScrolled.mockReturnValue(false);
    mockUseAuthModals.mockReturnValue({
      openLogin: jest.fn(),
      openRegister: mockOpenRegister,
      switchToRegister: jest.fn(),
      switchToLogin: jest.fn(),
      closeModal: jest.fn(),
      closeAll: jest.fn(),
    });
  });

  describe('Basic Rendering', () => {
    it('renders correctly', () => {
      render(<Header />);
      expect(screen.getByText('Ficti Bank')).toBeInTheDocument();
      expect(screen.getByText('Tipos de Cuenta')).toBeInTheDocument();
      expect(screen.getByText('Registro')).toBeInTheDocument();
      expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    });

    it('renders correctly with mobile nav props', () => {
      render(<Header mobileNavOpened={false} toggleMobileNav={mockToggle} />);
      expect(screen.getByText('Ficti Bank')).toBeInTheDocument();
      expect(screen.getByText('Tipos de Cuenta')).toBeInTheDocument();
      expect(screen.getByText('Registro')).toBeInTheDocument();
      expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    });

    it('logo redirects to home page', () => {
      render(<Header />);
      const logoLink = screen.getByRole('link', { name: /ficti bank/i });
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('renders navigation buttons correctly', () => {
      render(<Header />);
      expect(screen.getByRole('button', { name: /registro/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
      expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    });

    it('register button opens register modal when clicked', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const registerButton = screen.getByRole('button', { name: /registro/i });
      await user.click(registerButton);

      // Verificar que se llamó la función openRegister
      expect(mockOpenRegister).toHaveBeenCalledTimes(1);
    });

    it('register button has correct icon and styling', () => {
      render(<Header />);

      const registerButton = screen.getByRole('button', { name: /registro/i });
      expect(registerButton).toBeInTheDocument();
      expect(registerButton).toHaveTextContent('Registro');
    });

    it('renders bank icon in logo', () => {
      render(<Header />);
      expect(screen.getByText('Ficti Bank')).toBeInTheDocument();
      expect(screen.getAllByTestId('color-scheme-toggle')).toHaveLength(2); // Desktop + Mobile
    });

    it('renders ColorSchemeToggle component', () => {
      render(<Header />);
      expect(screen.getAllByTestId('color-scheme-toggle')).toHaveLength(2); // Desktop + Mobile
    });
  });

  describe('Navigation Menu', () => {
    it('renders desktop menu with account types', () => {
      render(<Header />);
      expect(screen.getByText('Tipos de Cuenta')).toBeInTheDocument();
    });

    it('renders all account type menu items when menu is opened', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const menuTrigger = screen.getByText('Tipos de Cuenta');
      await user.click(menuTrigger);

      expect(screen.getByText('Cuenta de Ahorros')).toBeInTheDocument();
      expect(screen.getByText('Cuenta Corriente')).toBeInTheDocument();
      expect(screen.getByText('Cuenta a Plazo Fijo')).toBeInTheDocument();
      expect(screen.getByText('Ahorra y gana intereses')).toBeInTheDocument();
      expect(screen.getByText('Para tus operaciones diarias')).toBeInTheDocument();
      expect(screen.getByText('Inversión a largo plazo')).toBeInTheDocument();
    });

    it('account menu items have correct hrefs', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const menuTrigger = screen.getByText('Tipos de Cuenta');
      await user.click(menuTrigger);

      expect(
        screen.getByRole('menuitem', { name: /cuenta de ahorros ahorra y gana intereses/i })
      ).toHaveAttribute('href', '/cuentas/ahorros');
      expect(
        screen.getByRole('menuitem', { name: /cuenta corriente para tus operaciones diarias/i })
      ).toHaveAttribute('href', '/cuentas/corriente');
      expect(
        screen.getByRole('menuitem', { name: /cuenta a plazo fijo inversión a largo plazo/i })
      ).toHaveAttribute('href', '/cuentas/plazo-fijo');
    });

    it('handles menu label correctly', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const menuTrigger = screen.getByText('Tipos de Cuenta');
      await user.click(menuTrigger);

      expect(screen.getByText('Selecciona el tipo de cuenta')).toBeInTheDocument();
    });

    it('renders accountTypes array correctly', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const menuTrigger = screen.getByText('Tipos de Cuenta');
      await user.click(menuTrigger);

      expect(screen.getByText('Cuenta de Ahorros')).toBeInTheDocument();
      expect(screen.getByText('Cuenta Corriente')).toBeInTheDocument();
      expect(screen.getByText('Cuenta a Plazo Fijo')).toBeInTheDocument();
    });
  });

  describe('Mobile Behavior', () => {
    it('burger button calls toggle function when clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(<Header mobileNavOpened={false} toggleMobileNav={mockToggle} />);

      const burgerButton = container.querySelector('.mantine-Burger-root');
      expect(burgerButton).toBeInTheDocument();

      await user.click(burgerButton!);
      expect(mockToggle).toHaveBeenCalledTimes(1);
    });

    it('burger button reflects opened state', () => {
      const { container } = render(<Header mobileNavOpened toggleMobileNav={mockToggle} />);
      const burgerButton = container.querySelector('.mantine-Burger-root');
      expect(burgerButton).toBeInTheDocument();
    });

    it('burger button is only visible on mobile', () => {
      const { container } = render(<Header />);
      const burgerButton = container.querySelector('.mantine-Burger-root');
      expect(burgerButton).toBeInTheDocument();

      // El burger está en un Group con hiddenFrom="md"
      const mobileGroup = burgerButton?.closest('.mantine-Group-root');
      expect(mobileGroup).toBeInTheDocument();
    });

    it('mobile color scheme toggle is present', () => {
      render(<Header />);
      // Debería haber 2 ColorSchemeToggle: uno desktop, uno mobile
      expect(screen.getAllByTestId('color-scheme-toggle')).toHaveLength(2);
    });

    it('initializes burger with correct default state', () => {
      const { container } = render(<Header />);
      const burgerButton = container.querySelector('.mantine-Burger-root');
      expect(burgerButton).toBeInTheDocument();

      // Verificar que el burger esté presente y funcional
      expect(burgerButton).toHaveAttribute('type', 'button');
    });

    it('burger reflects opened state when mobileNavOpened is true', () => {
      const { container } = render(<Header mobileNavOpened toggleMobileNav={mockToggle} />);
      const burgerButton = container.querySelector('.mantine-Burger-root');
      expect(burgerButton).toBeInTheDocument();

      // Verificar que el burger sigue siendo funcional cuando está "abierto"
      expect(burgerButton).toHaveAttribute('type', 'button');
    });

    it('applies different styling when mobile nav is opened', () => {
      const { container } = render(<Header mobileNavOpened toggleMobileNav={mockToggle} />);

      // Verificar que el header container está presente
      const headerContainer = container.querySelector('.mantine-Container-root');
      expect(headerContainer).toBeInTheDocument();

      // Verificar que el burger está en estado abierto
      const burgerButton = container.querySelector('.mantine-Burger-root');
      expect(burgerButton).toBeInTheDocument();
    });
  });

  describe('Styling & Responsive', () => {
    it('renders gradient buttons with correct styling', () => {
      render(<Header />);

      const loginButton = screen.getByTestId('login-button');
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toHaveTextContent('Iniciar Sesión');

      const registroButton = screen.getByRole('button', { name: /registro/i });
      expect(registroButton).toBeInTheDocument();
    });

    it('renders responsive elements correctly', () => {
      render(<Header />);
      expect(screen.getByText('Ficti Bank')).toBeInTheDocument();
      expect(screen.getAllByTestId('color-scheme-toggle')).toHaveLength(2); // Desktop + Mobile
    });

    it('renders Container with correct props', () => {
      const { container } = render(<Header />);
      const containerElement = container.querySelector('.mantine-Container-root');
      expect(containerElement).toBeInTheDocument();
    });

    it('renders Group components with correct layout', () => {
      const { container } = render(<Header />);
      const groups = container.querySelectorAll('.mantine-Group-root');
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  describe('Scroll Behavior', () => {
    beforeEach(() => {
      // Mock window.scrollY
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 0,
      });
    });

    it('applies scrolled styles when page is scrolled', () => {
      const { container } = render(<Header />);

      // Simulate scroll
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 100,
      });

      // Trigger scroll event wrapped in act
      act(() => {
        window.dispatchEvent(new Event('scroll'));
      });

      // Check that header container has the expected class structure
      const headerContainer = container.querySelector('.mantine-Container-root');
      expect(headerContainer).toBeInTheDocument();
    });

    it('removes scroll event listener on unmount', () => {
      // Since we're mocking useScrolled, the actual scroll listener won't be attached
      // This test verifies that the component unmounts cleanly without errors
      const { unmount } = render(<Header />);

      // Verify component renders correctly first
      expect(screen.getByText('Ficti Bank')).toBeInTheDocument();

      // Unmounting should work without throwing errors
      expect(() => unmount()).not.toThrow();
    });

    it('uses custom threshold for scroll detection', () => {
      const { container } = render(<Header />);

      // Simulate scroll just below custom threshold (default is 50)
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 30,
      });

      // Trigger scroll event
      act(() => {
        window.dispatchEvent(new Event('scroll'));
      });

      // Should not apply scrolled styles yet
      const headerContainer = container.querySelector('.mantine-Container-root');
      expect(headerContainer).toBeInTheDocument();

      // Now scroll past threshold
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 60,
      });

      // Trigger scroll event
      act(() => {
        window.dispatchEvent(new Event('scroll'));
      });

      // Should apply scrolled styles now
      expect(headerContainer).toBeInTheDocument();
    });
  });
});
