import { render, screen } from '@/test-utils';
import { ServicesSection } from './ServicesSection';

describe('ServicesSection component', () => {
  it('renders the section title', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Servicios Disponibles')).toBeInTheDocument();
  });

  it('renders all services', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Registro de Clientes (Natural y Jurídica)')).toBeInTheDocument();
    expect(screen.getByText('Apertura y Cierre de Cuentas')).toBeInTheDocument();
    expect(screen.getByText('Depósitos y Retiros')).toBeInTheDocument();
    expect(screen.getByText('Transferencias entre Cuentas')).toBeInTheDocument();
    expect(screen.getByText('Cuentas a Plazo Fijo')).toBeInTheDocument();
    expect(screen.getByText('Consulta de Movimientos')).toBeInTheDocument();
    expect(screen.getByText('Manejo de Embargos Judiciales')).toBeInTheDocument();
  });

  it('renders system stats card', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Sistema Integral')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('Disponibilidad')).toBeInTheDocument();
    expect(screen.getByText('Seguridad')).toBeInTheDocument();
    expect(screen.getByText('Operaciones')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<ServicesSection />);
    expect(screen.getByText(/Gestiona todas tus operaciones bancarias/)).toBeInTheDocument();
  });
});
