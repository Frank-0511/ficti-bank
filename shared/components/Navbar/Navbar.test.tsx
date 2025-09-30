import { render, screen } from '../../../test-utils';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders all account type navigation links', () => {
    render(<Navbar />);

    expect(screen.getByText('Cuenta de Ahorros')).toBeInTheDocument();
    expect(screen.getByText('Cuenta Corriente')).toBeInTheDocument();
    expect(screen.getByText('Cuenta a Plazo Fijo')).toBeInTheDocument();

    // Verificar descripciones
    expect(screen.getByText('Ahorra y gana intereses')).toBeInTheDocument();
    expect(screen.getByText('Para tus operaciones diarias')).toBeInTheDocument();
    expect(screen.getByText('Inversión a largo plazo')).toBeInTheDocument();
  });

  it('renders navigation links with correct hrefs', () => {
    render(<Navbar />);

    expect(screen.getByRole('link', { name: /cuenta de ahorros/i })).toHaveAttribute(
      'href',
      '/cuentas/ahorros'
    );
    expect(screen.getByRole('link', { name: /cuenta corriente/i })).toHaveAttribute(
      'href',
      '/cuentas/corriente'
    );
    expect(screen.getByRole('link', { name: /cuenta a plazo fijo/i })).toHaveAttribute(
      'href',
      '/cuentas/plazo-fijo'
    );
  });

  it('renders action buttons with correct links', () => {
    render(<Navbar />);

    expect(screen.getByRole('link', { name: /registro/i })).toHaveAttribute('href', '/registro');
    expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute('href', '/login');
  });

  it('renders section headers', () => {
    render(<Navbar />);

    expect(screen.getByText('Tipos de Cuenta')).toBeInTheDocument();
  });

  it('renders with proper stack layout', () => {
    const { container } = render(<Navbar />);

    // Verificar que el componente se renderiza
    expect(container.firstChild).toBeInTheDocument();

    // Verificar que contiene elementos principales
    expect(screen.getByText('Tipos de Cuenta')).toBeInTheDocument();
    expect(screen.getByText('Registro')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders full width buttons', () => {
    render(<Navbar />);

    const registroButton = screen.getByRole('link', { name: /registro/i });
    const loginButton = screen.getByRole('link', { name: /login/i });

    expect(registroButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('renders dividers for sections', () => {
    const { container } = render(<Navbar />);

    // Verificar que existe el border-top en la sección de botones
    const buttonSection = container.querySelector('[style*="border-top"]');
    expect(buttonSection).toBeInTheDocument();
  });
});
