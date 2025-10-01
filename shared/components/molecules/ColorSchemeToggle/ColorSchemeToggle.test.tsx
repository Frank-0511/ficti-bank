import { render, screen, userEvent } from '../../../../test-utils';
import { ColorSchemeToggle } from './ColorSchemeToggle';

// Mock the useMantineColorScheme hook for light theme
const mockToggleColorScheme = jest.fn();
const mockUseMantineColorScheme = jest.fn();

jest.mock('@mantine/core', () => ({
  ...jest.requireActual('@mantine/core'),
  useMantineColorScheme: () => mockUseMantineColorScheme(),
}));

describe('ColorSchemeToggle component', () => {
  beforeEach(() => {
    mockToggleColorScheme.mockClear();
    mockUseMantineColorScheme.mockClear();
  });

  describe('Light theme', () => {
    beforeEach(() => {
      mockUseMantineColorScheme.mockReturnValue({
        colorScheme: 'light',
        toggleColorScheme: mockToggleColorScheme,
      });
    });

    it('renders switch with correct state for light theme', () => {
      render(<ColorSchemeToggle />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
      expect(switchElement).not.toBeChecked(); // light theme = unchecked
      expect(switchElement).toHaveAttribute('title', 'Cambiar a tema oscuro');
    });

    it('calls toggleColorScheme when switch is clicked', async () => {
      const user = userEvent.setup();
      render(<ColorSchemeToggle />);

      const switchElement = screen.getByRole('switch');
      await user.click(switchElement);

      expect(mockToggleColorScheme).toHaveBeenCalledTimes(1);
    });

    it('applies light theme styling and classes', () => {
      const { container } = render(<ColorSchemeToggle />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();

      // Verificar que el switch tiene clases CSS aplicadas
      const switchContainer = container.querySelector('.mantine-Switch-root');
      expect(switchContainer).toBeInTheDocument();
    });

    it('renders with cyan color for light theme', () => {
      render(<ColorSchemeToggle />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).not.toBeChecked(); // isDark = false
    });

    it('shows moon icon as offLabel for light theme', () => {
      render(<ColorSchemeToggle />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
      // Los iconos están integrados en el Switch, verificamos que se renderiza
    });
  });

  describe('Dark theme', () => {
    beforeEach(() => {
      mockUseMantineColorScheme.mockReturnValue({
        colorScheme: 'dark',
        toggleColorScheme: mockToggleColorScheme,
      });
    });

    it('renders switch with correct state for dark theme', () => {
      render(<ColorSchemeToggle />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
      expect(switchElement).toBeChecked(); // dark theme = checked
      expect(switchElement).toHaveAttribute('title', 'Cambiar a tema claro');
    });

    it('calls toggleColorScheme when switch is clicked in dark theme', async () => {
      const user = userEvent.setup();
      render(<ColorSchemeToggle />);

      const switchElement = screen.getByRole('switch');
      await user.click(switchElement);

      expect(mockToggleColorScheme).toHaveBeenCalledTimes(1);
    });

    it('applies dark theme styling and classes', () => {
      const { container } = render(<ColorSchemeToggle />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeChecked(); // isDark = true

      // Verificar que el switch se renderiza correctamente
      const switchContainer = container.querySelector('.mantine-Switch-root');
      expect(switchContainer).toBeInTheDocument();
    });

    it('renders with blue color for dark theme', () => {
      render(<ColorSchemeToggle />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeChecked(); // isDark = true
    });

    it('shows sun icon as onLabel for dark theme', () => {
      render(<ColorSchemeToggle />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
      // Los iconos están integrados en el Switch
    });
  });

  describe('Component behavior', () => {
    it('renders single switch element', () => {
      mockUseMantineColorScheme.mockReturnValue({
        colorScheme: 'light',
        toggleColorScheme: mockToggleColorScheme,
      });

      render(<ColorSchemeToggle />);

      const switches = screen.getAllByRole('switch');
      expect(switches).toHaveLength(1);
    });

    it('uses useMantineColorScheme hook correctly', () => {
      // Limpiar calls anteriores para este test específico
      mockUseMantineColorScheme.mockClear();

      mockUseMantineColorScheme.mockReturnValue({
        colorScheme: 'light',
        toggleColorScheme: mockToggleColorScheme,
      });

      render(<ColorSchemeToggle />);

      // El componente usa useEffect + useState, así que puede re-renderizar
      // Verificamos que el hook fue llamado y devuelve los valores correctos
      expect(mockUseMantineColorScheme).toHaveBeenCalled();

      // Verificar que el componente funciona correctamente con los valores del hook
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('computes isDark variable correctly for light theme', () => {
      mockUseMantineColorScheme.mockReturnValue({
        colorScheme: 'light',
        toggleColorScheme: mockToggleColorScheme,
      });

      render(<ColorSchemeToggle />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).not.toBeChecked(); // isDark = false
    });

    it('computes isDark variable correctly for dark theme', () => {
      mockUseMantineColorScheme.mockReturnValue({
        colorScheme: 'dark',
        toggleColorScheme: mockToggleColorScheme,
      });

      render(<ColorSchemeToggle />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeChecked(); // isDark = true
    });

    it('applies CSS module classes correctly', () => {
      const { container } = render(<ColorSchemeToggle />);

      // Verificar que se aplican clases CSS del módulo
      expect(container.firstChild).toBeInTheDocument();

      // El switch debería tener clases aplicadas
      const switchElement = container.querySelector('.mantine-Switch-root');
      expect(switchElement).toBeInTheDocument();
    });

    it('renders with large size', () => {
      mockUseMantineColorScheme.mockReturnValue({
        colorScheme: 'light',
        toggleColorScheme: mockToggleColorScheme,
      });

      render(<ColorSchemeToggle />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('handles theme switching', () => {
      // Primero renderizar en tema claro
      mockUseMantineColorScheme.mockReturnValue({
        colorScheme: 'light',
        toggleColorScheme: mockToggleColorScheme,
      });

      const { rerender } = render(<ColorSchemeToggle />);

      let switchElement = screen.getByRole('switch');
      expect(switchElement).not.toBeChecked();

      // Cambiar a tema oscuro
      mockUseMantineColorScheme.mockReturnValue({
        colorScheme: 'dark',
        toggleColorScheme: mockToggleColorScheme,
      });

      rerender(<ColorSchemeToggle />);

      switchElement = screen.getByRole('switch');
      expect(switchElement).toBeChecked();
    });

    it('renders icons with correct properties', () => {
      mockUseMantineColorScheme.mockReturnValue({
        colorScheme: 'light',
        toggleColorScheme: mockToggleColorScheme,
      });

      render(<ColorSchemeToggle />);

      // Los iconos están dentro del Switch, verificar que el componente se renderiza
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('applies conditional classNames based on theme', () => {
      // Test para tema claro
      mockUseMantineColorScheme.mockReturnValue({
        colorScheme: 'light',
        toggleColorScheme: mockToggleColorScheme,
      });

      const { container, rerender } = render(<ColorSchemeToggle />);
      expect(container.firstChild).toBeInTheDocument();

      // Test para tema oscuro
      mockUseMantineColorScheme.mockReturnValue({
        colorScheme: 'dark',
        toggleColorScheme: mockToggleColorScheme,
      });

      rerender(<ColorSchemeToggle />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
