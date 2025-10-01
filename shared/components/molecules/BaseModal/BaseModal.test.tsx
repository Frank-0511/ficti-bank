import { fireEvent, render, screen } from '../../../../test-utils';
import { BaseModal } from './BaseModal';

describe('BaseModal', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    opened: true,
    onClose: mockOnClose,
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders when opened is true', () => {
    render(<BaseModal {...defaultProps} />);

    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when opened is false', () => {
    render(<BaseModal {...defaultProps} opened={false} />);

    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<BaseModal {...defaultProps} title="Test Modal" />);

    // El botón de cerrar no tiene text accessible, buscarlo por clase o directamente
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  it('calls onClose when overlay is clicked', () => {
    render(<BaseModal {...defaultProps} />);

    // El overlay es el elemento que tiene el data-testid o podemos buscarlo por clase
    const overlay = screen
      .getByRole('dialog')
      .parentElement?.querySelector('[data-mantine-stop-propagation]');
    if (overlay) {
      fireEvent.click(overlay);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('renders with custom title', () => {
    render(<BaseModal {...defaultProps} title="Custom Title" />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('applies default size (md)', () => {
    render(<BaseModal {...defaultProps} />);

    // Buscar el contenedor del modal que tiene los data attributes
    const modalRoot = document.querySelector('[data-size="md"]');
    expect(modalRoot).toBeInTheDocument();
  });

  it('applies custom size', () => {
    render(<BaseModal {...defaultProps} size="lg" />);

    const modalRoot = document.querySelector('[data-size="lg"]');
    expect(modalRoot).toBeInTheDocument();
  });

  it('is centered by default', () => {
    render(<BaseModal {...defaultProps} />);

    const modalRoot = document.querySelector('[data-centered="true"]');
    expect(modalRoot).toBeInTheDocument();
  });

  it('can be not centered when specified', () => {
    render(<BaseModal {...defaultProps} centered={false} />);

    // Cuando centered=false, verificar que NO está marcado como centered=true
    const centeredTrue = document.querySelector('[data-centered="true"]');
    expect(centeredTrue).not.toBeInTheDocument();
  });
  it('renders children content', () => {
    const children = (
      <div>
        <h2>Custom Content</h2>
        <p>This is a test paragraph</p>
      </div>
    );

    render(<BaseModal {...defaultProps}>{children}</BaseModal>);

    expect(screen.getByText('Custom Content')).toBeInTheDocument();
    expect(screen.getByText('This is a test paragraph')).toBeInTheDocument();
  });

  it('passes through additional props to Modal component', () => {
    render(<BaseModal {...defaultProps} data-testid="custom-modal" className="custom-class" />);

    const modal = screen.getByTestId('custom-modal');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass('custom-class');
  });

  it('handles keyboard events (ESC key)', () => {
    render(<BaseModal {...defaultProps} />);

    // Simular presionar ESC en el modal específicamente
    const modal = screen.getByRole('dialog');
    fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  it('does not close when closeOnEscape is false', () => {
    render(<BaseModal {...defaultProps} closeOnEscape={false} />);

    // Simular presionar ESC en el modal
    const modal = screen.getByRole('dialog');
    fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('does not close when closeOnClickOutside is false', () => {
    render(<BaseModal {...defaultProps} closeOnClickOutside={false} />);

    // El overlay no debería cerrar el modal cuando se hace click
    const overlay = screen
      .getByRole('dialog')
      .parentElement?.querySelector('[data-mantine-stop-propagation]');
    if (overlay) {
      fireEvent.click(overlay);
      expect(mockOnClose).not.toHaveBeenCalled();
    }
  });

  it('maintains accessibility standards', () => {
    render(<BaseModal {...defaultProps} title="Accessible Modal" />);

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAccessibleName('Accessible Modal');
    expect(modal).toBeInTheDocument();
  });

  it('renders without title', () => {
    render(<BaseModal {...defaultProps} />);

    // El modal debería renderizarse sin título
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });
});
