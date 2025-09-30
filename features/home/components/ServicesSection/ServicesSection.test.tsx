import { MantineProvider } from '@mantine/core';
import { render, screen } from '@/test-utils';
import { ServicesSection } from './ServicesSection';

describe('ServicesSection component', () => {
  it('renders the section title', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Servicios Disponibles')).toBeInTheDocument();
  });

  it('renders all services', () => {
    render(<ServicesSection />);
    // Usar getAllByText porque los servicios aparecen dos veces (móvil y desktop)
    expect(screen.getAllByText('Registro de Clientes (Natural y Jurídica)')).toHaveLength(2);
    expect(screen.getAllByText('Apertura y Cierre de Cuentas')).toHaveLength(2);
    expect(screen.getAllByText('Depósitos y Retiros')).toHaveLength(2);
    expect(screen.getAllByText('Transferencias entre Cuentas')).toHaveLength(2);
    expect(screen.getAllByText('Cuentas a Plazo Fijo')).toHaveLength(2);
    expect(screen.getAllByText('Consulta de Movimientos')).toHaveLength(2);
    expect(screen.getAllByText('Manejo de Embargos Judiciales')).toHaveLength(2);
  });

  it('renders system stats card', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Sistema Integral')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('∞')).toBeInTheDocument();
    expect(screen.getByText('Disponibilidad')).toBeInTheDocument();
    expect(screen.getByText('Seguridad')).toBeInTheDocument();
    expect(screen.getByText('Operaciones')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<ServicesSection />);
    expect(screen.getByText(/Gestiona todas tus operaciones bancarias/)).toBeInTheDocument();
    expect(
      screen.getByText(/Plataforma web robusta que integra todos los servicios bancarios/)
    ).toBeInTheDocument();
  });

  it('renders service items with proper structure', () => {
    render(<ServicesSection />);

    // Verificar que se rendericen todos los servicios
    const services = [
      'Registro de Clientes (Natural y Jurídica)',
      'Apertura y Cierre de Cuentas',
      'Depósitos y Retiros',
      'Transferencias entre Cuentas',
      'Cuentas a Plazo Fijo',
      'Consulta de Movimientos',
      'Manejo de Embargos Judiciales',
    ];

    services.forEach((service) => {
      expect(screen.getAllByText(service)).toHaveLength(2);
    });
  });

  it('applies responsive grid layout', () => {
    const { container } = render(<ServicesSection />);
    const gridContainer = container.querySelector('.mantine-Grid-root');
    expect(gridContainer).toBeInTheDocument();
  });

  it('applies theme-responsive styling with transitions', () => {
    const { container } = render(<ServicesSection />);

    // Verificar que se apliquen las transiciones de tema
    const elementsWithTransition = container.querySelectorAll('[style*="transition"]');
    expect(elementsWithTransition.length).toBeGreaterThan(0);
  });

  it('renders Card component for system info', () => {
    const { container } = render(<ServicesSection />);
    const cardElement = container.querySelector('.mantine-Card-root');
    expect(cardElement).toBeInTheDocument();
  });

  it('renders Container component with proper structure', () => {
    const { container } = render(<ServicesSection />);
    const containerElement = container.querySelector('.mantine-Container-root');
    expect(containerElement).toBeInTheDocument();
  });

  it('renders both mobile and desktop service layouts', () => {
    const { container } = render(<ServicesSection />);

    // Verificar que existan elementos Stack para organizar los servicios
    const stackElements = container.querySelectorAll('.mantine-Stack-root');
    expect(stackElements.length).toBeGreaterThan(1);
  });

  it('renders correctly in light theme', () => {
    render(
      <MantineProvider forceColorScheme="light">
        <ServicesSection />
      </MantineProvider>
    );

    // Verificar que el componente se renderice correctamente en tema claro
    expect(screen.getByText('Servicios Disponibles')).toBeInTheDocument();
    expect(screen.getByText('Sistema Integral')).toBeInTheDocument();
  });

  it('renders correctly in dark theme', () => {
    render(
      <MantineProvider forceColorScheme="dark">
        <ServicesSection />
      </MantineProvider>
    );

    // Verificar que el componente se renderice correctamente en tema oscuro
    expect(screen.getByText('Servicios Disponibles')).toBeInTheDocument();
    expect(screen.getByText('Sistema Integral')).toBeInTheDocument();
  });

  it('renders all service items correctly', () => {
    render(<ServicesSection />);

    // Verificar que todos los servicios se renderizen correctamente
    const serviceTexts = [
      'Registro de Clientes (Natural y Jurídica)',
      'Apertura y Cierre de Cuentas',
      'Depósitos y Retiros',
      'Transferencias entre Cuentas',
      'Cuentas a Plazo Fijo',
      'Consulta de Movimientos',
      'Manejo de Embargos Judiciales',
    ];

    serviceTexts.forEach((service) => {
      const serviceElements = screen.getAllByText(service);
      expect(serviceElements).toHaveLength(2); // Móvil + Desktop
    });
  });

  it('renders main container with proper structure', () => {
    const { container } = render(<ServicesSection />);

    // Verificar que el componente se renderice
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders all text content correctly', () => {
    render(<ServicesSection />);

    // Verificar todos los textos principales
    expect(screen.getByText('Servicios Disponibles')).toBeInTheDocument();
    expect(screen.getByText(/Gestiona todas tus operaciones bancarias/)).toBeInTheDocument();
    expect(screen.getByText('Sistema Integral')).toBeInTheDocument();
    expect(screen.getByText(/Plataforma web robusta/)).toBeInTheDocument();

    // Verificar estadísticas
    expect(screen.getByText('24/7')).toBeInTheDocument();
    expect(screen.getByText('Disponibilidad')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('Seguridad')).toBeInTheDocument();
    expect(screen.getByText('∞')).toBeInTheDocument();
    expect(screen.getByText('Operaciones')).toBeInTheDocument();
  });

  it('renders with different theme contexts', () => {
    // Test con tema claro
    const { rerender } = render(
      <MantineProvider forceColorScheme="light">
        <ServicesSection />
      </MantineProvider>
    );

    expect(screen.getByText('Servicios Disponibles')).toBeInTheDocument();

    // Test con tema oscuro
    rerender(
      <MantineProvider forceColorScheme="dark">
        <ServicesSection />
      </MantineProvider>
    );

    expect(screen.getByText('Servicios Disponibles')).toBeInTheDocument();
  });

  it('handles theme switching properly', () => {
    // Renderizar en tema claro primero
    const { rerender } = render(
      <MantineProvider forceColorScheme="light">
        <ServicesSection />
      </MantineProvider>
    );

    expect(screen.getByText('Sistema Integral')).toBeInTheDocument();

    // Cambiar a tema oscuro
    rerender(
      <MantineProvider forceColorScheme="dark">
        <ServicesSection />
      </MantineProvider>
    );

    // Verificar que el contenido sigue siendo el mismo
    expect(screen.getByText('Sistema Integral')).toBeInTheDocument();
  });
});
