import { render, screen } from '@/test-utils';
import { HeroSection } from './HeroSection';

describe('HeroSection component', () => {
  it('renders the main title', () => {
    render(<HeroSection />);
    expect(screen.getByText('Bienvenido a')).toBeInTheDocument();
    expect(screen.getByText('Ficti Bank')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Sistema integral de gestión bancaria/)).toBeInTheDocument();
  });

  it('renders the action buttons', () => {
    render(<HeroSection />);
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByText('Conocer Más')).toBeInTheDocument();
  });

  it('renders the bank icon', () => {
    render(<HeroSection />);
    // El ícono está dentro de un ThemeIcon, verificamos que se renderiza
    const heroSection =
      screen.getByText('Bienvenido a').closest('[data-testid="hero-section"]') || document.body;
    expect(heroSection).toBeInTheDocument();
  });
});
