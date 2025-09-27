import { render, screen } from '@/test-utils';
import { FeaturesSection } from './FeaturesSection';

describe('FeaturesSection component', () => {
  it('renders the section title', () => {
    render(<FeaturesSection />);
    expect(screen.getByText('Características del Sistema')).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(<FeaturesSection />);
    expect(screen.getByText('Seguridad Garantizada')).toBeInTheDocument();
    expect(screen.getByText('Disponible 24/7')).toBeInTheDocument();
    expect(screen.getByText('Atención Personalizada')).toBeInTheDocument();
    expect(screen.getByText('Múltiples Productos')).toBeInTheDocument();
    expect(screen.getByText('Control Total')).toBeInTheDocument();
    expect(screen.getByText('Cumplimiento Legal')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    render(<FeaturesSection />);
    expect(screen.getByText(/Tecnología de encriptación de última generación/)).toBeInTheDocument();
    expect(screen.getByText(/Accede a tus cuentas y realiza operaciones/)).toBeInTheDocument();
  });

  it('renders the introduction text', () => {
    render(<FeaturesSection />);
    expect(
      screen.getByText(/Nuestro sistema bancario ofrece todas las herramientas/)
    ).toBeInTheDocument();
  });
});
