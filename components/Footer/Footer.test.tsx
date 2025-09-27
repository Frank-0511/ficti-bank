import { render, screen } from '@/test-utils';
import { Footer } from './Footer';

describe('Footer component', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(
      screen.getByText('© 2025 Ficti Bank. Todos los derechos reservados.')
    ).toBeInTheDocument();
  });

  it('renders all footer links', () => {
    render(<Footer />);
    expect(screen.getByText('Términos')).toBeInTheDocument();
    expect(screen.getByText('Privacidad')).toBeInTheDocument();
    expect(screen.getByText('Soporte')).toBeInTheDocument();
  });

  it('footer links have correct href attributes', () => {
    render(<Footer />);
    const terminosLink = screen.getByText('Términos');
    const privacidadLink = screen.getByText('Privacidad');
    const soporteLink = screen.getByText('Soporte');

    expect(terminosLink).toHaveAttribute('href', '#');
    expect(privacidadLink).toHaveAttribute('href', '#');
    expect(soporteLink).toHaveAttribute('href', '#');
  });
});
